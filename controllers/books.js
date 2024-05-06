import Book from "../models/Book.js";
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, UnauthenticatedError, NotFoundError } from '../errors/index.js'

const getAll = async (req, res) => {
  const { sort, search, category } = req.query
  const queryObject = {}

  if (category && category != "All Books") {
    queryObject.category = category
  }

  let result = Book.find(queryObject)

  if (sort) {
    const sortList = sort.split(',').join(' ')
    result = result.sort(sortList)
  }

  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit)
  const skip = (page - 1) * limit
  result = result.skip(skip).limit(limit)

  let books = await result

  if (search) {
    books = books.filter((book) => {
      return book.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    })
  }
  res.status(StatusCodes.OK).json({ books })
}

const create = async (req, res) => {
  const book = await Book.create(req.body)
  res.status(StatusCodes.CREATED).json({ book })
}

const getOne = async (req, res) => {
  const bookId = req.params.id
  const book = await Book.findOne({ _id: bookId })

  if (!book) {
    throw new NotFoundError(`No book with id ${bookId}`)
  }

  res.status(StatusCodes.OK).json(book)
}

const remove = async (req, res) => {
  const bookId = req.params.id
  const book = await Book.findOneAndDelete({ _id: bookId })

  if (!book) {
    throw new NotFoundError(`No book with id ${bookId}`)
  }

  res.status(StatusCodes.OK).send()
}

const edit = async (req, res) => {
  const bookId = req.params.id

  const book = await Book.findOneAndUpdate(
    { _id: bookId },
    req.body,
    { new: true, runValidators: true }
  )

  if (!book) {
    throw new NotFoundError(`No book with id ${bookId}`)
  }

  res.status(StatusCodes.OK).json(book)
}

export {
  getAll,
  create,
  getOne,
  remove,
  edit
}
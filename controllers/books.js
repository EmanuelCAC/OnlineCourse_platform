import Book from "../models/Book.js";
import { StatusCodes } from 'http-status-codes'

const getAll = async (req, res) => {
  const { sort, search } = req.query
  let result = Book.find()

  if (sort) {
    const sortList = sort.split(',').join(' ')
    result = result.sort(sortList)
  }

  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
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

export {
  getAll,
  create
}
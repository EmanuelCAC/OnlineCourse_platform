import Book from "../models/Book.js";
import { StatusCodes } from 'http-status-codes'

const getAll = async (req, res) => {
  const { limit, sort } = req.query
  let result = Book.find()


  if (sort) {
    const sortList = sort.split(',').join(' ')
    result = result.sort(sortList)
  }

  if (limit) {
    result = result.limit(Number(limit))
  }

  const books = await result
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
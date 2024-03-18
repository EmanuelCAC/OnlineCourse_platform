import Book from "../models/Book.js";
import { StatusCodes } from 'http-status-codes'

const getAll = async (req, res) => {
  console.log("success")
  const { limit, sort } = req.params
  let result = await Book.find()

  if (sort) {
    const sortList = sort.split(',').join(' ')
    result = result.sort(sortList)
  }

  if (limit) {
    result = result.limit(Number(limit))
  }

  res.status(StatusCodes.OK).json({ result })
}

const create = async (req, res) => {
  const book = await Book.create(req.body)
  res.status(StatusCodes.CREATED).json({ book })
}

export {
  getAll,
  create
}
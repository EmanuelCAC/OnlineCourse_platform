import OwnedBook from '../models/OwnedBook.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, UnauthenticatedError, NotFoundError } from '../errors/index.js'

const getAll = async (req, res) => {
  const userId = req.body.userId
  const list = await OwnedBook.find({ userId })
  
  if (!list) {
    throw new NotFoundError(`No user with id ${userId}`)
  }

  res.status(StatusCodes.OK).json(list)
}

const create = async (req, res) => {
  const alreadyExist = await OwnedBook.findOne({ bookId: req.body.bookId, userId: req.body.userId})
  if (alreadyExist) {
    return res.status(StatusCodes.OK).json()
  }

  const item = await OwnedBook.create(req.body)
  res.status(StatusCodes.CREATED).json(item)
}

const getOne = async (req, res) => {
  const item = await OwnedBook.findOne({_id: req.params.id})

  if (!item) {
    throw new NotFoundError(`No owned book with the id ${req.params.id}`)
  }

  res.status(StatusCodes.OK).send(item)
}

const remove = async (req, res) => {
  const _id = req.params.id
  const item = await OwnedBook.findOneAndDelete({ _id })

  if (!item) {
    throw new NotFoundError(`No owned book with id ${_id}`)
  }

  res.status(StatusCodes.OK).send()
}

const edit = async (req, res) => {
  const item = await OwnedBook.findByIdAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true, runValidators: true }
  )

  if (!item) {
    throw new NotFoundError(`No owned book with id ${req.params.id}`)
  }

  res.status(StatusCodes.OK).send(item)
}

export {
  getAll,
  create,
  getOne,
  remove,
  edit
}
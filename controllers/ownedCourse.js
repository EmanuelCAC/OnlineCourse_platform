import OwnedCourse from '../models/OwnedCourse.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, UnauthenticatedError, NotFoundError } from '../errors/index.js'

const getAll = async (req, res) => {
  const userId = req.body.userId
  const list = await OwnedCourse.find({ userId })
  
  if (!list) {
    throw new NotFoundError(`No user with id ${userId}`)
  }

  res.status(StatusCodes.OK).json(list)
}

const create = async (req, res) => {
  const item = await OwnedCourse.create(req.body)
  res.status(StatusCodes.CREATED).json(item)
}

const getOne = async (req, res) => {
  const item = await OwnedCourse.findOne({_id: req.params.id})

  if (!item) {
    throw new NotFoundError(`No owned course with the id ${req.params.id}`)
  }

  res.status(StatusCodes.OK).send(item)
}

const remove = async (req, res) => {
  const _id = req.params.id
  const item = await OwnedCourse.findOneAndDelete({ _id })

  if (!item) {
    throw new NotFoundError(`No owned course with id ${_id}`)
  }

  res.status(StatusCodes.OK).send()
}

const edit = async (req, res) => {
  const item = await OwnedCourse.findByIdAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true, runValidators: true }
  )

  if (!item) {
    throw new NotFoundError(`No owned course with id ${req.params.id}`)
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
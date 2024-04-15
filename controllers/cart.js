import Cart from "../models/Cart.js"
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, UnauthenticatedError, NotFoundError } from '../errors/index.js'

const getAll = async (req, res) => {
  const list = await Cart.find()
  res.status(StatusCodes.OK).json({ cart: list })
}

const create = async (req, res) => {
  const item = await Cart.create(req.body)
  res.status(StatusCodes.CREATED).json(item)
}

const getByUser = async (req, res) => {
  const userId = req.body.userId
  const list = await Cart.find({ userId })

  if (!list) {
    throw new NotFoundError(`No user with id ${userId}`)
  }

  res.status(StatusCodes.OK).json({ cart: list })
}

const remove = async (req, res) => {
  const _id = req.body._id
  const item = await Cart.findOneAndDelete(_id)

  if (!item) {
    throw new NotFoundError(`No item on the cart with id ${_id}`)
  }

  res.status(StatusCodes.OK).send()
}

const edit = async (req, res) => {
  const item = await Cart.findByIdAndUpdate(
    { _id: req.body._id },
    { ...req.body },
    { new: true, runValidators: true }
  )

  if (!item) {
    throw new NotFoundError(`No item on the cart with id ${_id}`)
  }

  res.status(StatusCodes.OK).send(item)
}

export {
  getAll,
  create,
  getByUser,
  remove,
  edit
}
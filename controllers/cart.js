import Cart from "../models/Cart.js"
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, UnauthenticatedError, NotFoundError } from '../errors/index.js'

const getAll = async (req, res) => {
  const list = await Cart.find()
  res.status(StatusCodes.OK).json({ cart: list })
}

const create = async (req, res) => {
  const alreadyExist = await Cart.findOne({ productId: req.body.productId, userId: req.body.userId})
  if (alreadyExist) {
    const item = await Cart.findOneAndUpdate(
      { _id: alreadyExist._id },
      { amount: alreadyExist.amount + req.body.amount },
      { new: true, runValidators: true }
    )
    return res.status(StatusCodes.OK).json(item)
  }
  
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
  const id = req.body.id
  const item = await Cart.findOneAndDelete({ _id: id })

  if (!item) {
    throw new NotFoundError(`No item on the cart with id ${id}`)
  }

  res.status(StatusCodes.OK).send()
}

const edit = async (req, res) => {
  const item = await Cart.findByIdAndUpdate(
    { _id: req.body.id },
    { ...req.body },
    { new: true, runValidators: true }
  )

  if (!item) {
    throw new NotFoundError(`No item on the cart with id ${req.body.id}`)
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
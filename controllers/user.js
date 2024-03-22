import User from "../models/User.js";
import { StatusCodes } from 'http-status-codes'

const getAll = async (req, res) => {
  const list = await User.find()
  res.status(StatusCodes.OK).json({ user: list })
}

const getOne = async (req, res) => {
  const user = await User.findById({ _id: req.params.id })
  res.status(StatusCodes.OK).json({ user })
}

const create = async (req, res) => {
  const user = await User.create(req.body)
  res.status(StatusCodes.OK).json({ user })
}

const edit = async (req, res) => {
  const user = await User.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
  res.status(StatusCodes.OK).json({ user })
}

const remove = async (req, res) => {
  const user = await User.findByIdAndDelete({ _id: req.params.id })
  res.status(StatusCodes.OK).json({ user })
}

export {
  getAll,
  getOne,
  create,
  edit,
  remove
}
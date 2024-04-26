import TempUser from "../models/TempUser.js";
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, UnauthenticatedError, NotFoundError } from '../errors/index.js'


const getAll = async (req, res) => {
  const list = await TempUser.find()
  res.status(StatusCodes.OK).json({ user: list })
}

const getOne = async (req, res) => {
  const { _id, name, email } = await TempUser.findById({ _id: req.params.id })
  const user = { _id, name, email }

  if(!user) {
    throw new NotFoundError(`No temporary user with id ${_id}`)
  }

  res.status(StatusCodes.OK).json(user)
}

const create = async (req, res) => {
  const exist = await TempUser.findOne({email: req.body.email})

  if (exist) {
    const user = await TempUser.findByIdAndUpdate({ _id: exist._id }, req.body, { new: true, runValidators: true })
    return res.status(StatusCodes.OK).json(user)
  } 

  const user = await TempUser.create(req.body)
  res.status(StatusCodes.OK).json(user)
}

const edit = async (req, res) => {
  const user = await TempUser.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
  res.status(StatusCodes.OK).json(user)
}

const remove = async (req, res) => {
  const user = await TempUser.findByIdAndDelete({ _id: req.params.id })
  res.status(StatusCodes.OK).json(user)
}

export {
  getAll,
  getOne,
  create,
  edit,
  remove
}
import Mentor from "../models/Mentor.js";
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, UnauthenticatedError, NotFoundError } from '../errors/index.js'

const getAll = async (req, res) => {
  const list = await Mentor.find()
  res.status(StatusCodes.OK).json(list)
}

const create = async (req, res) => {
  const mentor = await Mentor.create(req.body)
  res.status(StatusCodes.OK).json(mentor)
}

const getOne = async (req, res) => {
  const mentorId = req.params.id
  const mentor = await Mentor.findOne({ _id: mentorId })

  if (!mentor) {
    throw new NotFoundError(`No mentor with id ${mentorId}`)
  }

  res.status(StatusCodes.OK).json(mentor)
}

const remove = async (req, res) => {
  const mentorId = req.params.id
  const mentor = await Mentor.findOneAndDelete({ _id: mentorId })

  if (!mentor) {
    throw new NotFoundError(`No mentor with id ${mentorId}`)
  }

  res.status(StatusCodes.OK).send()
}

const edit = async (req, res) => {
  const mentorId = req.params.id
  const mentor = await Mentor.findOneAndUpdate(
    { _id: mentorId },
    req.body,
    { new: true, runValidators: true }
  )

  if (!mentor) {
    throw new NotFoundError(`No mentor with id ${mentorId}`)
  }

  res.status(StatusCodes.OK).json(mentor)
}

export {
  getAll,
  create,
  getOne,
  remove,
  edit
}
import Course from "../models/Course.js";

import { StatusCodes } from 'http-status-codes'
import { BadRequestError, UnauthenticatedError, NotFoundError } from '../errors/index.js'

const getAll = async (req, res) => {
  const { sort, search, category, instructorId } = req.query
  const queryObject = {}

  if (category) {
    queryObject.category = category
  }

  if (instructorId) {
    queryObject.instructorId = instructorId
  }

  if (search) {
    queryObject.name = { $regex: search, $options: 'i' }
  }

  let result = Course.find(queryObject)

  if (sort) {
    const sortList = sort.split(',').join(' ')
    result = result.sort(sortList)
  }

  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit)
  const skip = (page - 1) * limit
  result = result.skip(skip).limit(limit)

  let courses = await result

  res.status(StatusCodes.OK).json(courses)
}

const create = async (req, res) => {
  const course = await Course.create(req.body)
  res.status(StatusCodes.OK).json(course)
}

const getOne = async (req, res) => {
  const courseId = req.params.id
  const course = await Course.findOne({ _id: courseId })

  if (!course) {
    throw new NotFoundError(`No course with id ${courseId}`)
  }

  res.status(StatusCodes.OK).json(course)
}

const remove = async (req, res) => {
  const courseId = req.params.id
  const course = await Course.findOneAndDelete({ _id: courseId })

  if (!course) {
    throw new NotFoundError(`No course with id ${courseId}`)
  }

  res.status(StatusCodes.OK).send()
}

const edit = async (req, res) => {
  const courseId = req.params.id
  const course = await Course.findOneAndUpdate(
    { _id: courseId },
    req.body,
    { new: true, runValidators: true }
  )

  if (!course) {
    throw new NotFoundError(`No course with id ${courseId}`)
  }

  res.status(StatusCodes.OK).json(course)
}

export {
  getAll,
  create,
  getOne,
  remove,
  edit
}
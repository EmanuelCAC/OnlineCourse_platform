import CourseReview from '../models/CourseReview.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, UnauthenticatedError, NotFoundError } from '../errors/index.js'

const getAll = async (req, res) => {
  const reviews = await CourseReview.find(req.body)
  res.status(StatusCodes.OK).json(reviews)
}

const create = async (req, res) => {
  const review = await CourseReview.create(req.body)
  res.status(StatusCodes.OK).json(review)
}

const getOne = async (req, res) => {
  const reviewId = req.params.id
  const review = await CourseReview.findOne({ _id: reviewId })
  res.status(StatusCodes.OK).json(review)
}

const edit = async (req, res) => {
  const reviewId = req.params.id
  const review = await CourseReview.findByIdAndUpdate(
    { _id: reviewId },
    req.body,
    { new: true, runValidators: true }
  )
  res.status(StatusCodes.OK).json(review)
}

const remove = async (req, res) => {
  const reviewId = req.params.id
  const review = await CourseReview.findOneAndDelete({ _id: reviewId })
  res.status(StatusCodes.OK).json(review)
}

export {
  getAll,
  create,
  getOne,
  edit,
  remove
}
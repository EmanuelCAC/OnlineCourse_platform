import MentorReview from '../models/MentorReview.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, UnauthenticatedError, NotFoundError } from '../errors/index.js'

const getAll = async (req, res) => {
  const reviews = await MentorReview.find(req.body)
  res.status(StatusCodes.OK).json(reviews)
}

const create = async (req, res) => {
  const review = await MentorReview.create(req.body)
  res.status(StatusCodes.OK).json(review)
}

const getOne = async (req, res) => {
  const reviewId = req.params.id
  const review = await MentorReview.findOne({ _id: reviewId })
  res.status(StatusCodes.OK).json(review)
}

const edit = async (req, res) => {
  const reviewId = req.params.id
  const review = await MentorReview.findByIdAndUpdate(
    { _id: reviewId },
    req.body,
    { new: true, runValidators: true }
  )
  res.status(StatusCodes.OK).json(review)
}

const remove = async (req, res) => {
  const reviewId = req.params.id
  const review = await MentorReview.findOneAndDelete({ _id: reviewId })
  res.status(StatusCodes.OK).json(review)
}

export {
  getAll,
  create,
  getOne,
  edit,
  remove
}
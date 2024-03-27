import BookReview from "../models/BookReview.js";
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, UnauthenticatedError, NotFoundError } from '../errors/index.js'

const getAll = async (req, res) => {
  const reviews = await BookReview.find(req.body)
  res.status(StatusCodes.OK).json(reviews)
}

const create = async (req, res) => {
  const review = await BookReview.create({ createdBy: req.body.userId, ...req.body })
  res.status(StatusCodes.OK).json(review)
}

const getOne = async (req, res) => {
  const reviewId = req.params.id
  const review = await BookReview.findOne({ _id: reviewId })
  res.status(StatusCodes.OK).json(review)
}

const edit = async (req, res) => {
  const reviewId = req.params.id
  const review = await BookReview.findByIdAndUpdate(
    { _id: reviewId },
    req.body,
    { new: true, runValidators: true }
  )
  res.status(StatusCodes.OK).json(review)
}

const remove = async (req, res) => {
  const reviewId = req.params.id
  const review = await BookReview.findOneAndDelete({ _id: reviewId })
  res.status(StatusCodes.OK).json(review)
}

export {
  getAll,
  create,
  getOne,
  edit,
  remove
}
import CoursePlaylist from '../models/CoursePlaylist.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, UnauthenticatedError, NotFoundError } from '../errors/index.js'
import axios from 'axios'

const getAll = async (req, res) => {
  const courseId = req.body.courseId
  let result = CoursePlaylist.find({courseId})

  if (!result) {
    throw new BadRequestError("No video from course with id: " + courseId)
  }

  result = result.sort("order")
  const videos = await result
  res.status(StatusCodes.OK).json(videos)
}

const create = async (req, res) => {
  const {order} = req.body
  

  const exist = await CoursePlaylist.find({order})
  

  if (!exist[0]) {
    const video = await CoursePlaylist.create(req.body)
    
    return res.status(StatusCodes.OK).json(video)
  }
  
  await axios.patch(`http://localhost:3001/api/v1/coursePlaylist/${exist[0]._id}`, {order: exist[0].order+1})

  const video = await CoursePlaylist.create(req.body)
  res.status(StatusCodes.OK).json(video)
}

const getOne = async (req, res) => {
  const videoId = req.params.id
  const video = await CoursePlaylist.findOne({_id: videoId})

  if (!video) {
    throw new BadRequestError('No video with id: ' + videoId)
  }

  res.status(StatusCodes.OK).json(video)
}

const edit = async (req, res) => {
  const {order} = req.body
  const videoId = req.params.id

  if (!order) {
    const video = await CoursePlaylist.findOneAndUpdate(
      { _id: videoId  },
      req.body,
      { new: true, runValidators: true }
    )

    return res.status(StatusCodes.OK).json(video)
  }

  const exist = await CoursePlaylist.find({order})

  if (!exist[0]) {
    const video = await CoursePlaylist.findOneAndUpdate(
      { _id: videoId  },
      req.body,
      { new: true, runValidators: true }
    )

    return res.status(StatusCodes.OK).json(video)
  }

  await axios.patch(`http://localhost:3001/api/v1/coursePlaylist/${exist[0]._id}`, {order: exist[0].order+1})

  const video = await CoursePlaylist.findOneAndUpdate(
    { _id: videoId  },
    req.body,
    { new: true, runValidators: true }
  )

  res.status(StatusCodes.OK).json(video)
}

const remove = async (req, res) => {
  const videoId = req.params.id
  const video = await CoursePlaylist.findOneAndDelete({_id: videoId})

  if (!video) {
    throw new BadRequestError('No video with id: ' + videoId)
  }

  res.status(StatusCodes.OK).json()
}

export {
  getAll,
  create,
  getOne,
  remove,
  edit
}
import mongoose from "mongoose";
import { getVideoDurationInSeconds } from 'get-video-duration'


const CoursePlaylistSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.ObjectId,
    required: [true, 'Please provide the course id']
  },
  name: {
    type: String,
    required: [true, 'Please provide a name']
  },
  video: {
    type: String,
    required: [true, 'Please provide the video url']
  },
  order: {
    type: Number,
    required: [true, 'Please provide the order']
  },
  duration: {
    type: Number
  }
})


CoursePlaylistSchema.pre('save', async function (next) {
  const duration = await getVideoDurationInSeconds(
    this.video
  ).then((duration) => {
    return duration
  })
  this.duration = duration
  next()
})

export default mongoose.model('CoursePlaylist', CoursePlaylistSchema)
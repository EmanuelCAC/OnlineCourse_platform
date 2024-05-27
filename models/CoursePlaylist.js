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
    type: String
  },
  poster: {
    type: String,
    required: [true, 'Please provide the poster url']
  }
})


CoursePlaylistSchema.pre('save', async function (next) {
  const duration = await getVideoDurationInSeconds(
    this.video
  ).then((duration) => {
    const m = Math.floor(duration / 60)
    const s = Math.floor((duration - m * 60))
    const time = m.toString().padStart(2, "0") + ":" + s.toString().padStart(2, "0")
    return time
  })
  this.duration = duration
  next()
})

export default mongoose.model('CoursePlaylist', CoursePlaylistSchema)
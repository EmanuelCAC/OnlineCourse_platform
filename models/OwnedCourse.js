import mongoose from "mongoose"

const OwnedCourseSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.ObjectId,
    required: [true, "Please provide the book id"]
  },
  userId: {
    type: mongoose.ObjectId,
    required: [true, "Please provide the user id"]
  },
})

export default mongoose.model('OwnedCourse', OwnedCourseSchema)
import mongoose from "mongoose";

const MentorReviewSchema = mongoose.Schema({
  createdBy: {
    type: mongoose.ObjectId,
    required: [true, "Please provide the user id"]
  },
  mentorId: {
    type: mongoose.ObjectId,
    required: [true, "Please provide the mentor id"]
  },
  comment: {
    type: String,
    min: 0,
    max: 200
  },
  rating: {
    type: Number,
    required: [true, "Please provide a user id"],
    min: 1,
    max: 5
  },
  like: {
    type: Array,
    default: []
  }
}, { timestamps: true })

export default mongoose.model('MentorReview', MentorReviewSchema)
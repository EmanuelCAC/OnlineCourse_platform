import mongoose from "mongoose";

const BookReviewSchema = mongoose.Schema({
  createdBy: {
    type: mongoose.ObjectId,
    required: [true, "Please provide the user id"]
  },
  bookId: {
    type: mongoose.ObjectId,
    required: [true, "Please provide the book id"]
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

export default mongoose.model('BookReview', BookReviewSchema)
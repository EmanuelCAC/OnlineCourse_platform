import mongoose from "mongoose"

const OwnedBookSchema = new mongoose.Schema({
  bookId: {
    type: mongoose.ObjectId,
    required: [true, "Please provide the book id"]
  },
  userId: {
    type: mongoose.ObjectId,
    required: [true, "Please provide the user id"]
  },
})

export default mongoose.model('OwnedBook', OwnedBookSchema)
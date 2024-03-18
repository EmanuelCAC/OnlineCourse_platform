import mongoose from "mongoose"

const BookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    minlength: 3,
    maxlength: 50
  },
  author: {
    type: String,
    required: [true, 'Please provide a author']
  },
  image: {
    type: String,
    required: [true, 'Please provide a image']
  },
  rating: {
    type: Number,
    default: 1,
    min: 1,
    max: 5
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price']
  }
})

export default mongoose.model('Book', BookSchema)
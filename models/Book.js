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
  price: {
    type: Number,
    required: [true, 'Please provide a price']
  },
  category: {
    type: String,
    required: [true, 'Please provide a category'],
    enum: {
      values: ['Kindergarten', 'High School', 'College'],
      message: '{VALUE} is not supported',
    }
  }
}, { timestamps: true })

export default mongoose.model('Book', BookSchema)
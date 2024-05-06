import mongoose from "mongoose"
import axios from "axios"

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
  },
  rating: {
    type: Number,
    default: 0
  }
}, { timestamps: true })

BookSchema.pre('findOneAndUpdate', async function (next) {
  try {
    const { data } = await axios.post(`http://localhost:3001/api/v1/book/review/all`, { bookId: this._conditions._id })
    if (data[0]) {
      let average = 0
      let i = 0
      for (i; i < data.length; i++) {
        average += data[i].rating
      }
      this.set({ rating: (Number((average / i).toFixed(2))) })
    } else {
      this.set({ rating: 0 })
    }
    
  } catch (error) {
    console.log(error)
  }
  next()
})

export default mongoose.model('Book', BookSchema)
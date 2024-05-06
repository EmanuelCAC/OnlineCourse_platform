import mongoose from "mongoose"
import axios from "axios"

const CourseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide the a name"],
    minlength: 3,
    maxlength: 50
  },
  description: {
    type: String,
    required: [true, "Please provide a description"],
    minlength: 3,
    maxlength: 256
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
    type: Array,
    required: [true, 'Please provide a category'],
  },
  rating: {
    type: Number,
    default: 0
  },
  instructorId: {
    type: mongoose.ObjectId,
    required: [true, 'Please provide a instructor id'],
  },
  duration: {
    type: Number,
    required: [true, 'Please provide the duration']
  },
  lessons: {
    type: Number,
    required: [true, 'Please provide the amount of lessons']
  },
  quizzes: {
    type: Number,
    required: [true, 'Please provide the amount of quizzes']
  },
  certificated: {
    type: Boolean,
    default: false
  },
  language: {
    type: String,
    required: [true, 'Please provide a language']
  },
  access: {
    type: String,
    default: "Lifetime"
  }
}, { timestamps: true })

CourseSchema.pre('findOneAndUpdate', async function (next) {
  try {
    const { data } = await axios.post(`http://localhost:3001/api/v1/course/review/all`, { courseId: this._conditions._id })
    if (data[0]) {
      let average = 0
      let i
      for (i = 0; i < data.length; i++) {
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

export default mongoose.model('Course', CourseSchema)
import mongoose from "mongoose"

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


export default mongoose.model('Course', CourseSchema)
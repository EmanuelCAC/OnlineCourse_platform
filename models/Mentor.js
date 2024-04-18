import mongoose from "mongoose";

const MentorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    minlength: 3,
    maxlength: 50
  },
  image: {
    type: String,
    required: [true, 'Please provide a image'],
  },
  role: {
    type: Array,
    required: [true, 'Please provide a role'],
  },
  totalCourse: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 0
  },
  experience: {
    type: Number,
    default: 0
  },
  graduated: {
    type: Boolean,
    default: false
  },
  language: {
    type: Array,
    required: [true, 'Please provide a language'],
  }
})

export default mongoose.model('Mentor', MentorSchema)
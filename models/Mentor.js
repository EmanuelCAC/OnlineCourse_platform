import mongoose from "mongoose";
import axios from "axios"

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

MentorSchema.pre('findOneAndUpdate', async function (next) {
  try {
    const { data } = await axios.post(`http://localhost:3001/api/v1/mentor/review/all`, { instructorId: this._conditions._id })
    if (data[0]) {
      let average = 0
      let i
      for (i = 0; i < data.length; i++) {
        average += data[i].rating
      }
      this.set({ rating: (Number((average / i).toFixed(2))) })
    }
  } catch (error) {
    console.log(error)
  }
  next()
})

MentorSchema.pre('findOneAndUpdate', async function (next) {
  try {
    const { data } = await axios.get(`http://localhost:3001/api/v1/course?instructorId=${this._conditions._id}`)
    this.set({ totalCourse: Number(data.length) })
  } catch (error) {
    console.log(error)
  }
  next()
})

export default mongoose.model('Mentor', MentorSchema)
import mongoose from "mongoose"
import bcrypt from 'bcrypt'

const TempUserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    minlength: 3,
    maxlength: 50
  },
  email: {
    type: String,
    required: [true, 'Please provide a email'],
    match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please provide a valid email'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6,
  },
  code: {
    type: String,
    required: [true, 'Please provide a password'],
    maxlength: 4,
    minlength: 4
  }
}, { timestamps: true })

TempUserSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

TempUserSchema.pre('findOneAndUpdate', async function (next) {
  const pass = toString(this._update.password)
  const hash = await bcrypt.hash(pass, 10)
  this.set({password: hash})
  next()
})

export default mongoose.model('TempUser', TempUserSchema)
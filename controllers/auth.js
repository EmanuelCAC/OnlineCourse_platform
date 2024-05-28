import User from "../models/User.js";
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, UnauthenticatedError, NotFoundError } from "../errors/index.js";
import bcrypt from 'bcrypt'

const register = async (req, res) => {
  const {email, name, password} = req.body

  const user = await User.create({email, name, password})

  const token = user.createJWT()
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token })
}

const registerWithGoogle = async (req, res) => {
  const {email, name, password, image} = req.body
  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await User.create({email, name, password: hashedPassword, image})

  const token = user.createJWT()
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token })
}

const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new BadRequestError('Please provide email and password')
  }

  const user = await User.findOne({ email })

  if (!user) {
    throw new UnauthenticatedError('Invalid Credencials')
  }

  const isPasswordCorrect = await user.comparePassword(password)

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credencials')
  }

  const token = user.createJWT()
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token })
}

export {
  register,
  login,
  registerWithGoogle
}
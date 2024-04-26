import User from "../models/User.js";
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, UnauthenticatedError, NotFoundError } from "../errors/index.js";

const register = async (req, res) => {
  const {email, name, password} = req.body

  const user = await User.create({email, name, password})

  const token = user.createJWT()
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token })
}

const login = async (req, res) => {
  const { email, password } = req.body
  console.log(password);

  if (!email || !password) {
    throw new BadRequestError('Please provide email and password')
  }

  const user = await User.findOne({ email })

  if (!user) {
    throw new UnauthenticatedError('Invalid Credencials')
  }

  const isPasswordCorrect = await user.comparePassword(password)
  console.log(isPasswordCorrect);

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credencials')
  }

  const token = user.createJWT()
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token })
}

export {
  register,
  login,
}
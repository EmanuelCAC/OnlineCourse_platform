import User from "../models/User.js";
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, UnauthenticatedError } from "../errors/index.js";


const register = async (req, res) => {
  const {email, name, password1, password2} = req.body

  if(!password1) {
    throw new BadRequestError("Please provide password")
  }

  if(!password2) {
    throw new BadRequestError("Please confirm password")
  }

  if(password1 != password2) {
    throw new BadRequestError("Both passwords must be the same")
  }

  if(!email) {
    throw new BadRequestError("Please provide email")
  }

  const user = await User.create({email, name, password1})
  const token = user.createJWT()
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })
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
  login
}
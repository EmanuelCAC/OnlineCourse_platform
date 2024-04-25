import User from "../models/User.js";
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, UnauthenticatedError, NotFoundError } from "../errors/index.js";
import sgMail from '@sendgrid/mail'
import dotenv from 'dotenv'

dotenv.config()

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

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

  const user = await User.create({email, name, password: password1})

  const msg = {
    to: email,
    from: 'emanuelc279@gmail.com', // Use the email address or domain you verified above
    subject: 'test2',
    text: 'test2',
    html: 
    `
    <form action="http://localhost:3001/api/v1/auth/confirm?id=${user._id}">
      <strong>Confirm Accout ${name}</strong><br><br>
      <input name="id" value=${user._id} style="display: hidden">
      <input type="submit" value="Submit">
    </form>
    `,
  };

  sgMail
    .send(msg, (error, result) => {
      if (error) {
        console.log(error);
      }
      else {
        console.log(result);
      }
    });
  res.status(StatusCodes.OK).json({status: "success"})
}


const confirmAccount = async (req, res) => {
  const userId = req.query.id
  const user = await User.findOneAndUpdate(
    {_id: userId},
    {confirmed: true},
    { new: true, runValidators: true }
  )

  if(!user) {
    throw new NotFoundError(`No user with id ${userId}`)
  }

  res.status(StatusCodes.CREATED).redirect('http://localhost:5173/')
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

  if (!user.confirmed) {
    throw new UnauthenticatedError('Account not validated')
  }

  const token = user.createJWT()
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token })
}

export {
  register,
  login,
  confirmAccount
}
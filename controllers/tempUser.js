import TempUser from "../models/TempUser.js";
import User from "../models/User.js";
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, UnauthenticatedError, NotFoundError } from '../errors/index.js'
import sgMail from '@sendgrid/mail'
import dotenv from 'dotenv'

dotenv.config()

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const getAll = async (req, res) => {
  const list = await TempUser.find()
  res.status(StatusCodes.OK).json({ user: list })
}

const getOne = async (req, res) => {
  const { _id, name, email } = await TempUser.findById({ _id: req.params.id })
  const user = { _id, name, email }

  if(!user) {
    throw new NotFoundError(`No temporary user with id ${_id}`)
  }

  res.status(StatusCodes.OK).json(user)
}

const create = async (req, res) => {
  const {email, name, password1, password2, code} = req.body

  if(!password1) {
    throw new BadRequestError("Please provide password")
  }

  if(!password2) {
    throw new BadRequestError("Please confirm password")
  }

  if(password1 != password2) {
    throw new BadRequestError("Both passwords must be the same")
  }

  const duplicated = await User.findOne({email: email})

  if (duplicated) {
    throw new BadRequestError("An account already exist with this email, please choose another email")
  }

  const exist = await TempUser.findOne({email: email})

  if (exist) {
    const user = await TempUser.findByIdAndUpdate(
      { _id: exist._id }, 
      {
        email,
        name,
        code,
        password: password1
      }, 
      { new: true, runValidators: true }
    )

    const msg = {
      to: email,
      from: 'emanuelc279@gmail.com', // Use the email address or domain you verified above
      subject: 'Account Confirmation',
      text: 'Account Confirmation',
      html: 
      `
      <strong>Confirm Accout ${name}</strong><br><br>
      <strong>${code}</strong><br><br>
      `,
    };
  
    sgMail
      .send(msg, (error) => {
        if (error) {
          console.log(error);
        }
      });

    return res.status(StatusCodes.OK).json(user)
  }

  const user = await TempUser.create({email, name, password: password1, code})
   
  const msg = {
    to: email,
    from: 'emanuelc279@gmail.com', // Use the email address or domain you verified above
    subject: 'Account Confirmation',
    text: 'Account Confirmation',
    html: 
    `
    <strong>Confirm Accout ${name}</strong><br><br>
    <strong>${code}</strong><br><br>
    `,
  };

  sgMail
    .send(msg, (error, result) => {
      if (error) {
        console.log(error);
      }
      console.log(result);
    });

  res.status(StatusCodes.OK).json(user)
}

const edit = async (req, res) => {
  const user = await TempUser.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })

  const msg = {
    to: email,
    from: 'emanuelc279@gmail.com', // Use the email address or domain you verified above
    subject: 'Account Confirmation',
    text: 'Account Confirmation',
    html: 
    `
    <strong>Confirm Accout ${user.name}</strong><br><br>
    <strong>${user.code}</strong><br><br>
    `,
  };

  sgMail
    .send(msg, (error, result) => {
      if (error) {
        console.log(error);
      }
      console.log(result);
    });

  res.status(StatusCodes.OK).json(user)
}

const remove = async (req, res) => {
  const user = await TempUser.findByIdAndDelete({ _id: req.params.id })
  res.status(StatusCodes.OK).json(user)
}

export {
  getAll,
  getOne,
  create,
  edit,
  remove
}
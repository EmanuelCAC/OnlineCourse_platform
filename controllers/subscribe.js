import { StatusCodes } from 'http-status-codes'
import { BadRequestError, UnauthenticatedError } from "../errors/index.js";
import sgMail from '@sendgrid/mail'
import dotenv from 'dotenv'

dotenv.config()

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const subscribe = (req, res) => {
  const {email} = req.body
  const isEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  if (!email) {
    throw new BadRequestError("Pleas provide a email")
  }

  if (!isEmail.test(email)) {
    throw new BadRequestError("Pleas provide a valid email")
  }

  const msg = {
    to: email,
    from: 'emanuelc279@gmail.com', // Use the email address or domain you verified above
    subject: 'test2',
    text: 'test2',
    html: '<strong>Thank tou for subscribing</strong>',
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

  res.status(StatusCodes.OK).json({status: 'success'})
}

export {subscribe}
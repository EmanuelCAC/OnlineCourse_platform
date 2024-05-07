import User from "../models/User.js";
import { StatusCodes } from 'http-status-codes'
import {v2 as cloudinary} from 'cloudinary'
import { BadRequestError, UnauthenticatedError, NotFoundError } from "../errors/index.js";
import notFound from "../middleware/not-found.js";

cloudinary.config({
  secure: true
});

const uploadImg = async (imagePath) => {
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };

  try {
    // Upload the image
    const result = await cloudinary.uploader.upload(imagePath, options);
    return result
  } catch (error) {
    console.error(error);
  }
}

const UploadProfilePic = async (req, res) => {
  const image = await uploadImg(req.file.path)

  if (!image) {
    throw new BadRequestError("Please provide a valid image")
  }

  const user = await User.findOneAndUpdate(
    {_id: req.params.id},
    {image: image.url},
    { new: true, runValidators: true }
  )

  if (!user) {
    throw new NotFoundError("No user with id: " + req.params.id)
  }

  const token = user.createJWT()
  res.status(StatusCodes.OK).json({token})
}

export {
  UploadProfilePic
}
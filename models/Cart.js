import mongoose from "mongoose"

const CartSchema = new mongoose.Schema({
  productId: {
    type: mongoose.ObjectId,
    required: [true, "Please provide the product id"]
  },
  userId: {
    type: mongoose.ObjectId,
    required: [true, "Please provide the user id"]
  },
  productName: {
    type: String,
    required: [true, "Please provide the product name"],
    minlength: 3,
    maxlength: 50
  },
  image: {
    type: String,
    required: [true, 'Please provide a image']
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price']
  },
  amount: {
    type: Number,
    default: 1
  }
})

export default mongoose.model('Cart', CartSchema)
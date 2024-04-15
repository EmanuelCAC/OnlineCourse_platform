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
  amount: {
    type: Number,
    default: 1
  }
})

export default mongoose.model('Cart', CartSchema)
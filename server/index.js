import dotenv from 'dotenv'
import expreessAsyncErrors from 'express-async-errors'
import express from 'express'
import cors from 'cors'
import connectDB from '../db/connect.js'
import bookRouter from '../routes/book.js'
import userRouter from '../routes/user.js'
import tempUserRouter from '../routes/tempUser.js'
import authRouter from '../routes/auth.js'
import bookReviewRouter from '../routes/bookReview.js'
import cartRouter from '../routes/cart.js'
import courseRouter from '../routes/course.js'
import mentorRouter from '../routes/mentor.js'
import courseReviewRouter from '../routes/courseReview.js'
import mentorReviewRouter from '../routes/mentorReview.js'
import subscribeRoute from '../routes/subscribe.js'
import ownedBookRoute from '../routes/ownedBook.js'

import notFoundMiddleware from '../middleware/not-found.js'
import errorHandlerMiddleware from '../middleware/error-handler.js'
import authenticateUser from '../middleware/authentication.js'


dotenv.config()
const app = express()

app.use(express.json());
app.use(cors())

//Routes
app.use('/api/v1/user', userRouter)
app.use('/api/v1/tempUser', tempUserRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/book', bookRouter)
app.use('/api/v1/book/review', bookReviewRouter)
app.use('/api/v1/course/review', courseReviewRouter)
app.use('/api/v1/mentor/review', mentorReviewRouter)
app.use('/api/v1/cart', authenticateUser, cartRouter)
app.use('/api/v1/course', courseRouter)
app.use('/api/v1/mentor', mentorRouter)
app.use('/api/v1/subscribe', subscribeRoute)
app.use('/api/v1/ownedBook', ownedBookRoute)


app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3001;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start()
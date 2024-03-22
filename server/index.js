import dotenv from 'dotenv'
import expreessAsyncErrors from 'express-async-errors'
import express from 'express'
import cors from 'cors'
import connectDB from '../db/connect.js'
import bookRouter from '../routes/book.js'
import userRouter from '../routes/user.js'
import authRouter from '../routes/auth.js'
import notFoundMiddleware from '../middleware/not-found.js'
import errorHandlerMiddleware from '../middleware/error-handler.js'

dotenv.config()
const app = express()

app.use(express.json());
app.use(cors())

//Routes
app.use('/api/v1/book', bookRouter)
app.use('/api/v1/user', userRouter)
app.use('/api/v1/auth', authRouter)

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
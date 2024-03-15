import dotenv from 'dotenv'
import expreessAsyncErrors from 'express-async-errors'
import express from 'express'
import path from 'path'
import cors from 'cors'

dotenv.config()
const app = express()

app.use(express.json());
app.use(cors())
// app.use(express.static(path.resolve('./client')));

app.get('/api', (req, res) => {
  console.log("hello");
  res.json({ message: "Hello from server!" })
})

app.get('*', (req, res) => {
  res.sendFile(path.resolve('./client', 'index.html'))
})

const port = process.env.PORT || 3001;

app.listen(port, () =>
  console.log(`Server is listening on port ${port}...`))
import express from 'express';
import 'express-async-errors'; 
import { PORT } from './utils/config';
import { connectToDatabase } from './utils/db';
import { errorMiddleware } from './middleware/errors_middleware';
import { unknownEndpoint } from './middleware/unknown_endpoint';
import morgan from 'morgan';
import cors from 'cors';
import loginRouter from './routes/login';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
morgan.token('body', (req: express.Request) => JSON.stringify(req.body))

const app = express()
app.use(cors())
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(express.json())


//routes***********
app.use('/api/login', loginRouter) //send token after login
//routes***********

app.use(unknownEndpoint)
app.use(errorMiddleware)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start().catch(console.error)
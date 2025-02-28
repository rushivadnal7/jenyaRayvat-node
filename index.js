import express from 'express'
import cors from 'cors'
import 'dotenv/config.js'
import { connectDb } from './config/db.js';
import userRouter from './routes/userRoute.js';
import eventRouter from './routes/eventRoute.js';

const app = express();

const port = 9000;

//    "mongodb": "^6.10.0",
// "mongoose": "^8.6.4",


app.use(express.json());
app.use(cors());
connectDb();
    
app.use('/api/user' , userRouter)
app.use('/api/event' , eventRouter)

app.get('/',(req,res) => {
    res.send('backend is live! rushikesh')
});

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})
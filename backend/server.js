import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
const port = process.env.PORT || 5000; 
import userRoutes from  './routes/userRoutes.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
    
const app = express();

 connectDB()
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use('/api/users',userRoutes);


app.get('/',(req,res)=>{
    res.send('Server is ready');
})
app.use(notFound)
app.use(errorHandler)
app.listen(port,()=>console.log(`server started on port ${port}`));


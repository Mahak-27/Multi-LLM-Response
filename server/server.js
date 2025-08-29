import express from 'express';
import chatRoutes from './src/routes/chatRoute.js'
import dotenv from 'dotenv';
import cors from 'cors';


dotenv.config();

const app=express();
const PORT =3000;

app.use(cors());

app.use(express.json());
app.use('/api',chatRoutes);
app.get('/',(req,res)=>{
    return res.send("Hello from Server!")
})


app.listen(PORT ,()=>{
    console.log(`Server running on Port: http://localhost:${PORT}`)
})
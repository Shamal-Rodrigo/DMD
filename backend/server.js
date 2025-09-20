const express = require ("express");
const cors = require ("cors");
// const mongoose = require ("mongoose");
const dotenv = require('dotenv');
const connectDB = require ('./config/db')

const JobRoutes = require('./routes/jobRoutes')


//Connect MongoDB
dotenv.config()
connectDB();


const app = express();

app.use(cors());
app.use(express.json());                     // <-- parses JSON
app.use(express.urlencoded({ extended: true })); // 

app.use('/api/job',JobRoutes)

//check the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`))
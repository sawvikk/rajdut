/*
Title : index file for making chat application 
Description: the file that runs initially once the Node.js code is executed. 
Author: Sawvik Kar Dipto
FirstDate: 2/05/2024
LastDate: 2/05/2024
*/

//dependencies 
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const path = require('path'); 

//internal imports
const {notFoundHandler,errorHandler} = require('./middleWares/common/errorHandler'); 
const loginRouter = require('./router/loginRouter'); 
const userRouter = require('./router/userRouter'); 
const inboxRouter = require('./router/inboxRouter'); 



const app = express(); 
dotenv.config();

//database connection
mongoose
    .connect(process.env.MONGO_CONNECTION_STRING)
    .then(()=>{console.log('Database Connected Successfully'); })
    .catch((err)=>{console.log(err); });

//request parsers
app.use(express.json()); 
app.use(express.urlencoded({extended:true})); 

//set view engine
app.set('view engine','ejs'); 

//set static folders
app.use(express.static(path.join(__dirname,"public")));

//parse cookies 
app.use(cookieParser(process.env.COOKIE_SECRET));

//routing setup 
app.use('/',loginRouter); 
app.use('/users',userRouter); 
app.use('/inbox',inboxRouter); 

//404 notfound handlers
app.use(notFoundHandler); 

//error handling
app.use(errorHandler); 

//listen
app.listen(process.env.PORT,()=>{
    console.log('Listening to the ',process.env.PORT);
}); 




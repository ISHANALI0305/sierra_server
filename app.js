// Import All Dependencies
const dotenv = require('dotenv');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

// Configure ENV File & Require Connection File
dotenv.config({path : './config.env'});
require('./db/conn');
const port = process.env.PORT || 3001;

// Require Model
const Message = require('./models/msgSchema');

// These Method is Used to Get Data and Cookies from FrontEnd
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cookieParser());

app.get('/', (req, res)=>{
    res.send("Hello World");
})

// Message
app.post('/message', async (req, res)=>{
    try {
        // Get body or Data
        const name = req.body.name;
        const email = req.body.email;
        const subject = req.body.subject;
        const message = req.body.message;

        const sendMsg = new Message({
            name : name,
            email : email,
            subject : subject,
            message : message
        });

        // Save Method is Used to Create User or Insert User
        // But Before Saving or Inserting, Password will Hash 
        // Because of Hashing. After Hash, It will save to DB
        const created = await sendMsg.save();
        console.log(created);
        res.status(200).send("Sent");

    } catch (error) {
        res.status(400).send(error)
    }
})

if (process.env.NODE_ENV === "production"){
    app.use(express.static("client/build"))
}

// Run Server 
app.listen(port, ()=>{
    console.log("Server is Listening")
})


// Our Backend is Done And Store Data in Database
// Now Its Time to Connect Front End With BackEnd
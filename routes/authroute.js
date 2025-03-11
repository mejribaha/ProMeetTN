const express = require("express");
const User = require("../models/user");
const router = express.Router();
const jwt= require('jsonwebtoken')
const nodemailer= require("nodemailer")
const authentication= require('../midelware/authmidelware');

const Emailservice = require('../mailer/Emailservice');
 require('dotenv').config();
 const emailService = new Emailservice({
   host: process.env.EMAIL_HOST,
   port: parseInt(process.env.EMAIL_PORT || '587'),
   secure: process.env.EMAIL_SECURE === 'false',
   auth: {
     user: process.env.EMAIL_USER,
     pass: process.env.EMAIL_PASSWORD
   }
 }); 

 // Looking to send emails in production? Check out our Email API/SMTP product!
const transport = nodemailer.createTransport({
  host:process.env.EMAIL_HOST ,
  port:process.env.EMAIL_PORT ,
  auth: {
    user:process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});


router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();


    const mailOptions= {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "welcome ",
      text:"welcome to our ProMeet App",
    };
    await transport.sendMail(mailOptions)
    res.status(200).send({ message: "user saved successfully", user });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
})
router.post('/login',async (req, res) => {
    try{
        const {email, password} = req.body
        const user = await User.findOne({ email })

        if(!user){
            res.status(404).send({message:'user not found'})
        }

        const isHavePassword =  user.comparePassword(password)
        if(!isHavePassword){
            res.status(400).send({message:'invalid credentiels'})
        }

        const token = await jwt.sign({userId:user._id},process.env.SECRET_KEY)
            res.send({message:'user logged in successfully',token})

    } catch (error) {
        res.status(400).send({message: error.message})
    }
})


router.get('/me',authentication,async(req,res) => {
    try {
      console.log("running...")
      const user = await User.findById(req.user.userId).select('-password')
      if(!user){
          res.status(404).send({message: 'User not found'})
      }
      res.send(user)
    } catch (error) {
      res.status(500).send({message:error.message})
    }
})

module.exports = router;
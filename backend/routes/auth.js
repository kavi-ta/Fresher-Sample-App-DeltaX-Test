const express = require("express")
const router = express.Router()
const{check, validationResult} = require('express-validator')
const { signin ,signout,isSignedIn} = require("../controllers/auth.js")

router.post('/signin',[
    check("name","Name should be atleast 3 characters").isLength({min:3}),
    check("email","Email is required").isEmail()
],
signin)

router.get('/signout',signout)



module.exports = router
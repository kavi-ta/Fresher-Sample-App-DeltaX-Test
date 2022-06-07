// handle signup signin etc
const {con} = require('../fresherSampledb.js')
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')
const mysql = require('mysql')
// create connection
function connection(){
    con.connect((error)=>{
        if(error){
            console.log(error)
        }
        else{
            console.log("DB Connected!")
        }
    })
}

exports.signin = (req,res)=>{
    const errors = validationResult(req)
    console.log(errors)
    if(!errors.isEmpty()){
        // if any error
        return res.status(422).json({
            error:errors.array()[0].msg
        })
    }
    const {name,email} = req.body
    console.log(name,email)
    connection()
    con.query(`SELECT * from Users where email = "${email}"`,
     (error,user)=>{
        if(!user || user.length === 0){
            console.log("user not in db")
            con.query(`INSERT INTO Users (Name, Email) VALUES ("${name}","${email}")`,
            (error,response)=>{
                if (error){
                    return res.status(400).json({
                        error:error
                    })
                }
                else{
                    console.log()
                    con.query(`SELECT * from Users where email = "${email}"`,
                    (err,user)=>{
                        console.log("user added to db")
                        if(err){
                            return res.status(400).json({
                                error:error
                            })
                        }
                        else{
                            console.log(user[0])
                            // create token
                            const token = jwt.sign({Id:user[0].Id},process.env.SECRET)
                            // put token in cookie
                            res.cookie("token",token,{expire:new Date()+9999})
                            const {Id,Name,Email} = user[0]
                           
                            return res.json({token,user:{Id,Name,Email}})
                        }
                    })
                }
            })
        }
        else if(error){
                return res.status(400).json({
                    error:error
                })
        }
        else{
        console.log(user[0])
        if(name!=user[0].Name){
            return res.status(400).json({
                error:"Name does not match!"
            })
        }
        // create token
        const token = jwt.sign({Id:user[0].Id},process.env.SECRET)
        // put token in cookie
        res.cookie("token",token,{expire:new Date()+9999})
        const {Id,Name,Email} = user[0]
       
        return res.json({token,user:{Id,Name,Email}})
        }
        
     })
}


// signout

exports.signout = (req,res)=>{
    res.clearCookie("token")
    res.json({
        messsage:'User Signout Successfully'
    })
}

// protectect routes
exports.isSignedIn = expressJwt({
    // create an object
    secret:process.env.SECRET,
    // set user property
    userProperty:"auth"
})

// custom middle wares
exports.isAuthenticated = (req,res,next)=>{
    
    let checker = req.profile && req.auth && (req.profile.Id == req.auth.Id)
    
    if(!checker){
        return res.status(403).json(
            {
                error:"You need to sign in for more access!"
            }
        )
    }
    next()
}
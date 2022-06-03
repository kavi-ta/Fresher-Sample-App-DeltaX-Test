// handle signup signin etc
const {con} = require('../fresherSampledb.js')
const {validationResult} = require('express-validator')

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

exports.getUserById = (req,res,next,id)=>
{
    console.log("in getuser by id")
    connection()
    con.query(`SELECT * from users where Id = ${id}`,
    (error,user)=>{
        if(error||!user){
            return res.status(400).json({
                error:"No user found in db"
            })
        }
        // if user found
         
        req.profile = user[0]
        next()
    })
}

exports.getUser = (req,res)=>{
    // todo get back here for password
    
    return res.json(req.profile)
}

exports.rateSong = (req,res)=>{
    const userId = req.profile.Id
    const songId = req.song.Id
    
    const {rating} = req.body
    console.log(userId,songId,rating)
    connection()
    con.query(`INSERT INTO UserSongRating (UserId, SongId, Rating) VALUES (${userId},${songId},${rating}) ON DUPLICATE KEY UPDATE UserId = VALUES(UserId), SongId = VALUES(SongId), Rating = VALUES(Rating) `,
    (error,result)=>{
        if(error){
            return res.status(400).json({
                error:error
            })
        }
        return res.json(result)
    })

}

exports.rateArtist = (req,res)=>{
    const userId = req.profile.Id
    const artistId = req.artist.Id
    const {rating} = req.body
    connection()
    con.query(`INSERT INTO UserArtistRating (UserId, ArtistId, Rating) VALUES (${userId},${artistId},${rating}) ON DUPLICATE KEY UPDATE UserId = VALUES(UserId), ArtistId = VALUES(ArtistId), Rating = VALUES(Rating) `,
    (error,result)=>{
        if(error){
            return res.status(400).json({
                error:error
            })
        }
        return res.json(result)
    })

}

exports.getArtistRating=(req,res)=>{
    const userId = req.profile.Id
    const artistId = req.artist.Id
    connection()
    con.query(`SELECT Rating FROM UserArtistRating where UserId = ${userId} and ArtistId = ${artistId}`,
    (error,rating)=>{
        if(rating==[]){
            return res.json({
                rating:0
            })
        }
        else if(error){
            return res.status(400).json({
                error:error
            })
        }
        else{
            return res.json(rating)
        }
    })
}

exports.getSongRating=(req,res)=>{
    const userId = req.profile.Id
    const songId = req.song.Id
    connection()
    con.query(`SELECT Rating FROM UserSongRating where UserId = ${userId} and SongId = ${songId}`,
    (error,rating)=>{
        if(error){
            return res.status(400).json({
                error:error
            })
        }
        else{
            return res.json(rating ? rating : 0)
        }
    })
}

exports.updateArtistRating = ()=>{
    const userId = req.profile.Id
    const artistId = req.artist.Id
    const rating = req.body
    connection()
    con.query(`UPDATE UserArtistRating SET Rating= ${rating} where UserId = ${userId} AND ArtistId = ${artistId}`,
    (error,response)=>{
        
        if(error){
            return res.status(400).json({
                error:error
            })
        }
        else{
            return res.json(response)
        }
    })
}

exports.updateSongRating = ()=>{
    const userId = req.profile.Id
    const songId = req.song.Id
    const rating = req.body
    connection()
    con.query(`UPDATE UserSongRating SET Rating= ${rating} where UserId = ${userId} AND SongId = ${songId}`,
    (error,response)=>{
        
        if(error){
            return res.status(400).json({
                error:error
            })
        }
        else{
            return res.json(response)
        }
    })
}
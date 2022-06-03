const {con} = require('../fresherSampledb.js')
const {validationResult} = require('express-validator')
const mysql = require('mysql')
const { response } = require('express')

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

exports.addSong = (req,res)=>{
    
    const {name,coverImage,releaseDate,path} = req.body
    if (!name || !coverImage || !releaseDate ||!path){
        return res.status(400).json({
            error:"All fields are required!"
        })
    }
    connection()
    con.query(`INSERT INTO Songs (Name, CoverImage, ReleaseDate,Path) VALUES ("${name}","${coverImage}","${releaseDate}","${path}")`,
    (error,song)=>{
        if(error){
            return res.status(400).json({
                error:error
            })
        }
        return res.json(song)
    })
}





exports.getAllSongs = (req,res)=>{
    let limit = req.query.limit ? parseInt(req.query.limit) : null
    let sortBy = req.query.sortBy ? req.query.sortBy:"Songs.Id"
    
    connection()
    if(limit){
        con.query(`SELECT Songs.Id as SongId, Songs.Name, Songs.CoverImage , Songs.ReleaseDate, Songs.Path, IFNULL(Rating,0) as Rating from Songs left join (SELECT SongId,Name, CoverImage,ReleaseDate, Path,CAST(AVG(Rating) AS INT) AS Rating FROM Songs INNER JOIN UserSongRating ON Songs.Id = UserSongRating.SongId GROUP BY Songs.Id) as T1 on Songs.Id = T1.SongId ORDER BY ${sortBy} DESC LIMIT ${limit}`,
        (error,songs)=>{
            if(error){
                return res.status(400).json({
                    error:error
                })
            }
          return res.json(songs)
        }
        
        )
    }
    else{
        con.query(`SELECT Songs.Id as SongId, Songs.Name, Songs.CoverImage , Songs.ReleaseDate, Songs.Path, IFNULL(Rating,0) as Rating from Songs left join (SELECT SongId,Name, CoverImage,ReleaseDate, Path,CAST(AVG(Rating) AS INT) AS Rating FROM Songs INNER JOIN UserSongRating ON Songs.Id = UserSongRating.SongId GROUP BY Songs.Id) as T1 on Songs.Id = T1.SongId ORDER BY ${sortBy} DESC`,
        (error,songs)=>{
        if(error){
                return res.status(400).json({
                    error:error
                })
            }
          return res.json(songs)
        }
        
        )
    }
    

  }

exports.getSongById = (req,res,next,Id)=>{
    connection()
    con.query(`SELECT * FROM Songs where Id= ${Id} `,
    (error,song)=>{
      if(error || !song){
          return res.status(400).json({
              error:error
          })
      }
      req.song = song[0]
      next()
    })
}

exports.getSong = (req,res)=>{
  return res.json(req.song)
}

exports.addArtistToSong = (req,res)=>{
    connection()
    const songId = req.song.Id
    const {artistIds}= req.body
    console.log(artistIds)
    if (!songId || !artistIds){
        return res.status(400).json({
            error:"Data incomplete"
        })
    }
    let values = []
    for(let i=0;i<artistIds.length;i++){
        values.push([parseInt(artistIds[i]),songId])
    }
    console.log(values)
    // map the artist Id with song
    con.query(`INSERT INTO ArtistSongMapping (ArtistId,SongId) VALUES (?,?) on duplicate key update ArtistId=VALUES(ArtistId), SongId=VALUES(SongId)`,[values],
    (error,result)=>{
        if(error){
            return res.status(400).json({
                error:error
            })
        }
        return res.json(result)
    }
    )
}


exports.getArtistsForASong =(req,res)=>{
    const songId = req.song.Id
    connection()
    con.query(`SELECT Artists.Name from (SELECT DISTINCT(ArtistId) FROM ArtistSongMapping WHERE SongId =${songId}) AS T1 INNER JOIN Artists ON T1.ArtistId = Artists.Id`,
    (error,result)=>{
        if(error){
            return res.status(400).json({
                error:error
            })
        }
        return res.json(result)
    })
}


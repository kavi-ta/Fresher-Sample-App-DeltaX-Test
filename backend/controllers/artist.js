// handle signup signin etc
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


// create an Artist
exports.addArtist = (req,res)=>{
    
    const {artistName,artistdob,artistbio} = req.body
    
    connection()
    con.query(`INSERT INTO Artists (Name,Dob,Bio) VALUES ("${artistName}","${artistdob}","${artistbio}")`,
    (error,artist)=>{
        console.log(error)
        if(error){
            return res.status(400).json({
                error:"Artist not added to db"
            })

        }
        res.json({
            artistdob:artistdob,
            artist})
    })
}

exports.getAllArtists = (req,res)=>{
    let limit = req.query.limit ? parseInt(req.query.limit) : null
    let sortBy = req.query.sortBy ? req.query.sortBy:"Artists.Id"
    
    connection()
    if(limit){
        con.query(`SELECT Artists.Id as ArtistId, Artists.Name, Artists.DOB , Artists.Bio, IFNULL(Rating,0) as Rating from Artists left join (SELECT ArtistId,Name, DOB ,Bio,CAST(AVG(Rating) AS INT) AS Rating FROM Artists INNER JOIN UserArtistRating ON Artists.Id = UserArtistRating.ArtistId GROUP BY Artists.Id) as T1 on Artists.Id = T1.ArtistId ORDER BY ${sortBy} DESC LIMIT ${limit}`,
        (error,artists)=>{
            if(error){
                return res.status(400).json({
                    error:error
                })
            }
          return res.json(artists)
        }
        
        )
    }
    else{
        con.query(`SELECT Artists.Id as ArtistId, Artists.Name, Artists.DOB , Artists.Bio, IFNULL(Rating,0) as Rating from Artists left join (SELECT ArtistId,Name, DOB ,Bio,CAST(AVG(Rating) AS INT) AS Rating FROM Artists INNER JOIN UserArtistRating ON Artists.Id = UserArtistRating.ArtistId GROUP BY Artists.Id ) as T1 on Artists.Id = T1.ArtistId ORDER BY ${sortBy} `,(error,artists)=>{
            if(error){
                return res.status(400).json({
                    error:error
                })
            }
          return res.json(artists)
        }
        
        )
    }
    

  }

exports.getArtistById = (req,res,next,Id)=>{

    
      connection()
      con.query(`SELECT * FROM Artists where Id= ${Id} `,
      (error,artist)=>{
        if(error || !artist){
            return res.status(400).json({
                error:error
            })
        }
        req.artist = artist[0]
        next()
      })
  }

exports.getArtist = (req,res)=>{
    return res.json(req.artist)
  }

  exports.getSongsForAnArtist =(req,res)=>{
    const artistId = req.artist.Id
    connection()
    con.query(`SELECT Songs.Name from (SELECT DISTINCT(SongId) FROM ArtistSongMapping WHERE ArtistId =${artistId}) AS T1 INNER JOIN Songs ON T1.SongId = Songs.Id`,
    (error,result)=>{
        if(error){
            return res.status(400).json({
                error:error
            })
        }
        return res.json(result)
    })
}


  

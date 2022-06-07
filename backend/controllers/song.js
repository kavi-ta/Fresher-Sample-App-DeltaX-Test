const {con} = require('../fresherSampledb.js')
const mysql = require('mysql')
const formidable = require("formidable")
const fs = require("fs")
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
    const isFileValid = (file)=>{
        const type = file.mimetype.split("/").pop()
        const validTypes =["jpg","jpeg","png","mpeg","wav","mp3"]
        if (validTypes.indexOf(type)===-1){
            return false
        }
        return true
    }
    let form = new formidable.IncomingForm();
    
    form.keepExtensions = true

    var uploadFolder = __dirname.replace("controllers","")
    form.uploadDir = uploadFolder
    console.log(form)
    

    form.parse(req,(err,fields,files)=>{
       
        if(err){
            return res.status(400).json({
                error:err
                
            })}
            const {name,releaseDate} = fields
            if (!name || !releaseDate ){
                return res.status(400).json({
                    error:"All fields are required!"
                })
            }
            if (!files.coverImage.length){
                const file = files.coverImage
                const isValid = isFileValid(file)
                const fileName = Date.now()+"-"+encodeURIComponent(file.originalFilename.replace(/\s/g,"-"));
                var coverImageLocation = `files//${fileName}`
                if (!isValid){
                    return res.status(400).json({
                        message:"not a valid file"
                    })
                }
                try{
                    
                    fs.renameSync(file.filepath, uploadFolder+"\\files\\"+fileName)
                }
                catch(error){
                    res.status(400).json({
                        error:error
                    })
                } 
            }

            if (!files.coverImage.length){
                const file = files.coverImage
                const isValid = isFileValid(file)
                const fileName = "files/"+Date.now()+"-"+encodeURIComponent(file.originalFilename.replace(/\s/g,"-"));
                // const filelocation = `${Date.now()}-${fileName}`
                var audiofileLocation = `files/${fileName}`
                if (!isValid){
                    return res.status(400).json({
                        message:"not a valid file"
                    })
                }
                try{
                    
                    fs.renameSync(file.filepath, uploadFolder+"\\"+fileName)
                }
                catch(error){
                    console.log(error)
                }
                // connection()
               
                // con.query(`INSERT INTO image(file) VALUES("files/${filelocation}")`,
                // (error,response)=>{
                //     if(error){
                //         return res.json({
                //             error:error
                //         })
                //     }
                //     else{
                //         return res.json({
                //             response:"successfullly added to db"
                //         })
                //     }
                // })
            }

            if (!files.audioFile.length){
                const audiofile = files.audioFile
                const isValid = isFileValid(audiofile)
                const fileName = Date.now()+"-"+encodeURIComponent(audiofile.originalFilename.replace(/\s/g,"-"));
                // const filelocation = `${Date.now()}-${fileName}`
                var audiofileLocation = `audiofiles//${fileName}`
                if (!isValid){
                    return res.status(400).json({
                        message:"not a valid file"
                    })
                }
                try{
                    
                    fs.renameSync(audiofile.filepath, uploadFolder+"\\audiofiles\\"+fileName)
                }
                catch(error){
                    console.log(error)
                }
                
            }
            console.log(uploadFolder,audiofileLocation,coverImageLocation)
            connection()
            con.query(`INSERT INTO Songs (Name, CoverImage, ReleaseDate,AudioFile) VALUES ("${name}","${coverImageLocation}","${releaseDate}","${audiofileLocation}")`,
            (error,song)=>{
                if(error){
                    return res.status(400).json({
                        error:error
                    })
                }
                return res.json(song)
            })
    })
    }

exports.getAllSongs = (req,res)=>{
    let limit = req.query.limit ? parseInt(req.query.limit) : null
    let sortBy = req.query.sortBy ? req.query.sortBy:"Songs.Id"
    
    connection()
    if(limit){
        con.query(`SELECT Songs.Id as SongId, Songs.Name, Songs.CoverImage , Songs.ReleaseDate, Songs.AudioFile, IFNULL(Rating,0) as Rating from Songs left join (SELECT SongId,Name, CoverImage,ReleaseDate, AudioFile,CAST(AVG(Rating) AS INT) AS Rating FROM Songs INNER JOIN UserSongRating ON Songs.Id = UserSongRating.SongId GROUP BY Songs.Id) as T1 on Songs.Id = T1.SongId ORDER BY ${sortBy} DESC LIMIT ${limit}`,
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
    con.query(`INSERT INTO ArtistSongMapping(ArtistId,SongId) VALUES ? on duplicate key update ArtistId=VALUES(ArtistId), SongId=VALUES(SongId)`,[values],
    (error,result)=>{
        if(error){
            return res.status(400).json({
                error:error
            })
        }
        console.log(result)
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

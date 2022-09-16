const express= require("express")
const router = express.Router()
const{check, validationResult} = require("express-validator")
const { addArtist, getAllArtists, getArtistById, getArtist, addArtistToSong, getSongsForAnArtist } = require("../controllers/artist")
const {isSignedIn,isAuthenticated} = require("../controllers/auth")
const { getSongById } = require("../controllers/song")
const {getUserById} = require("../controllers/user")

// params
router.param("userId",getUserById)
router.param("artistId",getArtistById)
router.param("songId",getSongById)

router.post("/artist/create/:userId",isSignedIn,isAuthenticated,addArtist)

router.get("/artists",getAllArtists)
router.get('/artist/:artistId',getArtist)
router.get("/getsongsbyartist/:artistId",getSongsForAnArtist)

module.exports = router
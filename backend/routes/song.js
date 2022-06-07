const express = require("express")
const router = express.Router()
const {isSignedIn,isAuthenticated} = require("../controllers/auth")
const {addSong, getAllSongs, getSong, getSongById, addArtistToSong, getArtistsForASong, addimage, getimage , addsong} = require("../controllers/song")
const { getUserById } = require("../controllers/user")


router.param("userId",getUserById)
router.param("songId",getSongById)
router.post("/song/create/:userId",isSignedIn,isAuthenticated,addSong)
router.get("/songs",getAllSongs)
router.get("/song/:songId",getSong)
router.get("/getartistsbysong/:songId",getArtistsForASong)
router.post("/addartisttosong/:userId/:songId",isSignedIn,isAuthenticated,addArtistToSong)
module.exports = router

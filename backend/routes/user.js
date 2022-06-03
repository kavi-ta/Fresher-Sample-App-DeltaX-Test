const express = require("express")
const router = express.Router()
const {getUser, getUserById, rateSong, rateArtist, getArtistRating, getSongRating} = require("../controllers/user")
const {isSignedIn,isAuthenticated} = require("../controllers/auth")
const { getAllSongs, getSongById } = require("../controllers/song")
const { getArtistById } = require("../controllers/artist")

router.param("userId",getUserById)
router.param("songId",getSongById)
router.param("artistId",getArtistById)
router.get("/user/:userId",isSignedIn,isAuthenticated,getUser)
router.post("/songrating/:userId/:songId",isSignedIn,isAuthenticated,rateSong)
router.post("/artistrating/:userId/:artistId",isSignedIn,isAuthenticated,rateArtist)

router.get("/getartistrating/:userId/:artistId",isSignedIn,isAuthenticated,getArtistRating)
router.get("/getsongrating/:userId/:songId",isSignedIn,isAuthenticated,getSongRating)

module.exports = router
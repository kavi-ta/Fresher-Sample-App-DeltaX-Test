import React,{useState,useEffect} from "react"
import { getArtists } from "../artist/helper/artistapicalls"
import { getSongs } from "../song/helper/songapicalls"
import "../style.css"
import ArtistCell from "./ArtistCell"
import Base from "./Base"

import SongCell from "./SongCell"


const Home =()=>{
   const [songs, setSongs] = useState([])
   const [songError, setSongError] = useState(false)
   const [artists,setArtists] = useState([])
   const [artistError, setArtistError] = useState(false)
   const [reload, setReload] = useState(false)
   const preload =()=>{
       getSongs("Rating",10)
       .then(data=>{
           if(data.error){
            setSongError(data.error)
           }
           else{
              
               setSongs(data)
           }
       })

       getArtists("Rating",10)
       .then(data=>{
           if(data.error){
            setArtistError(data.error)
           }
           else{
               setArtists(data)
           }
       })   
   }
   useEffect(()=>{
       preload()
   },[reload])

    return (
        <Base>
        <div className="row ">
        <h1 className="heads"> Top 10 Songs</h1>
        <div className="row">
        <div class="card-deck">
        {songs.map((song,index)=>{
            
            return (
                <div class="card" key = {index}>
                <SongCell song={song}
                setReload = {setReload}
                reload = {reload}
                />
                </div>
            
            )})}
        
        </div>
        
            
        </div>
        </div>
        <div className="row ">
        <h1 className="heads"> Top 10 Artists</h1>
        <div className="row">
        <div class="card-deck">
        {artists.map((artist,index)=>{
       
            return (
                <div class="card" key = {index}>
                <ArtistCell artist={artist}
                setReload = {setReload}
                reload = {reload}
                />
                </div>
            
            )})}
        
        </div> 
        </div>
        </div>
        </Base>
    )
}

export default Home
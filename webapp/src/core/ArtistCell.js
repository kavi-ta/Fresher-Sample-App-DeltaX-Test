import React, {useState,useEffect} from 'react'
import { getSongsByArtistId } from '../artist/helper/artistapicalls'
import { isAuthenticated } from '../auth/helper/authapicalls'
import { getArtistRating } from '../user/helper/userapicalls'
import Rating from './Rating'


const ArtistCell=({
    artist, 
    setReload = f=>f,
    reload = undefined
})=> {
    
    let months = ["-","Jan","Feb","Mar","Apr","May","Jun","July","Aug","Sept","Oct","Nov","Dec"]
    const [rating, setRating] = useState(0)
    const [error, setError] = useState(false)
    const artistId = artist.ArtistId
    const artistName = artist.Name
    const artistBio = artist.Bio
    const artistRating = artist.Rating
    const artistdob = artist.DOB
    const {user,token} = isAuthenticated()
    
    const dob =  artistdob.slice(8,10)+" "+ months[parseInt(artistdob.slice(5,7))]+", "+artistdob.slice(0,4)
    const [artistSongs,setArtistSongs] = useState([])
    const preload = ()=>{
        if(isAuthenticated()){
          getArtistRating(user.Id,token,artistId)
        .then(
            data=>{
                if(data.error){
                    setError(true)
                }
                else{
                 
                    if(data.rating){
                        setRating(data.rating)
                        console.log(user,token,data.rating)
                    }
                    else{
                        setRating(0)
                    }
                }
            }
        )
          }
          getSongsByArtistId(artistId).then(
            data=>{
              if(data.error){
                setError(data.error)
              }
              else{
                
                let a = []
                for(let i=0;i<data.length;i++){
                  a.push(data[i].Name)
                }
                setArtistSongs(a)
              }
            }
          )
          setReload(false)
    }
    
    useEffect(() => {
      preload()
    }, [reload])
    
    const rateArtistMessage = (e)=>{
      if(!isAuthenticated()){
        return alert("Sign in to rate artist")    
      }
      preload()
    }
    
    
  return (
<div className='card'>
    <div class="card-body">

    <div className='container'>
    <div className='row'>
      <div className="col-md-2 col-sm-2">
      <div className='row'>
      <h6 className="card-title">{artistName}</h6> 
      </div>
      <div className='row'>
      <Rating userRating={artistRating}
      isDisable={true}
      />
      </div>

      
      </div>

      <div className="col-md-3 col-sm-3 ">
      <div className='row'>
      <h6 className="card-title">Bio</h6> 
      </div>
      <div className='row'>
      {dob}
      </div>
      <div className='row'>
      {artistBio}
      </div>
      </div>

      <div className="col-md-5 col-sm-5">
      <div className='row'>
      <h6 className=' text-left'>Songs</h6>
      </div>
      <div className='row'>
      <p>{artistSongs.length==0? "No Songs" : artistSongs.join(' , ')}</p>
      </div>
      </div>
      
      <div className="col-md-2 col-sm-2">
      <button onClick = {rateArtistMessage} type="button" class="btn rate" data-bs-toggle="modal" data-bs-target={"#artistModal"+artistId}>
      Rate Artist
      </button>
      {isAuthenticated() && 
      <div class="modal fade" id={"artistModal"+artistId}  tabindex="-1" data-bs-backdrop="static" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog" >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title text-black"  id="staticBackdropLabel">Rate {artistName}  </h5>
            <button type="button" onClick = {()=>setReload(true)} class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body" >
        <Rating
        
        userRating={rating}
        isArtist={true}
        artistId={artistId} 

        />
      </div>
      <div class="modal-footer">
        <button type="button" onClick = {()=>setReload(true)} class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
      </div>}
      </div>
    </div>
    </div>
    </div>
   
</div>
  )
}

export default ArtistCell
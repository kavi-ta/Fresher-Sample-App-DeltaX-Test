import React,{useState,useEffect} from 'react'
import { isAuthenticated } from '../auth/helper/authapicalls'
import { getArtistsBySongId } from '../song/helper/songapicalls'
import { getSongRating } from '../user/helper/userapicalls'
import Rating from './Rating'


const SongCell=({
    song,
    setReload = f=>f,
    reload = undefined
})=> {
    const songId = song.SongId
    const songName = song.Name
    const coverImage = song.CoverImage
    const releaseDate = song.ReleaseDate.slice(0,10)
    const path = song.Path
    const songRating = song.Rating
    let months = ["-","Jan","Feb","Mar","Apr","May","Jun","July","Aug","Sept","Oct","Nov","Dec"]
    
    const date= releaseDate.slice(8,10)+" "+ months[parseInt(releaseDate.slice(5,7))]+", "+releaseDate.slice(0,4)

    // static url for coverImage
    const url =  "https://drive.google.com/file/d/1JhI1lZNaydTCk9dQn61zukuApEweOZlB/view?usp=sharing"
    // const urlNew = url.slice(0,25)+"thumbnail?id="+url.slice(32,url.indexOf("view")-1)
    

    const [rating, setRating] = useState(0)
    const [isRated,setIsRated] = useState(false)
    const [error, setError] = useState(false)
    const [artists,setArtists] = useState([])
    const [songArtists,setSongArtists] = useState([])
    const {user,token} = isAuthenticated()
    const preload = ()=>{
      
        getSongRating(user.Id,token,songId)
        .then(
            data=>{
                if(data.error){
                    setError(true)
                }
                else{
                    
                    if(data.rating){
                        
                        setIsRated(true)
                        setRating(data.rating)
                    }
                    else{
                        
                        setIsRated(false)
                        setRating(0)
                    }
                    
                }
            }
        )

      
          // get the artists for the song
          getArtistsBySongId(song.SongId).then(
            data=>{
              if(data.error){
                setError(data.error)
              }
              else{
                
                let a = []
                for(let i=0;i<data.length;i++){
                  a.push(data[i].Name)
                }
                setSongArtists(a)
              }
            }
          )
          setReload(false)
    }


    useEffect(() => {
      preload()
    }, [reload])
    
  return (
  <div className='card'>
  <div className="card-body">
    <div className='container'>
    <div className='row'>
      <div className="col-md-2 col-sm-2">
      <img className="card-img-left" height={60} width={60} src={coverImage} />
      </div>
      <div className="col-md-3 col-sm-3">
      <div className='row'>
      <h6 className="card-title">{songName}</h6> 
      </div>
      <div className='row'>
      <Rating userRating={songRating}
      isDisable={true}
      />
      </div>

      <div className='row'>
      <h7 className="card-text ">{date}</h7>
      </div>
      
      </div>
      <div className="col-md-5 col-sm-5">
      <div className='row'>
      <h6 className='text-left'>Artists</h6>
      </div>
      <div className='row'>
      <p> {songArtists.length==0? "No Artists" :songArtists.join(' , ')}</p>
      </div>
      </div>
      
      <div className="col-md-2 col-sm-2">
      <button  type="button" class="btn rate" data-bs-toggle="modal" data-bs-target={"#songModal" + songId}>
      Rate Song
      </button>
      <div class="modal fade" id={"songModal" + songId} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title text-black"  id="exampleModalLabel">Rate {songName}  </h5>
              <button type="button" onClick = {()=>setReload(true)} class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" >
              <Rating
              
              userRating={rating}
              isSong={true}
              songId={songId}  
              />
            </div>
            <div class="modal-footer">
              <button type="button" onClick = {()=>setReload(true)} class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
      </div>
      </div>
      </div>

    </div>
    </div>
    
        
      </div>
    
  </div>
  )
}

export default SongCell
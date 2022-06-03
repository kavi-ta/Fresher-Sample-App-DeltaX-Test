import React, {useState,useEffect} from 'react'
import {FaStar} from 'react-icons/fa'
import { isAuthenticated } from '../auth/helper/authapicalls'
import { songRating, artistRating } from '../user/helper/userapicalls'
const Rating=({
    userRating,
    isDisable =false,
    isArtist=false,
    isSong=false,
    artistId=null,
    songId = null
})=> {
  
  const {user,token} = isAuthenticated()
  const [rating,setRating] = useState(userRating)
  const [error,setError] = useState("")
  
  
  const onRating = (event)=>{
    
    
    var newRating = event.target.value
    
  
    if(isArtist){
      
      artistRating(user.Id,token,artistId,{rating:newRating})
        .then(data=>{
            if(data.error){
                setError(data.error)
            }
            else{
               setRating(newRating)
            }
        })
    }
    else if(isSong){
      songRating(user.Id,token,songId,{rating:newRating})
      .then(data=>{
          if(data.error){
              setError(data.error)
          }
          else{
              setRating(newRating)
          }
      })
    }
  }
  
  return (
    <div className='text-black'>

  
    {[...Array(5)].map((star,i)=>{
        const ratingValue = i+1
        
        return (<label>
        <input type='radio'  
        name="rating" value={ratingValue}
        onClick ={onRating}
        disabled={isDisable}
        />
        <FaStar className='star' 
        color={ratingValue<= rating ? "#ffc107" : "e4e5e9"}
        />
        </label>
  )})}
    </div>
  )
}


export default Rating

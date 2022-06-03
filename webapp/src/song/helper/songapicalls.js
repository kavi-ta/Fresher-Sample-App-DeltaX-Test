import { API } from "../../backend";

export const getSongs = (sortBy,limit)=>{
    if(limit){
        return fetch(`${API}/songs?sortBy=${sortBy}&limit=${limit}`,{
            METHOD:"GET"
        })
        .then(response=>{
            return response.json()
        })
        .catch(err=>console.log(err))
    }
    else{
        return fetch(`${API}/artists?sortBy=${sortBy}`,{
            METHOD:"GET"
        })
        .then(response=>{
            return response.json()
        })
        .catch(err=>console.log(err))
    }
    
}

export const addSong = (userId,token,song)=>{
    
    return fetch(`${API}/song/create/${userId}`,
    {
        method:"POST",
        headers:{
            Accept:'application/json',
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}` 
        },
        body:JSON.stringify(song)
    })
    .then(response=>{
        
        return response.json()
        
    })
    .catch(err=>console.log(err))
    
}


export const addArtistToSong = (userId, token, songId, artistIds)=>{
   console.log("JSON", JSON.stringify(artistIds))
    return fetch(`${API}/addartisttosong/${userId}/${songId}`,{
        method:"POST",
        
        headers:{
          Accept:"application/json",
          "Content-Type":"application/json",
           Authorization: `Bearer ${token}` 
        },
        body:JSON.stringify(artistIds)
    })
    .then(response=>{
        
        return response.json()
        
    })
    .catch(err=>console.log(err))
        
        
            
    }


export const getArtistsBySongId = (songId)=>{
        return fetch(`${API}/getartistsbysong/${songId}`,{
            method:"GET"
        })
        .then(response=>{
        
            return response.json()
            
        })
        .catch(err=>console.log(err))
    }

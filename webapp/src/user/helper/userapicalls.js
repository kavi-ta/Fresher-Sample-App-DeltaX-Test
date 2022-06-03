import { API } from "../../backend";

export const songRating = (userId,token,songId,rating)=>{
    
        return fetch(`${API}/songrating/${userId}/${songId}`,{
            method:"POST",
            headers:{
                Accept:"application/json",
                "Content-Type": "application/json",
                Authorization:`Bearer ${token}`
            },
            body:JSON.stringify(rating)  
        })
        .then(response=>{
            return response.json() 
        })
        .catch(error=> console.log(error))
    
    
}

export const getSongRating = (userId, token, songId)=>{
    return fetch(`${API}/getsongrating/${userId}/${songId}`,{
        method:"GET",
        headers:{
            Authorization:`Bearer ${token}`
        }
    }).then(
        response=>{return response.json() }
        
    )
    .catch(error=> console.log(error))
}

export const getArtistRating = (userId, token, artistId)=>{
    return fetch(`${API}/getartistrating/${userId}/${artistId}`,{
        method:"GET",
        headers:{
            Authorization:`Bearer ${token}`
        }
    }).then(
        response=>{return response.json() }
        
    )
    .catch(error=> console.log(error))
}



export const artistRating = (userId,token,artistId,rating)=>{
        
        return fetch(`${API}/artistrating/${userId}/${artistId}`,{
            method:"POST",
            headers:{
                Accept:"application/json",
                "Content-Type": "application/json",
                Authorization:`Bearer ${token}`
                
            },
            body:JSON.stringify(rating)  
        })
        .then(response=>{
            return response.json() 
        })
        .catch(error=> console.log(error))
    
    
}

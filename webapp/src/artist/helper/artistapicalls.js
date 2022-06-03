import { API } from "../../backend"

export const getArtists = (sortBy,limit)=>{
    sortBy = sortBy? sortBy : ""
    if(limit){
        return fetch(`${API}/artists?sortBy=${sortBy}&limit=${limit}`,{
            method:"GET"
        })
        .then(response=>{
            return response.json() 
        })
        .catch(error=> console.log(error))
    }
    else{
        return fetch(`${API}/artists?sortBy=${sortBy}`,{
            method:"GET"
        })
        .then(response=>{
            return response.json() 
        })
        .catch(error=> console.log(error))
    }
    
}


export const addArtist = (userId,token,artist)=>{
   
    return fetch(`${API}/artist/create/${userId}`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type": "application/json",
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify(artist)    
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=> console.log(err))
}

export const getSongsByArtistId = (artistId)=>{
    return fetch(`${API}/getsongsbyartist/${artistId}`,{
        method:"GET"
    })
    .then(response=>{
    
        return response.json()
        
    })
    .catch(err=>console.log(err))
}
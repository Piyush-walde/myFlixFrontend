import './Homepage.css';
import './Player.css'
import Header from '../Components/Header';
import { useRef,useEffect, useState } from 'react';
import {useParams} from 'react-router-dom'; // this hook is use for extracting  id from url parameter 


function Player()
{
  
  let params=useParams();

  let [movie,setMovie]=useState({});
  let [userMovie,setUserMovie]=useState({});
  let videoPlayer=useRef();

  let [playerVisible,setPlayerVisible]=useState(false);

  useEffect(()=>{
  

    let myflix_user=JSON.parse(localStorage.getItem("myflix_user")); 

    fetch("https://myflix-apibypiyush.herokuapp.com/movies/"+params.id,{
   
      headers:{
        "Authorization":`Bearer ${myflix_user.token}`
      }

    })
    .then((response)=>response.json())
    .then((data)=>{
      setMovie(data);
    })
    .catch((err)=>{
      console.log(err);
    })

    

  },[params.id]);

  // useEffect(()=>{
  //     if(playerVisible===true){
  //       videoPlayer.current.currentTime=userMovie.watchtime;
  //     }
  // },[playerVisible]);

  function play(){
 
    let myflix_user=JSON.parse(localStorage.getItem("myflix_user"));
    let user_id=myflix_user.user_id;
    let movie_id=params.id;

    fetch("https://myflix-apibypiyush.herokuapp.com/users/play",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "Authorization":`Bearer ${myflix_user.token}`
      },
      body:JSON.stringify({movie:movie_id,user:user_id})
    })
    .then((response)=>{response.json()})
    .then((data)=>{
    
        setPlayerVisible(true);
           setUserMovie(data.user_movie);
          //  videoPlayer.current.currentTime=

    })
    .catch((err)=>{
      console.log(err);
    })


  }



  function closePlayer(){

    let myflix_user=JSON.parse(localStorage.getItem("myflix_user"));
     console.log(userMovie._id);
    fetch("https://myflix-apibypiyush.herokuapp.com/users/closeplayer/"+userMovie._id,{
      method:"PUT",
      headers:{
        "Content-Type":"application/json",
        "Authorization":`Bearer ${myflix_user.token}`
      },
      body:JSON.stringify({watchtime:videoPlayer.current.currentTime})
    })
    .then((response)=>{response.json()})
    .then((data)=>{
      console.log(data)
      // if(data.success===true){
        
      // }
      setPlayerVisible(false);
    })
    .catch((err)=>{
      console.log(err);
    })

 
  }


return (
    
    <>

      <Header/>

       {/* banner section start */}

       <section className='banner'>

                {
                  playerVisible===false?(

                    <div className='top'>

                          <img src={movie.posterURL} alt='top-banner'/>

                          <div className='top-overlay'>
                                  <div className='top-details'>
                                          <h1>{movie.name}</h1>

                                          <p>
                                          {movie.description?.substring(0,100)+"..."}
                                          </p>

                                          <button onClick={play}>Play Now</button>   

                                  </div>
                          </div>
                    </div>


                  ):
                  (

                      <div className='vid-player'>

                          <div className='close-player'>
                              <h1>{movie.name}</h1>
                              <i className="fa-solid fa-square-xmark cross"
                              onClick={(()=>{
                                closePlayer();
                              })}></i>
                          </div>

                          <video ref={videoPlayer} controls className='movie-player' autoPlay>
                            
                            <source src={`http://localhost:8000/movies/stream/${movie._id}`}/>

                          </video>

                      </div>

                  )
                }

        </section>


        <div className='details'>

          <div className='detail'>
            <h2>Description</h2>
            <p>{movie.description}</p>

          </div>

          <div className='detail'>
            <h2>Rating</h2>
            <p>{movie.imdbRating}</p>

          </div>
         
          <div className='detail'>
            <h2>Genre</h2>
            <p>{movie.genre}</p>

          </div>

          
          <div className='detail'>
            <h2>Release ON</h2>
            <p>{movie.releaseDate}</p>

          </div>

          
          {/* <div className='detail'>
            <h2>Runtime</h2>
            <p>{movie.runtime} MINUTE</p>

          </div> */}

          <div className='detail'>
            <h2>Runtime</h2>
            <p>{movie.runtime} MINUTES</p>

          </div>


        </div>
    

      

    
    </>
   

)

}
export default Player;
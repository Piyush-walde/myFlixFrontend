import { useEffect, useRef, useState } from "react";
import {useNavigate,Link} from 'react-router-dom'


function Header(){

    let [movies,setMovies]=useState([]);
    let [filteredMovies,setFilteredMovies]=useState([]);
    let [searchVisible,setSearchVisible]=useState(false);
    let [title,setTitle]=useState("please type a movie name to start to the search!!!");
    let navigate=useNavigate();
    let searchInput=useRef();
    let [userName,setUserName]=useState("");
    let [menuVisible,setMenuVisible]=useState(false);

    useEffect(()=>{
    
        let myflix_user=JSON.parse(localStorage.getItem("myflix_user")); 

        setUserName(myflix_user.username)

        fetch("http://localhost:8000/movies/",{
        headers:{
            "Authorization":`Bearer ${myflix_user.token}`
        }
        })
        .then((response)=>response.json())
        .then((data)=>{

         setMovies(data);

        })
        .catch((err)=>{
            console.log(err);
        })
        
  
    },[])

    function searchMovies(name){

         if(name!==""){
            let filtered=movies.filter((movie,index)=>{
                return movie.name.toUpperCase().indexOf(name.toUpperCase())===0;
            })
            
            setFilteredMovies(filtered);

            if(filtered.length!==0){
                setTitle("Search Results");

            }
            else{
                setTitle("Movie not found");
            }
            
         }
        
         else{
             setFilteredMovies([]);
             setTitle("please type a movie name to start to the search!!!");
         }
    }

    function goToPlayer(movie_id){
        searchInput.current.value="";
        navigate("/player/"+movie_id);
        setSearchVisible(false);

    }

    function logOut(){
        localStorage.removeItem("myflix_user");
        navigate("/login");
    }

    return (

     <>
     

       <header className='header'>
            <div className='logo'>
                <Link to="/homepage">
                   <h1>MY FLIX</h1>
                </Link>
                    
            </div>

            <div className='nav-two'>
                <div className='search'>
                    <input type="text" ref={searchInput} placeholder='Movie Name...'
                     onChange={((event)=>{

                            searchMovies(event.target.value);

                    })}
                    onFocus={()=>{
                        setSearchVisible(true)
                    }}

                    onBlur={()=>{

                        if(filteredMovies.length===0){
                            setSearchVisible(false);
                        }
                       
                    }}
                    
                    />
                    <p>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </p>
                </div>

                <div className="user-info" onClick={()=>{

                        if(menuVisible===true){
                            setMenuVisible(false);
                        }
                        else{
                            setMenuVisible(true)
                        }
                 
         
                }}>
                    <div className="name">{userName}</div>

                    <div className='profile'>
                        <i className="fa-solid fa-user"></i>
                    </div>

                </div>

              
                
            </div>

   </header>


   {
       menuVisible===true?(

        <div className="menu">
            <ul>
                <Link to="/homepage"><li>Homepage</li></Link>
             
                <li onClick={logOut}>Logout</li>
            </ul>

        </div>
           
       ): null
   }

  


    {
        
        searchVisible===true?(

            <div className="search-results">

                    <section className='category' key={2}>

                        <h1 className='category-title'>{title}</h1>

                        <div className='movie-list'>


                        {

                                filteredMovies.map((movie,index)=>{
                                
                                return (

                                <div key={index} className='movie'>
                                    <img src={movie.posterURL} alt='poster'/>

                                    <div className='movie-overlay'>
                                        <h2 className='movie-title'>{movie.name}</h2>

                                            <div className='utils'>

                                          
                                                <button onClick={()=>{
                                                    goToPlayer(movie._id);
                                                }}>Watch Now</button>
                              

                                            <div className='rating'>{movie.imdbRating}</div>
                                    </div>    
                                    </div>
                                </div> 

                                )
                            })

                        }

                        

                        </div>

                    </section>


           </div>

        ):null

    }

     

   </> 

    )
}


export default Header;
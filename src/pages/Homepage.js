import './Homepage.css';
import Header from '../Components/Header';
import Category from '../Components/Category';
import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';

function Homepage(){

  let [movies,setMovies]=useState([]);
  let [trending,setTrending]=useState([]);
  let [scifi,setScifi]=useState([]);
  let [superhero,setSuperhero]=useState([]);
  let [top,setTop]=useState({});

  useEffect(()=>{

    let myflix_user=JSON.parse(localStorage.getItem("myflix_user")); 

    fetch("https://myflix-apibypiyush.herokuapp.com/movies/",{
      headers:{
        "Authorization":`Bearer ${myflix_user.token}`
      }
    })
    .then((response)=>response.json())
    .then((data)=>{
      
      setMovies(data);
      console.log(data);
      
      let scifiMovies=data.filter((movie,index)=>{
        return movie.genre.includes("sci-fi");
      })

       setScifi(scifiMovies);

       let superheroMovies=data.filter((movie,index)=>{
        return movie.genre.includes("superhero")
      })
      
      setSuperhero(superheroMovies);


      let trendingMovies=data.sort((a,b)=>{ return b.watchers-a.watchers }).slice(0,5);
      setTrending(trendingMovies);
      
  
      let topMovie=data.find((movie,index)=>{
        return movie.top===true;
      })

      setTop(topMovie);
      
      
    })
    .catch((err)=>{
      console.log(err);
    })

  },[]);

return (
    
    <>

       <Header/>

       {/* banner section start */}

       <section className='banner'>
            <div className='top'>

                <img src={top.posterURL} alt='top-banner'/>
               {/* {console.log(posterURL)} */}

                <div className='top-overlay'>
                        <div className='top-details'>
                                <h1>{top.name}</h1>

                                <p>
                                 {top.description?.substring(0,75)+"..."}
                                </p>

                                <Link to={`/player/${top._id}`}>
                                   <button>Watch Now</button>
                                </Link>
                                   

                        </div>
                </div>
            </div>
       </section>
    

      {/* trending section  */}

      <Category movies={trending} title="Top 5 Movies"/>

        {/* sci-fi section  */}

      <Category movies={scifi} title="Sci-Fi movies"/>

       
       {/* superhero section  */}

       <Category movies={superhero} title="Superhero Movies"/>

    
    </>
   

)

}
export default Homepage;
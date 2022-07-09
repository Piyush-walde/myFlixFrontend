import {Link} from 'react-router-dom';

function Category(props){

    return (

        <section className='category' key={2}>

           <h1 className='category-title'>{props.title}</h1>

            <div className='movie-list'>


               {

                   props.movies.map((movie,ind)=>{
                       
                       return (

                        <div key={ind} className='movie'>
                             <img src={movie.posterURL} alt='poster'/>

                            <div className='movie-overlay'>
                                <h2 className='movie-title'>{movie.name}</h2>

                                    <div className='utils'>

                                    <Link to={`/player/${movie._id}`}>
                                       <button>Watch Now</button>
                                    </Link>   

                                    <div className='rating'>{movie.imdbRating}</div>
                             </div>    
                           </div>
                        </div> 

                       )
                   })

                }

               

                </div>

       </section>


    )
}

export default Category;
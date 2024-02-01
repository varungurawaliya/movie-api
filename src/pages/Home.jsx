import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';

function Home() {
    
  const [movieData, setMovieData] = useState([])

  useEffect(() => {

    fetch('https://api.tvmaze.com/search/shows?q=all')  //whole list is fetched
    .then(response => response.json())
    .then(response => JSON.parse(JSON.stringify(response)))
    .then(movieData => setMovieData(movieData))

  }, [])


  return (

    <div className='relative w-full flex flex-col items-center'>

      <div className='text-3xl font-bold mt-5'>Movies</div>
      
      <div className='w-full flex flex-wrap justify-center py-8'>

      {
        movieData.map(movie =>(

          <div key={movie?.show?.id} className='flex flex-col justify-between w-1/4 bg-[#283a74] rounded-3xl p-4 m-4 text-white max-md:w-1/3 max-sm:w-1/2'>

            <img 
              src={movie?.show?.image?.medium} 
              alt={movie?.show?.id}
              className='h-[58%] object-cover justify-center mb-4 rounded-xl'
            />

            <div className='font-semibold text-xl'>
              {movie?.show?.name}
            </div>

            <div>
              {movie?.show?.language}
            </div>

            <div className='font-semibold'>
              Rating : {movie?.show?.rating?.average}
            </div>

            <div>
              Time : {movie?.show?.schedule?.time}
            </div>

            <div>
              Days : {movie?.show?.schedule?.days.map(day => day)}
            </div>

            <Link className='bg-black text-center py-2 mt-2 rounded-full' 
              to={`/Summary/${movie?.show?.id}`}>
                Book
            </Link>

          </div>
      ))}
            
      </div>
    </div>
  )
}

export default Home
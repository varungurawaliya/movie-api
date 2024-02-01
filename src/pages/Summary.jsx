import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

function Summary() {

    const {id} = useParams()
    const [movie, setMovie] = useState({})

    useEffect(() => {

      fetch(`https://api.tvmaze.com/shows/${id}`)  //id is used to fetch
      .then(response => response.json())
      .then(response => JSON.parse(JSON.stringify(response)))
      .then(movie => setMovie(movie))  

    }, [])

  return (

    <div className='relative w-full flex flex-col items-center'>

      <div> 

        <div className='text-3xl text-center font-bold mt-5'>Movie Detail</div>                

          <div className='flex flex-col bg-[#283a74] w-[40vw]  rounded-3xl p-4 m-4 text-white max-md:w-[60vw] max-sm:w-[80vw]'>
            
          <div className=' self-center'>
            <img 
              src={movie?.image?.medium} alt={movie?.id}
              className='object-cover justify-center mb-4 rounded-xl'
            />
          </div>

            <div className='font-semibold text-xl'>
              {movie?.name}
            </div>

            <div>
              {movie?.language}
            </div>

            <div className='font-semibold mb-3'>
              Rating : {movie?.rating?.average}
            </div>

            <div dangerouslySetInnerHTML={{__html: movie?.summary}}></div>

            <Link className='bg-black text-center py-2 mt-2 rounded-full' 
              to={`/Form/${id}`}>
                Book
            </Link>
            
          </div>
              
      </div>
    </div>   

  )
}

export default Summary
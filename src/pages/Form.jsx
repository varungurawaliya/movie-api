import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function Form() {

    const {id} = useParams()
    const navigate = useNavigate()
    const [movie, setMovie] = useState({})

    useEffect(() => {

      fetch(`https://api.tvmaze.com/shows/${id}`)  //id is used to fetch
      .then(response => response.json())
      .then(response => JSON.parse(JSON.stringify(response)))
      .then(movie => setMovie(movie))  

    }, [])


    const submitHandler = async (event) => {
       
        event.preventDefault()
  
        const data ={
  
          title : movie?.name,
          language : movie?.language,
          time : movie?.schedule?.time,
          name : event.target.title.value,
          mobile : event.target.mobile.value,
          day : event.target.day.value,
          number : event.target.number.value,
          
        }
  
        const prevBooking = JSON.parse(localStorage.getItem("booking"))
  
        var booking = []
  
        if(prevBooking && prevBooking.length > 0)
          booking = [...prevBooking, data]
  
        else booking = [data]
  
        localStorage.setItem("booking", JSON.stringify(booking))
    
        navigate(`/Summary/${id}`)
    }
  

  return (
    <div>
        <div className=' w-full h-full p-10 flex flex-col items-end self-center backdrop-blur-xl'>
          
          <div key={Math.random()} className='flex flex-col  self-center h-[80vh] bg-white rounded-3xl p-4 max-sm:w-full' >

            <button onClick={() => navigate(`/Summary/${id}`)}
              className='font-semibold mb-4 text-xl'>CLOSE</button>

            <form onSubmit={submitHandler} className='flex flex-col bg-[#11182e] gap-6 p-10 text-white rounded-3xl'>

              <div className=" font-bold text-2xl flex justify-center">
                Book Ticket
              </div>

              <div>
                <div className='font-semibold text-xl'>
                    {movie?.name}
                </div>
                <div>
                    ({movie?.language}) ({movie?.schedule?.time})
                </div>
              </div>

              <div className='flex gap-5 max-sm:flex-col '>
                <label htmlFor="name" className='text-nowrap'>Name :</label>
                <input type="text" id='name' className='text-black rounded-md'/>
              </div>

              <div className='flex gap-5 max-sm:flex-col'>
                <label htmlFor="mobile" className='text-nowrap'>Mobile :</label>
                <input type="tel" id='mobile' maxLength="14" className='text-black rounded-md'/>
              </div>

              <div className='flex gap-5 max-sm:flex-col'> 

                <label htmlFor="day" className='text-nowrap'>Day :</label>
                <select name="day" id="day" className='text-black rounded-md'>
                  {
                    movie?.schedule?.days.map(day => (
                      <option value={day}>{day}</option>
                    ))
                  }
                </select>            
              </div>

              <div className='flex gap-5 max-sm:flex-col'>
                <label htmlFor="number" className='text-nowrap'>number of tickets :</label>
                <input type="number" id='number' maxLength="14" className='text-black rounded-md'/>
              </div>

              <button type="submit" className="w-full h-12 mt-3 rounded-lg bg-[#ffa400] hover:bg-[#ffa400]/[0.6]">Submit</button>

            </form>
          </div>  
        </div> 
    </div>
  )
}

export default Form
import React, { useEffect } from "react";
import { useState } from "react";
import requests from "../Requests.js";
import axios from "axios";

const Main = () => {
  const [movies, setMovies] = useState([]);
  const movie = movies[Math.floor(Math.random() * movies.length)];

  useEffect(() => {
    axios.get(requests.requestPopular).then((response) => {
      setMovies(response.data.results);
    });
  }, []);
	
  // console.log(movie);
  return (
    !movie ? <div /> :
    <div className="w-full h-[550px] text-white">
      <div className="w-full h-full">
        <div className=" absolute w-full h-[550px] bg-gradient-to-r from-black" />
        <img className="w-full h-full object-cover" src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`} alt={movie?.original_title}/>
        <div className='absolute top-[20%] p-4 md:p-8'>
					<h1 className='text-3xl md:text-5xl font-bold'>{movie?.title}</h1>
          <div className="my-4">
            <button className="border bg-gray-300 text-black py-2 px-5">Play</button>
            <button className="border text-white py-2 px-5 ml-2">Watch later</button>
          </div>
					<p className="text-gray-400 font-bold text-sm">{`Released: ${movie?.release_date}`}</p>
					<p className="w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[30%] text-grey-200">{movie?.overview}</p>
        </div>
      </div>
    </div>
  );
};

export default Main;

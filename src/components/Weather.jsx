import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import humidity_icon from '../assets/humidity.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'
import { motion } from "motion/react"


const Weather = () => {

  const inputRef = useRef()

  const [weatherData, setWeatherData] = useState(false);


  const allIcons = {
    "01d" : clear_icon,
    "01n" : clear_icon,
    "02d" : cloud_icon,
    "02n" : cloud_icon,
    "03d" : cloud_icon,
    "03n" : cloud_icon,
    "04d" : drizzle_icon,
    "04n" : drizzle_icon,
    "09d" : rain_icon,
    "09n" : rain_icon,
    "10d" : rain_icon,
    "10n" : rain_icon,
    "13d" : snow_icon,
    "13n" : snow_icon,
  }


  const search = async (city)=>{
    if(city === ""){
      alert("Enter City Name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      console.log(data);
      const icon = allIcons[data.weather[0].icon] || clear_icon; 
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon
      })

    } catch (error) {
      setWeatherData(false);
      console.error("Error in fetching weather data");
    }
  }

  useEffect(()=>{
    search("new york");
},[])
 

  return (
    <motion.div 
    initial={{ rotateY: -90, opacity: 0 }}
      animate={{ rotateY: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    className='weather'>

    <motion.div
      initial= {{y: -30, opacity: 0}}
      whileInView={{y: 0, opacity: 1}}
      transition={{duration: 0.6, delay:0.5}}
    className="search-bar">
      <input ref={inputRef} type="text" placeholder='Search' />
      <motion.img
      whileHover={{scale : 1.30}}
       onClick={()=>search(inputRef.current.value)} src={search_icon} alt=""  />
    </motion.div>

    {weatherData ? <>
      
       <motion.img 
          initial= {{ opacity:0}}
          whileInView={{ opacity:1}}
          transition={{duration: 1.3}}
          animate={{ scale: [1, 1.2, 1] }} // scale up and down
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut"
          }} 
        src={weatherData.icon} alt="" className='weather-icon' />

    <motion.p
      initial= {{y: -20, opacity:0}}
      whileInView={{y: 0, opacity:1}}
      transition={{duration: 1.3}} 
    className='temp'>{weatherData.temperature}°c</motion.p>

    <motion.p
       initial= {{y: -20, opacity:0}}
       whileInView={{y: 0, opacity:1}}
       transition={{duration: 1.3}} 
    className='location-city'>{weatherData.location}</motion.p>

    <div className="data">
     <motion.div
        initial= {{x: -20, opacity:0}}
        whileInView={{x: 0, opacity:1}}
        transition={{duration: 1.3}}
        className="col"> 
      
        <img src={humidity_icon} alt="" />
        <div>
          <p>{weatherData.humidity} %</p>
          <span>Humidity</span>
        </div>
      </motion.div>


      <motion.div
          initial= {{x: 20, opacity:0}}
          whileInView={{x: 0, opacity:1}}
          transition={{duration: 1.3}}
       className="col">
        <img src={wind_icon} alt="" />
        <div>
          <p>{weatherData.windSpeed} Km/h</p>
          <span>Wind Speed</span>
        </div>
      </motion.div>

    </div>

    </>:<></>}

   
    </motion.div>
  )
}

export default Weather

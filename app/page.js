'use client';
import { useState, useEffect } from 'react';

export default function Weather() {
  const [isCelsius, setIsCelsius] = useState(true); // track whether temperature is shown in C (true) or F (false)
  const [weatherData, setWeatherData] = useState(null); // store weather data

  useEffect(()=>{
     fetchData(); 
  },[])
  const fetchData = async() =>{
    try{
        const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=accra&appid=8d65b434e0cdc0da95db65116d086dc0&units=metric')
        const data = await response.json();
        setWeatherData(data);
        console.log("Weather data", data)

    }catch(error){
      console.log("Error fetching data", error)
    }
  }
  //function to convert temperature from Celsius to Fahrenheit
  const convertTemp = (tempC) => { //
    return isCelsius ? Math.round(tempC) : Math.round((tempC * 9) / 5 + 32); // If isCelsius is true return temperature in Celsius
  };

  // array to store forecast data 
  const forecastData = [
    { day: "Mon", date: "9/7", icon: "/rain.png", tempC: 22 },
    { day: "Tue", date: "9/8", icon: "/sun.png", tempC: 25, active: true }, //Mark as highlighted forecast
    { day: "Wed", date: "9/9", icon: "/cloud.png", tempC: 20 },
  ];

  if(!weatherData){
    return <p>LOADING...</p>
  }

  return (
    <main className="min-h-screen bg-white p-6 space-y-6">
      {/* Weather Header Section */}
      <section className="bg-purple-100 rounded-2xl p-4 shadow-md flex items-center justify-between">
        <img src="/cloud-sun.png" alt="Weather Icon" className="w-16 h-16" />
        <div className="text-right">
          <h1 className="text-4xl font-bold text-black">{convertTemp(weatherData.main.temp_max)}°{isCelsius ? 'C' : 'F'}</h1>
          <p className="text-sm text-black">
            {weatherData.weather[0].description}
          </p>
          <p className="text-sm text-black">{weatherData.name}</p>
        </div>
      </section>

      {/* Air Quality Section */}
      <section className="bg-white rounded-2xl p-4 shadow-md">
      <div className="text-lg text-black"></div>

        <h2 className="text-sm font-semibold mb-2 text-black">AIR QUALITY</h2>
        <div className="grid grid-cols-3 gap-4 text-center font-medium text-purple-700">
          <div>
            <img src="/temp.png" className="mx-auto h-6 mb-1" alt="Temp" />
            <div className="text-black">temp</div>
            <div className="text-lg text-black">{convertTemp(weatherData.main.feels_like)}°{isCelsius ? 'C' : 'F'}</div> 
          </div>
          <div>
            <img src="/pressure.png" className="mx-auto h-7 mb-1" alt="Pressure" />
            <div className="text-black">pressure</div>
            <div className="text-lg text-black ">{weatherData.main.pressure}</div>
          </div>
          <div>
            <img src="/wind.png" className="mx-auto h-7 mb-1" alt="Wind" />
            <div className="text-black">windspeed</div>
            <div className="text-lg text-black">{weatherData.wind.speed}km/h</div>
          </div>
        </div>
        <img src="/sulfur-dioxide.png" className="mx-auto h-7 mb-1" alt="sulfur" />
        <div className="text-center mt-4">
          <p className="text-black">Humidity</p>
          <p className="text-lg text-black">{weatherData.main.humidity}%</p>
        </div>
      </section>

      {/* Forecast Section */}
      <section className="flex justify-around">
        {forecastData.map(({ day, date, icon, tempC, active }, index) => ( //loop through array and get properties for each day accordingly use index as key

          <div

            key={index} // assign a key to each element using its index
            className={`flex flex-col items-center rounded-2xl px-4 py-3 ${
              active ? "bg-purple-100" : "bg-gray-100"
            }`}
          >
            <div className="text-sm font-semibold text-black">{day}</div>
            <div className="text-xs text-black">{date}</div>
            <img src={icon} className="h-6 my-2" alt={`${day} forecast icon`}/>
            <div className="text-lg font-medium text-black">{convertTemp(tempC)}°{isCelsius ? 'C' : 'F'}</div>
          </div>
        ))}
      </section>
      {/* Unit Conversion */}
      <div className="text-center">
        <div className="inline-flex items-center bg-purple-200 rounded-full p-1">
          <button
            className={`px-4 py-1 rounded-full transition ${
              isCelsius ? 'bg-purple-500 text-white' : 'text-purple-700'
            }`}
            onClick={() => setIsCelsius(true)}  //set to Celsius
          >
            °C
          </button>
          <button
            className={`px-4 py-1 rounded-full transition ${
              !isCelsius ? 'bg-purple-700 text-white' : 'text-purple-700'
            }`}
            onClick={() => setIsCelsius(false)}  
          >
            °F
          </button>
        </div>
        <p className="mt-2 text-black">Unit Conversion</p>
      </div>
    </main>
  );
}

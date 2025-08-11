'use client';
import { useState, useEffect } from 'react';

export default function Weather() {
  const [isCelsius, setIsCelsius] = useState(true); // track whether temperature is shown in C (true) or F (false)
  const [weatherData, setWeatherData] = useState(null); // store weather data

  useEffect(() => {
    fetchData();
  }, []);
  // Asynchronous function to fetch weather data from API
  const fetchData = async () => {
    try {
      const response = await fetch(
        'https://api.openweathermap.org/data/2.5/weather?q=accra&appid=8d65b434e0cdc0da95db65116d086dc0&units=metric'
      );
      const data = await response.json();
      setWeatherData(data);
      //console.log('Weather data', data);
    } catch (error) {
      console.log('Error fetching data', error);
    }
  };

  //function to convert temperature from Celsius to Fahrenheit
  const convertTemp = (tempC) => {
    return isCelsius ? Math.round(tempC) : Math.round((tempC * 9) / 5 + 32); // If isCelsius is true return temperature in Celsius
  };

  if (!weatherData) {
    return <p>LOADING...</p>;
  }

  return (
    <main className="min-h-screen bg-white p-4 flex flex-col gap-6 md:gap-10">
      {/* Weather Header Section */}
      <section className="bg-purple-100 rounded-2xl p-6 shadow-md flex items-center justify-between min-h-[25vh] md:min-h-[20vh]">
        <img src="/cloud-sun.png" alt="Weather Icon" className="w-20 h-20 md:w-24 md:h-24" />
        <div className="text-right text-black">
          <h1 className="text-5xl font-bold md:text-6xl">
            {convertTemp(weatherData.main.temp_max)}°{isCelsius ? 'C' : 'F'}
          </h1>
          <p className="text-base md:text-lg capitalize">{weatherData.weather[0].description}</p>
          <p className="text-base md:text-lg">{weatherData.name}</p> {/*text size to large on medium to large screens*/}
        </div>
      </section>

      {/* Air Quality Section */}
      <section className="bg-white rounded-2xl p-6 shadow-md min-h-[30vh] md:min-h-[25vh]">
        <h2 className="text-sm font-semibold mb-4 text-black">AIR QUALITY</h2>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 md:gap-0">
          <div className="flex items-center space-x-3 md:flex-1 justify-center md:justify-start">
            <img src="/temp.png" alt="Temp" className="h-7" />
            <div>
              <div className="text-black font-medium">Temp</div>
              <div className="text-lg text-black">
                {convertTemp(weatherData.main.feels_like)}°{isCelsius ? 'C' : 'F'}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3 md:flex-1 justify-center md:justify-start">
            <img src="/pressure.png" alt="Pressure" className="h-7" />
            <div>
              <div className="text-black font-medium">Pressure</div>
              <div className="text-lg text-black">{weatherData.main.pressure}</div>
            </div>
          </div>

          <div className="flex items-center space-x-3 md:flex-1 justify-center md:justify-start">
            <img src="/wind.png" alt="Wind" className="h-7" />
            <div>
              <div className="text-black font-medium">Windspeed</div>
              <div className="text-lg text-black">{weatherData.wind.speed} km/h</div>
            </div>
          </div>

          <div className="flex items-center space-x-3 md:flex-1 justify-center md:justify-start">
            <img src="/sulfur-dioxide.png" alt="Humidity" className="h-7" />
            <div>
              <div className="text-black font-medium">Humidity</div>
              <div className="text-lg text-black">{weatherData.main.humidity}%</div>
            </div>
          </div>
        </div>
      </section>

      {/* Forecast Section */}
      <section className="bg-purple-100 rounded-2xl p-6 shadow-md min-h-[35vh] md:min-h-[30vh] flex flex-col gap-6 md:gap-8">
        <h2 className="text-medium font-semibold text-black">GH</h2>
        <div className="flex flex-col md:flex-row justify-between items-center text-black text-medium w-full gap-2">
          <div className="flex items-center space-x-2 w-full md:w-auto justify-between">
            <img src="/sunrise.png" alt="Sunrise" className="h-5" />
            <span>
              Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center space-x-2 w-full md:w-auto justify-between">
            <img src="/sunset.png" alt="Sunset" className="h-5" />
            <span>
              Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Temperature Bar section */}
        <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500"></div>
        </div>

        <div className="flex flex-row justify-between items-center text-black text-sm w-full gap-2">
          <span className="whitespace-nowrap">
            <span className="font-sm"></span>Temp(min): {convertTemp(weatherData.main.temp_min)}°{isCelsius ? 'C' : 'F'}
          </span>
          <span className="w-full md:w-auto text-right">
            Temp(max): {convertTemp(weatherData.main.temp_max)}°{isCelsius ? 'C' : 'F'}
          </span>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-black text-sm w-full gap-2"> {/* flex-col-Stacks child elements vertically on small screen*/ }
          <div className="flex items-center space-x-1 w-full md:w-auto justify-between ">
            <h2 className="text-sm font-medium">Deg:</h2>
            <span>{weatherData.wind.deg}°</span>
          </div>
          <div className="flex items-center space-x-1 w-full md:w-auto justify-between ">
            <h2 className="text-sm font-medium">Speed:</h2>
            <span>{weatherData.wind.speed} km/h</span>
          </div>
        </div>
      </section>

      {/* Unit Conversion */}
      <div className="text-center">
        <div className="inline-flex items-center bg-purple-200 rounded-full p-1">
          <button
            className={`px-5 py-2 rounded-full transition text-lg ${
              isCelsius ? 'bg-purple-500 text-white' : 'text-purple-700'
            }`}
            onClick={() => setIsCelsius(true)}  //set to celsius
          >
            °C
          </button>
          <button
            className={`px-5 py-2 rounded-full transition text-lg ${
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



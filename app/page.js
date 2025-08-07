'use client';
import { useState, useEffect } from 'react';

export default function Weather() {
  const [isCelsius, setIsCelsius] = useState(true); // track whether temperature is shown in C (true) or F (false)
  const [weatherData, setWeatherData] = useState(null); // store weather data

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        'https://api.openweathermap.org/data/2.5/weather?q=accra&appid=8d65b434e0cdc0da95db65116d086dc0&units=metric'
      );
      const data = await response.json();
      setWeatherData(data);
      console.log('Weather data', data);
    } catch (error) {
      console.log('Error fetching data', error);
    }
  };
//function to convert temperature from Celsius to Fahrenheit
  const convertTemp = (tempC) => {
    return isCelsius ? Math.round(tempC) : Math.round((tempC * 9) / 5 + 32);// If isCelsius is true return temperature in Celsius
  };

  if (!weatherData) {
    return <p>LOADING...</p>;
  }

  return (
    <main className="min-h-screen bg-white p-6 space-y-6">
      {/* Weather Header Section */}
      <section className="bg-purple-100 rounded-2xl p-4 shadow-md flex items-center justify-between">
        <img src="/cloud-sun.png" alt="Weather Icon" className="w-16 h-16" />
        <div className="text-right">
          <h1 className="text-4xl font-bold text-black">
            {convertTemp(weatherData.main.temp_max)}°{isCelsius ? 'C' : 'F'}
          </h1>
          <p className="text-sm text-black">{weatherData.weather[0].description}</p>
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
            <div className="text-lg text-black">
              {convertTemp(weatherData.main.feels_like)}°{isCelsius ? 'C' : 'F'}
            </div>
          </div>
          <div>
            <img src="/pressure.png" className="mx-auto h-7 mb-1" alt="Pressure" />
            <div className="text-black">pressure</div>
            <div className="text-lg text-black">{weatherData.main.pressure}</div>
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
      <section className="bg-purple-100 rounded-2xl p-4 shadow-md space-y-3">
        <h2 className="text-sm font-semibold text-black">GH</h2>
        <div className="flex items-center justify-between text-black text-sm">
          <div className="flex items-center space-x-2">
            <img src="/sunrise.png" alt="Sunrise" className="h-5" />
            <span>
              Sunrise:{new Date(weatherData.sys.sunrise * 1000).toUTCString()}
              </span>
          </div>
          <div className="flex items-center space-x-2">
            <img src="/sunset.png" alt="Sunset" className="h-5" />
            <span>
              Sunset:{new Date(weatherData.sys.sunset * 1000).toUTCString() }
              </span>
          </div>
        </div>
        {/* Temperature Bar section */}
        <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500"></div>
        </div>
        <div className="flex items-center justify-between text-black text-sm">
          <span>
            temp_min:{convertTemp(weatherData.main.temp_min)}°{isCelsius ? 'C' : 'F'}
            </span>
          <span>
            temp_max: {convertTemp(weatherData.main.temp_max)}°{isCelsius ? 'C' : 'F'}
            </span>
        </div>
        <div className="flex items-center justify-between text-black text-sm space-x-7">
          <div className="flex items-center space-x-1">
            <h2 className="text-sm text-black">deg:</h2>
            <span>{weatherData.wind.deg}°</span>
          </div>

          <div className="flex items-center space-x-1">
            <h2 className="text-sm text-black">speed:</h2>
            <span>{weatherData.wind.speed} km/h</span>
          </div>
        </div>
      </section>

      {/* Unit Conversion */}
      <div className="text-center">
        <div className="inline-flex items-center bg-purple-200 rounded-full p-1">
          <button
            className={`px-4 py-1 rounded-full transition ${
              isCelsius ? 'bg-purple-500 text-white' : 'text-purple-700'
            }`}
           onClick={() => setIsCelsius(true)}  //set to celsius
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



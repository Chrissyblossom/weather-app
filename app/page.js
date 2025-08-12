'use client';
import { useState, useEffect } from 'react';

const API_URL = 'https://api.openweathermap.org/data/2.5/weather?q=accra&units=metric';

/**
 * Converts temperature from Celsius to Fahrenheit if needed.
 * @param {number} tempC - Temperature in Celsius.
 * @param {boolean} isCelsius - Flag to determine conversion.
 * @returns {number} - Converted temperature.
 */
function convertTemp  (tempC,isCelsius) {
    return isCelsius ? Math.round(tempC) : Math.round((tempC * 9) / 5 + 32); // If isCelsius is true return temperature in Celsius
  };

export default function Weather() {
  const [isCelsius, setIsCelsius] = useState(true); // track whether temperature is shown in C (true) or F (false)
  const [weatherData, setWeatherData] = useState(null); // store weather data

  useEffect(() => {
    (async () => {
      const data = await getWeatherData();
      if (data) setWeatherData(data);
    })();
  }, []);

/**
 * Fetches weather data from OpenWeatherMap API.
 * @returns {object|null} - Weather data or null on error.
 */

async function getWeatherData() {
  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_APP_ID;
  const url = `${API_URL}&appid=${apiKey}`;


    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.error('ERROR');
        return null;
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data', error);
      return null;
    }
  };

  if (!weatherData) {
    return <p>LOADING...</p>;
  }


  return (<main className="min-h-screen bg-white p-4 flex flex-col gap-6 md:gap-10">
      <WeatherHeader data={weatherData} isCelsius={isCelsius} />
      <AirQuality data={weatherData} isCelsius={isCelsius} />
      <Forecast data={weatherData} isCelsius={isCelsius} />
      <UnitConversion isCelsius={isCelsius} setIsCelsius={setIsCelsius} />
    </main>
  );
}

/**
 * Displays the weather header section.
 */
function WeatherHeader({ data, isCelsius }) {
  return (
      <section className="bg-purple-100 rounded-2xl p-6 shadow-md flex items-center justify-between min-h-[25vh] md:min-h-[20vh]">
        <img src="/cloud-sun.png" alt="Weather Icon" className="w-20 h-20 md:w-24 md:h-24" />
        <div className="text-right text-black">
          <h1 className="text-5xl font-bold md:text-6xl">
            {convertTemp(data.main.temp_max)}°{isCelsius ? 'C' : 'F'}
          </h1>
          <p className="text-base text-lg capitalizess">{data.weather[0].description}</p>
          <p className="text-base text-lg">{data.name}</p> {/*text size to large on medium to large screens*/}
        </div>
      </section>
      );
}
/**
 * Displays the air quality.
 */
function AirQuality({ data, isCelsius }) {    
  return (
      <section className="bg-white rounded-2xl p-6 shadow-md min-h-[30vh] md:min-h-[25vh]">
        <h2 className="text-sm font-semibold mb-4 text-black">AIR QUALITY</h2>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 md:gap-0">
          <div className="flex items-center space-x-3 md:flex-1 justify-center md:justify-start">
            <img src="/temp.png" alt="Temp" className="h-7" />
            <div>
              <div className="text-black font-medium">Temp</div>
              <div className="text-lg text-black">
                {convertTemp(data.main.feels_like)}°{isCelsius ? 'C' : 'F'}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3 md:flex-1 justify-center md:justify-start">
            <img src="/pressure.png" alt="Pressure" className="h-7" />
            <div>
              <div className="text-black font-medium">Pressure</div>
              <div className="text-lg text-black">{data.main.pressure}</div>
            </div>
          </div>

          <div className="flex items-center space-x-3 md:flex-1 justify-center md:justify-start">
            <img src="/wind.png" alt="Wind" className="h-7" />
            <div>
              <div className="text-black font-medium">Windspeed</div>
              <div className="text-lg text-black">{data.wind.speed} km/h</div>
            </div>
          </div>

          <div className="flex items-center space-x-3 md:flex-1 justify-center md:justify-start">
            <img src="/sulfur-dioxide.png" alt="Humidity" className="h-7" />
            <div>
              <div className="text-black font-medium">Humidity</div>
              <div className="text-lg text-black">{data.main.humidity}%</div>
            </div>
          </div>
        </div>
      </section>
  );
}

/**
 * Displays the forecast section.
 */
function Forecast({ data, isCelsius }) {
  return (

      <section className="bg-purple-100 rounded-2xl p-6 shadow-md min-h-[35vh] md:min-h-[30vh] flex flex-col gap-6 md:gap-8">
        <h2 className="text-medium font-semibold text-black">GH</h2>
        <div className="flex flex-col md:flex-row justify-between items-center text-black text-medium w-full gap-2">
          <div className="flex items-center space-x-2 w-full md:w-auto justify-between">
            <img src="/sunrise.png" alt="Sunrise" className="h-5" />
            <span>
              Sunrise: {new Date(data.sys.sunrise * 1000).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center space-x-2 w-full md:w-auto justify-between">
            <img src="/sunset.png" alt="Sunset" className="h-5" />
            <span>
              Sunset: {new Date(data.sys.sunset * 1000).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Temperature Bar section */}
        <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500"></div>
        </div>

        <div className="flex flex-row justify-between items-center text-black text-sm w-full gap-2">
          <span className="whitespace-nowrap">
            <span className="font-sm"></span>Temp(min): {convertTemp(data.main.temp_min)}°{isCelsius ? 'C' : 'F'}
          </span>
          <span className="w-full md:w-auto text-right">
            Temp(max): {convertTemp(data.main.temp_max)}°{isCelsius ? 'C' : 'F'}
          </span>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-black text-sm w-full gap-2"> {/* flex-col-Stacks child elements vertically on small screen*/ }
          <div className="flex items-center space-x-1 w-full md:w-auto justify-between ">
            <h2 className="text-sm font-medium">Deg:</h2>
            <span>{data.wind.deg}°</span>
          </div>
          <div className="flex items-center space-x-1 w-full md:w-auto justify-between ">
            <h2 className="text-sm font-medium">Speed:</h2>
            <span>{data.wind.speed} km/h</span>
          </div>
        </div>
      </section>
  );
}

function UnitConversion({ isCelsius, setIsCelsius }) {
  return (
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
  );
}


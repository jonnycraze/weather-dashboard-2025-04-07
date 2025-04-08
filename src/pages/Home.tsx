import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import { WeatherService } from '../services/WeatherService';
import { CacheService } from '../services/CacheService';
import { MetricsService } from '../services/MetricsService';
import { WeatherApiClient } from '../lib/WeatherApiClient';
import type { WeatherData } from '../models/WeatherData';
import { POPULAR_CITIES } from '../config/cities';
import AlertBanner from '~/components/AlertBanner';

// Initialize services
const cacheService = new CacheService();
const metricsService = new MetricsService();
const weatherApiClient = new WeatherApiClient();
const weatherService = new WeatherService(cacheService, metricsService, weatherApiClient);

function ErrorDisplay({ message }: { message: string }) {
  return (
    <div className='p-4'>
      <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded' role='alert'>
        {message}
      </div>
    </div>
  );
}

{/* NOTE: This should be abstracted into a seperate component */}
function WarningDisplay({ message }: { message: string }) {
  return (
    <div className='mb-4'>
      <div
        className='bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded'
        role='alert'
      >
        {message}
      </div>
    </div>
  );
}

{/* NOTE: This should be abstracted into a seperate component */}
{/* WARNING: This setter prop isn't ideal, considerations could be elevating the alert content to be managed in Context or similar */}
function WeatherCard({ data, setAlert }: { data: WeatherData, setAlert?: (value:string) => void }) {
  const set = () => {
    if (setAlert) setAlert(`Weather conditions in ${data.city}: ${data.conditions.main}`);
  }

  return (
    <div className='bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow' onClick={set}>
      <h2 className='text-xl font-semibold mb-4'>{data.city}</h2>
      <div className='space-y-2'>
        <p className='text-lg'>
          {data.temperature?.celsius?.toFixed(1)}°C / {data.temperature?.fahrenheit?.toFixed(1)}°F
        </p>
        <p className='text-gray-600'>
          {data.conditions?.main} - {data.conditions?.description}
        </p>
        <div className='flex justify-between text-sm text-gray-500'>
          <span>
            Wind: {data.wind?.speed} m/s {data.wind?.direction}
          </span>
          <span>Humidity: {data.humidity}%</span>
        </div>
      </div>
    </div>
  );
}

{/* NOTE: This should be abstracted into a seperate component */}
function WeatherGrid({ weather }: { weather: WeatherData[] }) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      {weather.map(data => (
        <Link
          key={data.city}
          to={`/weather/${encodeURIComponent(data.city.toLowerCase())}`}
          className='block'
        >
          <WeatherCard data={data} />
        </Link>
      ))}
    </div>
  );
}

export default function Home() {
  const [weather, setWeather] = useState<WeatherData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [hottestCity, setHottestCity] = useState<WeatherData>();
  const [coolestCity, setCoolestCity] = useState<WeatherData>();
  const [alertValue, setAlertValue] = useState<string>('');
  const [showAlert, setShowAlert] = useState<boolean>(false);

  useEffect(() => {
    {/* NOTE: This would be better served as a custom hook for reusability */}
    async function fetchWeather() {
      try {
        const weatherPromises = POPULAR_CITIES.map(city => weatherService.getWeatherData(city));

        const results = await Promise.allSettled(weatherPromises);
        const weatherData = results
          .filter(
            (result): result is PromiseFulfilledResult<WeatherData> => result.status === 'fulfilled'
          )
          .map(result => result.value);

        if (weatherData.length === 0) {
          setError('Unable to fetch weather data for any cities. Please try again later.');
          setWeather([]);
        } else {
          {/* NOTE: Depending on the broader application needs, this data could be set in a global state such as Context, Redux, etc. */}
          setWeather(weatherData);
          if (weatherData.length < POPULAR_CITIES.length) {
            setError("Some cities' weather data could not be loaded.");
          } else {
            setError(null);
          }
        }
      } catch (error) {
        setError('Failed to fetch weather data. Please try again later.');
        setWeather([]);
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
  }, []);


  useEffect(() => {
    if (weather?.length) {
      const highest = weather.reduce((max, item) => 
        item.temperature.fahrenheit > max.temperature.fahrenheit ? item : max
      );
      const lowest = weather.reduce((min, item) => 
        item.temperature.fahrenheit < min.temperature.fahrenheit ? item : min
      );

      setCoolestCity(lowest);
      setHottestCity(highest);
    }
  }, [weather]);

  if (loading) {
    {/* NOTE: This should be abstracted into a seperate component */}
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900'></div>
      </div>
    );
  }

  const setAlertAndShow = (v:string) => {
    setAlertValue(v)
    setShowAlert(true);
  }

  return (
    <div>
      {error && <ErrorDisplay message={error} />}

      <AlertBanner value={alertValue} visible={showAlert} setVisible={setShowAlert} />

      {/* NOTE: These should be abstracted into a seperate component, it would also house their localized state, keeping the home component cleaner */}
      {hottestCity && 
        <div style={{marginBottom: 16}}>
          <h2>Hottest City:</h2>
          <WeatherCard data={hottestCity} setAlert={setAlertAndShow} />
        </div>
      }
      {coolestCity && 
        <div style={{marginBottom: 16}}>
          <h2>Coldest City:</h2>
          <WeatherCard data={coolestCity} setAlert={setAlertAndShow} />
        </div>
      }


      {weather.length > 0 && <WeatherGrid weather={weather} />}
    </div>
  );
}

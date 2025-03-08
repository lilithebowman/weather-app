import WeatherDisplay from '../components/WeatherDisplay'
import { useParams } from 'react-router-dom'
import useWeatherDetails from '../hooks/weatherDetails'

const WeatherPage = () => {
	const { city } = useParams()
	const { data: weather, isLoading, isError } = useWeatherDetails(city || '')

	if (isLoading) {
		return <div>Loading...</div>
	}

	if (isError || !weather?.current) {
		return <div>Error loading weather data</div>
	}

	return <WeatherDisplay weather={weather} isError={isError} />
}

export default WeatherPage

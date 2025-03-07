import './App.css'
import useWeatherDetails from './hooks/weatherDetails'
import SearchAutoComplete from './components/SearchAutoComplete'
import WeatherDisplay from './components/WeatherDisplay'
import { useState } from 'react'

interface SubmitParams {
	city_id: string
}

function App() {
	const [city, setCity] = useState('Toronto')
	const { data: weather, isLoading: isWeatherLoading, isError: isWeatherError } = useWeatherDetails(city)

	const submit = (params: SubmitParams) => {
		setCity(params.city_id)
	}

	if (isWeatherLoading) {
		return <div className="weather-loading">Loading...</div>
	}

	if (isWeatherError) {
		return <div className="weather-error">Error fetching weather data. Please try again.</div>
	}

	return (
		<div>
			<h1>Weather</h1>
			{weather?.location?.name ? (
				<WeatherDisplay weather={weather} />
			) : (
				<div className="weather-error">No weather data available for that search term.</div>
			)}
			<SearchAutoComplete city={city} submit={submit} />
		</div>
	)
}

export default App

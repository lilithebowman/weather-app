import './App.css'
import useWeatherDetails from './hooks/weatherDetails'
import SearchAutoComplete from './components/SearchAutoComplete'
import WeatherDisplay from './components/WeatherDisplay'
import { useState } from 'react'
import { Formik, Form } from 'formik'
import Button from '@mui/material/Button'

function App() {
	const [city, setCity] = useState('')
	const { data: weather, isLoading, isError } = useWeatherDetails(city)

	return (
		<div>
			<h1>Weather</h1>
			<Formik
				initialValues={[city]}
				onSubmit={() => { setCity(city) }}
			>
				<Form>
					{weather?.location?.name ? (
						<WeatherDisplay weather={weather} />
					) : (
						<div className="weather-error">No weather data available for that search term.</div>
					)}

					<SearchAutoComplete weather={weather} setCity={setCity} />

					<Button
						variant="contained"
						color="primary"
						type="submit"
						disabled={isLoading}
					>
						{isLoading ? 'Loading...' : 'Search'}
					</Button>
				</Form>
			</Formik>
			<div className="weather-status">
				{isError ? 'Error fetching data' : ''}
			</div>
		</div>
	)
}

export default App

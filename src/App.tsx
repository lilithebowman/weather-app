import { useState } from 'react'
import './App.css'
import useWeatherDetails from './hooks/weatherDetails'
import { Formik, Field, Form } from 'formik'

function App() {
	const [city, setCity] = useState('Toronto')
	const { data: weather, isError: isError } = useWeatherDetails(city)
	console.log(weather)

	return isError ? (<div>Error</div>) : (
		<>
			<div>
				<h1>Weather</h1>
				<div className="weatherCity">{weather?.location.name}, {weather?.location.region}</div>
				<div className="weatherTemp">{weather?.current.temp_c}°C / {weather?.current.temp_f}°F</div>
				<div className="weatherCondition">{weather?.current.condition.text}</div>
				<div className="weatherWind">Wind: {weather?.current.wind_kph} km/h</div>
				<div className="weatherHumidity">Humidity: {weather?.current.humidity}%</div>

				<Formik
					initialValues={{ city: '' }}
					onSubmit={async (values) => {
						await new Promise((resolve) => setTimeout(resolve, 500))
						setCity(values.city)
					}}
				>
					<Form>
						<Field name="city" type="text" placeholder="City" />
						<button type="submit">Submit</button>
					</Form>
				</Formik>
			</div>
		</>
	)
}

export default App

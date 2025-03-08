import './App.css'
import useWeatherDetails from './hooks/weatherDetails'
import SearchAutoComplete from './components/SearchAutoComplete'
import WeatherDisplay from './components/WeatherDisplay'
import { useState } from 'react'
import { Formik, Form } from 'formik'
import Button from '@mui/material/Button'
import { Container, Typography } from '@mui/material'

function App() {
	const [city, setCity] = useState('')
	const { data: weather, isLoading, isError } = useWeatherDetails(city)

	return (
		<div className="forecast-14-day">
			<Container maxWidth='sm' className='search-container'>
				<Typography variant='h4' component='h1' sx={{ mb: 2 }}>
					Forecast Search
				</Typography>
				<Formik
					initialValues={[city]}
					onSubmit={() => { setCity(city) }}
				>
					<Form>
						<SearchAutoComplete weather={weather} setCity={setCity} />

						<Button
							variant='contained'
							color='primary'
							type='submit'
							disabled={isLoading}
							className='search-button'
						>
							{isLoading ? 'Loading...' : 'Search'}
						</Button>
					</Form>
				</Formik>
			</Container>
			{weather?.current &&
				<WeatherDisplay weather={weather} isError={isError} />
			}
		</div>
	)
}

export default App

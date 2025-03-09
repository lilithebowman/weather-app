import './App.css'
import SearchAutoComplete from './components/SearchAutoComplete'
import { useState } from 'react'
import { Formik, Form } from 'formik'
import Button from '@mui/material/Button'
import { Container, Typography } from '@mui/material'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import WeatherPage from './routes/WeatherPage'
import useWeatherDetails from './hooks/weatherDetails'

export const SearchPage = () => {
	const [city, setCity] = useState('')
	const navigate = useNavigate()
	const { isLoading } = useWeatherDetails(city)

	const handleSubmit = () => {
		if (city) {
			navigate(`/weather/${city}`)
		}
	}

	return (
		<Container maxWidth='sm' className='search-container'>
			<Typography variant='h4' component='h1' sx={{ mb: 2 }}>
				Forecast Search
			</Typography>
			<Formik
				initialValues={[city]}
				onSubmit={handleSubmit}
			>
				<Form>
					<SearchAutoComplete searchTerms={city} setSearchTerms={setCity} />
					<Button
						variant='contained'
						color='primary'
						type='submit'
						disabled={isLoading || !city}
						className='search-button'
					>
						{isLoading ? 'Loading...' : 'Search'}
					</Button>
				</Form>
			</Formik>
		</Container>
	)
}

function App() {
	return (
		<Router>
			<div className="forecast-14-day">
				<Routes>
					<Route path="/" element={<SearchPage />} />
					<Route path="/weather/:city" element={<WeatherPage />} />
				</Routes>
			</div>
		</Router>
	)
}

export default App

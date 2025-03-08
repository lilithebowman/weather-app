import { Box, Container, Typography } from '@mui/material'

const WeatherDisplay = ({ weather, isError }: { weather: any, isError: boolean }) => (
	<Container maxWidth='sm'>
		<Typography variant='h4' component='h1' sx={{ mb: 2 }}>
			14 Day Forecast
		</Typography>
		<Box className='weather-status'>
			{isError ? 'Error fetching data' : ''}
		</Box>
		<Box className='weather-results current'>
			<div className="weather-results">
				<div className="weather-city">{weather.location.name}, {weather.location.region}</div>
				<div className="weather-temp">{weather.current.temp_c}°C / {weather.current.temp_f}°F</div>
				<div className="weather-condition">{weather.current.condition.text}</div>
				<div className="weather-wind">Wind: {weather.current.wind_kph} km/h</div>
				<div className="weather-humidity">Humidity: {weather.current.humidity}%</div>
			</div>
		</Box>
	</Container>
)

export default WeatherDisplay

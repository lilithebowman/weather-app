import { Box, Container, Typography } from '@mui/material'

const WeatherDisplay = ({ weather, isError }: { weather: any, isError: boolean }) => (
	<Container maxWidth='sm'>
		<Typography variant='h4' component='h1' sx={{ mb: 2 }}>
			14 Day Forecast
		</Typography>

		{isError &&
			<Box className='weather-error'>
				Error fetching data
			</Box>
		}

		<Container className='weather-results'>
			{weather.forecast.forecastday.map((day: any, index: number) => (
				<Box
					key={index}
					className='weather-result'
					style={{ backgroundImage: `url(${day.day.condition.icon})` }}
				>
					<div className='weather-date'>{day.date}</div>
					<div className='weather-temp'>{day.day.maxtemp_c}°C / {day.day.maxtemp_f}°F</div>
					<div className='weather-condition'>{day.day.condition.text}</div>
					<div className='weather-wind'>Wind: {day.day.maxwind_kph} km/h</div>
					<div className='weather-humidity'>Humidity: {day.day.avghumidity}%</div>
				</Box>
			))}
		</Container>
	</Container>
)

export default WeatherDisplay

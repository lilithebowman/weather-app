import { Box, Button, Container, Typography } from '@mui/material'

interface WeatherInterface {
	weather: any,
	isError: boolean
}

const WeatherDisplay = ({ weather, isError }: WeatherInterface) => (
	<Container maxWidth='lg'>
		<Typography variant='h4' component='h1' sx={{ mb: 2 }}>
			<span>14 Day Forecast for </span>
			<strong>
				{weather.location.name}
				{weather?.location?.region ? ', ' + weather?.location?.region : ''}
				{weather?.location?.country ? ', ' + weather?.location?.country : ''}
			</strong>
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
					<div className='weather-date'>{new Date(day.date).toDateString()}</div>
					<div className='weather-temp'>{day.day.maxtemp_c}°C / {day.day.maxtemp_f}°F</div>
					<div className='weather-condition'>{day.day.condition.text}</div>
					<div className='weather-wind'>Wind: {day.day.maxwind_kph} km/h</div>
					<div className='weather-humidity'>Humidity: {day.day.avghumidity}%</div>
				</Box>
			))}
		</Container>

		<Button
			variant='contained'
			color='primary'
			onClick={() => window.history.back()}
			className='back-button'>
			Back
		</Button>
	</Container>
)

export default WeatherDisplay

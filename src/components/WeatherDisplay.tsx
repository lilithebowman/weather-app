const WeatherDisplay = ({ weather }: { weather: any }) => (
	<div className="weather-results">
		<div className="weather-city">{weather.location.name}, {weather.location.region}</div>
		<div className="weather-temp">{weather.current.temp_c}°C / {weather.current.temp_f}°F</div>
		<div className="weather-condition">{weather.current.condition.text}</div>
		<div className="weather-wind">Wind: {weather.current.wind_kph} km/h</div>
		<div className="weather-humidity">Humidity: {weather.current.humidity}%</div>
	</div>
)

export default WeatherDisplay

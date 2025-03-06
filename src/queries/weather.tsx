export const weatherAPI = 'https://api.weatherapi.com/v1/current.json?key=' + import.meta.env.VITE_WEATHER_API_KEY + '&q=Toronto&aqi=yes';
export const weatherQuery = async () => {
	const res = await fetch(weatherAPI)
	const json = await res.json()
	return json
}

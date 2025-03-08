import { QueryKey, useQuery } from '@tanstack/react-query'
import { VITE_WEATHER_API_KEY } from '../config/config';

const useWeatherDetails = (city: string) => {
	const queryKey: QueryKey = ['weatherDetails', city]
	const apiKey = VITE_WEATHER_API_KEY
	const result = useQuery({
		queryKey,
		queryFn: async () => {
			if (city === '') {
				return null
			}
			const response = await fetch(
				`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=14&aqi=yes&alerts=yes`
			)
			if (!response.ok) {
				throw new Error(`Weather API error: ${response.statusText}`)
			}
			return response.json()
		}
	})

	return result
}

export default useWeatherDetails

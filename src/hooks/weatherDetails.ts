import { QueryKey, useQuery } from '@tanstack/react-query'

const useWeatherDetails = (city: string) => {
	const queryKey: QueryKey = ['weatherDetails', city]
	const apiKey = import.meta.env.VITE_WEATHER_API_KEY
	const result = useQuery({
		queryKey,
		queryFn: async () => {
			if (city === '') {
				return new Response()
			}
			const response = await fetch(
				'https://api.weatherapi.com/v1/current.json?key=' +
				apiKey +
				'&q=' +
				city +
				'&aqi=yes'
			)
			if (!response.ok) {
				throw new Error('Network response was not ok')
			}
			return response.json()
		}
	})

	return result
}

export default useWeatherDetails

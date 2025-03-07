import { QueryKey, useQuery } from '@tanstack/react-query'

const useWeatherDetails = (city: string) => {
	const queryKey: QueryKey = ['weatherDetails', city || 'Toronto']
	const result = useQuery({
		queryKey,
		queryFn: async () => {
			const response = await fetch(
				'https://api.weatherapi.com/v1/current.json?key=' +
				import.meta.env.VITE_WEATHER_API_KEY +
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

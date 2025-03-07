import { QueryKey, useQuery } from '@tanstack/react-query'


const useWeatherDetails = (city: string) => {
	const queryKey: QueryKey = ['weatherDetails', city || 'Toronto']
	const result = useQuery({
		queryKey,
		queryFn: async () => {
			return fetch(
				'https://api.weatherapi.com/v1/current.json?key=' +
				import.meta.env.VITE_WEATHER_API_KEY +
				'&q=' +
				city +
				'&aqi=yes'
			).then((res) => res.json())
		}
	})

	return result.data
}

export default useWeatherDetails

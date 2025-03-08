import { QueryKey, useQuery } from '@tanstack/react-query'
import { VITE_WEATHER_API_KEY } from '../config/config';

const useSearchDetails = (searchTerm: string) => {
	const queryKey: QueryKey = ['searchDetails', searchTerm]
	const apiKey = VITE_WEATHER_API_KEY

	const result = useQuery({
		queryKey,
		queryFn: async () => {
			if (searchTerm === '') {
				return null
			}
			const response = await fetch(
				`https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${searchTerm}`
			)
			if (!response.ok) {
				throw new Error(`Search API error: ${response.statusText}`)
			}
			return response.json()
		},
		enabled: searchTerm?.length >= 1
	})

	return result
}

export default useSearchDetails

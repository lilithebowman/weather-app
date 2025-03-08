import { QueryKey, useQuery } from '@tanstack/react-query'

const useSearchDetails = (searchTerms: string) => {
	const queryKey: QueryKey = ['citiesDetails', searchTerms]
	const apiKey = import.meta.env.VITE_WEATHER_API_KEY
	const result = useQuery({
		queryKey,
		queryFn: async () => {
			return fetch(
				'https://api.weatherapi.com/v1/search.json?key=' +
				apiKey +
				'&q=' +
				searchTerms
			).then((res) => res.json())
		}
	})

	return {
		...result
	}
};

export default useSearchDetails;

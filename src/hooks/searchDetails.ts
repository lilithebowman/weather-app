import { QueryKey, useQuery } from '@tanstack/react-query'

const useSearchDetails = (searchTerms: string) => {
	const queryKey: QueryKey = ['citiesDetails', searchTerms]
	const result = useQuery({
		queryKey,
		queryFn: async () => {
			return fetch(
				'https://api.weatherapi.com/v1/search.json?key=' +
				import.meta.env.VITE_WEATHER_API_KEY +
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

import { QueryKey, useQuery } from '@tanstack/react-query'

const useSearchDetails = (city: string) => {
	const queryKey: QueryKey = ['citiesDetails', city]
	const result = useQuery({
		queryKey,
		queryFn: async () => {
			return fetch(
				'https://api.weatherapi.com/v1/search.json?key=' +
				import.meta.env.VITE_WEATHER_API_KEY +
				'&q=' +
				city
			).then((res) => res.json())
		}
	})

	return {
		...result
	}
};

export default useSearchDetails;

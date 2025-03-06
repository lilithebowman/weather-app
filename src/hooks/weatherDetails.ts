import { QueryKey, useQuery } from '@tanstack/react-query'
export const queryKey: QueryKey = ['weatherDetails']

const useWeatherDetails = (city: string) => {
	console.log(city)
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

	return {
		...result
	}
};

export default useWeatherDetails;

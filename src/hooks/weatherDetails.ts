import { QueryKey, useQuery } from '@tanstack/react-query'
export const queryKey: QueryKey = ['weatherDetails']

const useWeatherDetails = () => {
	const result = useQuery({
		queryKey,
		queryFn: async () => {
			return { date: 'test' }
		}
	});

	return {
		...result
	};
};

export default useWeatherDetails;

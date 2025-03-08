/* eslint-disable */
export const VITE_WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

if (!VITE_WEATHER_API_KEY) {
	throw new Error('VITE_WEATHER_API_KEY is not defined in environment variables');
}

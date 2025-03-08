const getEnvKey = () => {
	// For Jest environment
	if (typeof import.meta === 'undefined') {
		return 'test-api-key'
	}
	return import.meta.env.VITE_WEATHER_API_KEY || ''
}

export const env = {
	WEATHER_API_KEY: getEnvKey()
} as const

export type EnvConfig = typeof env

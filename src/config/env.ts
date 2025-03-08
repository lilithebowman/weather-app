const getEnvKey = () => {
	if (process.env.NODE_ENV === 'test') {
		return 'test-api-key'
	}
	try {
		return import.meta.env.VITE_WEATHER_API_KEY || ''
	} catch {
		return ''
	}
}

export const env = {
	WEATHER_API_KEY: getEnvKey()
} as const

export type EnvConfig = typeof env

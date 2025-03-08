import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock Vite's import.meta.env
vi.mock('import.meta', () => ({
	env: {
		VITE_WEATHER_API_KEY: 'test-api-key'
	}
}))

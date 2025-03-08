import '@testing-library/jest-dom'

declare global {
	var importMeta: { meta: { env: { VITE_WEATHER_API_KEY: string } } };
}

// Define import.meta for test environment
if (typeof globalThis.importMeta === 'undefined') {
	Object.defineProperty(globalThis, 'importMeta', {
		value: { meta: { env: { VITE_WEATHER_API_KEY: 'test-api-key' } } },
		writable: true
	});
}

beforeEach(() => {
	jest.clearAllMocks()
})

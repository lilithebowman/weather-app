import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import WeatherPage from './WeatherPage'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false
		},
	},
})

const renderWithProviders = (ui: React.ReactElement) => {
	return render(
		<QueryClientProvider client={queryClient}>
			<MemoryRouter initialEntries={['/weather/London']}>
				<Routes>
					<Route path="/weather/:city" element={ui} />
				</Routes>
			</MemoryRouter>
		</QueryClientProvider>
	)
}

describe('WeatherPage', () => {
	beforeEach(() => {
		queryClient.clear()
		// Mock fetch globally
		global.fetch = jest.fn()
	})

	it('shows loading state', async () => {
		// Mock a delayed response to ensure we see loading state
		(global.fetch as jest.Mock).mockImplementationOnce(() =>
			new Promise(resolve => setTimeout(resolve, 100))
		)

		renderWithProviders(<WeatherPage />)
		expect(screen.getByText('Loading...')).toBeInTheDocument()
	})

	it('shows error state', async () => {
		// Mock a failed response
		(global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Failed to fetch'))

		renderWithProviders(<WeatherPage />)
		await screen.findByText('Error loading weather data')
	})

	afterEach(() => {
		jest.resetAllMocks()
	})
})

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
	})

	it('shows loading state', () => {
		renderWithProviders(<WeatherPage />)
		expect(screen.getByText('Loading...')).toBeInTheDocument()
	})

	it('shows error state', () => {
		renderWithProviders(<WeatherPage />)
		expect(screen.getByText('Error loading weather data')).toBeInTheDocument()
	})

	it('renders WeatherDisplay when data is available', () => {
		renderWithProviders(<WeatherPage />)
		expect(screen.getByRole('article')).toBeInTheDocument()
	})
})

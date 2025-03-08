import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { UseQueryResult } from '@tanstack/react-query'

const useWeatherDetails = jest.fn()

export default useWeatherDetails

// Mock the custom hooks and child components
jest.mock('./hooks/weatherDetails')
jest.mock('./components/SearchAutoComplete', () => ({
	__esModule: true,
	default: ({ setCity }: { setCity: (city: string) => void }) => (
		<input
			data-testid="search-autocomplete"
			onChange={(e) => setCity(e.target.value)}
			placeholder="Search for a city"
		/>
	)
}))
jest.mock('./components/WeatherDisplay', () => ({
	__esModule: true,
	default: ({ weather }: { weather: any }) => (
		<div data-testid="weather-display">
			Weather for: {weather.location.name}
		</div>
	)
}))

// Create a wrapper with QueryClientProvider
const queryClient = new QueryClient()
const wrapper = ({ children }: { children: React.ReactNode }) => (
	<QueryClientProvider client={queryClient}>
		{children}
	</QueryClientProvider>
)

interface WeatherData {
	location: {
		name: string
		region?: string
		country?: string
	}
	current?: {
		temp_c: number
		temp_f: number
		condition: {
			text: string
		}
		wind_kph: number
		humidity: number
	}
}

describe('App Component', () => {
	const mockWeatherData: WeatherData = {
		location: {
			name: 'London',
			region: 'City of London',
			country: 'United Kingdom'
		},
		current: {
			temp_c: 15,
			temp_f: 59,
			condition: {
				text: 'Partly cloudy'
			},
			wind_kph: 15,
			humidity: 72
		}
	}

	beforeEach(() => {
		jest.clearAllMocks()
	})

	it('shows loading state when fetching weather data', () => {
		const mockUseWeather = jest.mocked(useWeatherDetails)
		mockUseWeather.mockReturnValue({
			data: null,
			dataUpdatedAt: 0,
			error: null,
			errorUpdatedAt: 0,
			failureCount: 0,
			isError: false,
			isFetching: true,
			isLoading: true,
			isPaused: false,
			isPlaceholderData: false,
			isPending: true,
			isRefetching: false,
			isStale: false,
			isSuccess: false,
			status: 'pending',
			fetchStatus: 'fetching'
		} as unknown as UseQueryResult<any, Error>)

		render(<App />, { wrapper })
		const searchButton = screen.getByRole('button')
		expect(searchButton).toHaveTextContent('Loading...')
		expect(searchButton).toBeDisabled()
	})

	it('displays weather data when available', () => {
		const mockUseWeather = jest.mocked(useWeatherDetails)
		mockUseWeather.mockReturnValue({
			data: mockWeatherData,
			isLoading: false,
			isError: false,
			status: 'success'
		} as UseQueryResult<any, Error>)

		render(<App />, { wrapper })
		expect(screen.getByTestId('weather-display')).toBeInTheDocument()
		expect(screen.getByText(`Weather for: ${mockWeatherData.location.name}`)).toBeInTheDocument()
	})

	it('shows error message when fetch fails', () => {
		const mockUseWeather = jest.mocked(useWeatherDetails)
		mockUseWeather.mockReturnValue({
			data: null,
			isLoading: false,
			isError: true,
			status: 'error'
		} as UseQueryResult<any, Error>)

		render(<App />, { wrapper })
		expect(screen.getByText('Error fetching data')).toBeInTheDocument()
	})

	it('shows no data message when no weather data is available', () => {
		const mockUseWeather = jest.mocked(useWeatherDetails)
		mockUseWeather.mockReturnValue({
			data: null,
			isLoading: false,
			isError: false,
			status: 'success'
		} as UseQueryResult<any, Error>)

		render(<App />, { wrapper })
		expect(screen.getByText('No weather data available for that search term.')).toBeInTheDocument()
	})

	it('handles city search input', async () => {
		const mockUseWeather = jest.mocked(useWeatherDetails)
		mockUseWeather.mockReturnValue({
			data: null,
			isLoading: false,
			isError: false,
			status: 'success'
		} as UseQueryResult<any, Error>)

		render(<App />, { wrapper })
		const searchInput = screen.getByTestId('search-autocomplete')
		await userEvent.type(searchInput, 'London')

		const searchButton = screen.getByRole('button')
		expect(searchButton).toHaveTextContent('Search')
		expect(searchButton).toBeEnabled()
	})
})

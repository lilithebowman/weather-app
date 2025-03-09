import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SearchPage } from './App'
import '@testing-library/jest-dom'

const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: () => mockNavigate
}))

jest.mock('./hooks/weatherDetails', () => ({
	__esModule: true,
	default: () => ({ isLoading: false })
}))

jest.mock('./hooks/searchDetails', () => ({
	__esModule: true,
	default: () => ({
		isLoading: false,
		data: []
	})
}))

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
			staleTime: 0
		},
	},
})

const renderWithProviders = (ui: React.ReactElement) => {
	return render(
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				{ui}
			</BrowserRouter>
		</QueryClientProvider>
	)
}

describe('SearchPage', () => {
	beforeEach(() => {
		queryClient.clear()
		mockNavigate.mockClear()
	})

	it('renders search page with title', () => {
		renderWithProviders(<SearchPage />)
		expect(screen.getByText('Forecast Search')).toBeInTheDocument()
	})

	it('handles form submission', () => {
		renderWithProviders(<SearchPage />)
		const submitButton = screen.getByRole('button', { name: 'Search' })
		fireEvent.click(submitButton)
		expect(mockNavigate).not.toHaveBeenCalled()
	})
})

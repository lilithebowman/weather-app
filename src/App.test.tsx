import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import App, { SearchPage } from './App'
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

describe('SearchPage', () => {
	it('renders search page with title', () => {
		render(
			<BrowserRouter>
				<SearchPage />
			</BrowserRouter>
		)
		expect(screen.getByText('Forecast Search')).toBeInTheDocument()
	})

	it('handles form submission', () => {
		render(
			<BrowserRouter>
				<SearchPage />
			</BrowserRouter>
		)
		const submitButton = screen.getByRole('button', { name: 'Search' })
		fireEvent.click(submitButton)
		expect(mockNavigate).not.toHaveBeenCalled()
	})
})

describe('App', () => {
	it('renders without crashing', () => {
		render(<App />)
		expect(screen.getByText('Forecast Search')).toBeInTheDocument()
	})
})

import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import WeatherDisplay from './WeatherDisplay'

const mockWeatherData = {
	location: {
		name: 'London',
		region: 'City of London',
		country: 'UK'
	},
	forecast: {
		forecastday: [{
			date: '2024-02-29',
			day: {
				maxtemp_c: 15,
				maxtemp_f: 59,
				condition: {
					text: 'Partly cloudy',
					icon: 'https://example.com/icon.png'
				},
				maxwind_kph: 20,
				avghumidity: 75
			}
		}]
	}
}

describe('WeatherDisplay', () => {
	it('renders weather information correctly', () => {
		render(<WeatherDisplay weather={mockWeatherData} isError={false} />)

		expect(screen.getByText('14 Day Forecast for')).toBeInTheDocument()
		expect(screen.getByText(/London, City of London, UK/)).toBeInTheDocument()
		expect(screen.getByText('Partly cloudy')).toBeInTheDocument()
		expect(screen.getByText('15°C / 59°F')).toBeInTheDocument()
		expect(screen.getByText('Wind: 20 km/h')).toBeInTheDocument()
		expect(screen.getByText('Humidity: 75%')).toBeInTheDocument()
	})

	it('shows error message when isError is true', () => {
		render(<WeatherDisplay weather={mockWeatherData} isError={true} />)
		expect(screen.getByText('Error fetching data')).toBeInTheDocument()
	})
})

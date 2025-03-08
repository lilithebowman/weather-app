import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import useWeatherDetails from './hooks/weatherDetails';

// src/App.test.tsx


// Mock the custom hook
jest.mock('./hooks/weatherDetails');
const mockedUseWeatherDetails = useWeatherDetails as jest.Mock;

// Mock the child components
jest.mock('./components/SearchAutoComplete', () => {
	return function MockSearchAutoComplete({ setCity }: { setCity: (city: string) => void }) {
		return <input data-testid="search-autocomplete" onChange={(e) => setCity(e.target.value)} />;
	};
});

jest.mock('./components/WeatherDisplay', () => {
	return function MockWeatherDisplay() {
		return <div data-testid="weather-display">Weather Display</div>;
	};
});

const mockWeatherData = {
	current: {
		temp_c: 20,
		condition: { text: 'Sunny' }
	}
};

describe('App Component', () => {
	beforeEach(() => {
		mockedUseWeatherDetails.mockClear();
	});

	test('renders forecast search title', () => {
		mockedUseWeatherDetails.mockReturnValue({ data: null, isLoading: false, isError: false });
		render(<App />);
		expect(screen.getByText('Forecast Search')).toBeInTheDocument();
	});

	test('shows loading state when searching', () => {
		mockedUseWeatherDetails.mockReturnValue({ data: null, isLoading: true, isError: false });
		render(<App />);
		expect(screen.getByText('Loading...')).toBeInTheDocument();
	});

	test('displays weather data when available', () => {
		mockedUseWeatherDetails.mockReturnValue({
			data: mockWeatherData,
			isLoading: false,
			isError: false
		});
		render(<App />);
		expect(screen.getByTestId('weather-display')).toBeInTheDocument();
	});

	test('handles city search submission', () => {
		mockedUseWeatherDetails.mockReturnValue({ data: null, isLoading: false, isError: false });
		render(<App />);

		const searchInput = screen.getByTestId('search-autocomplete');
		const searchButton = screen.getByText('Search');

		fireEvent.change(searchInput, { target: { value: 'London' } });
		fireEvent.click(searchButton);

		expect(mockedUseWeatherDetails).toHaveBeenCalled();
	});

	test('does not display weather when no data', () => {
		mockedUseWeatherDetails.mockReturnValue({ data: null, isLoading: false, isError: false });
		render(<App />);
		expect(screen.queryByTestId('weather-display')).not.toBeInTheDocument();
	});
});

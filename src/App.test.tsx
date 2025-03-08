import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import useWeatherDetails from './hooks/weatherDetails';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

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
	return function MockWeatherDisplay({ weather }: { weather: any }) {
		return <div data-testid="weather-display">Weather Display: {weather.current.temp_c}°C</div>;
	};
});

const renderWithProviders = (ui: React.ReactElement) => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
			},
		},
	});

	return render(
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				{ui}
			</QueryClientProvider>
		</BrowserRouter>
	);
};

describe('App Component', () => {
	beforeEach(() => {
		mockedUseWeatherDetails.mockClear();
	});

	test('renders forecast search title', () => {
		mockedUseWeatherDetails.mockReturnValue({ data: null, isLoading: false, isError: false });
		renderWithProviders(<App />);
		expect(screen.getByText('Forecast Search')).toBeInTheDocument();
	});

	test('shows loading state when searching', () => {
		mockedUseWeatherDetails.mockReturnValue({ data: null, isLoading: true, isError: false });
		renderWithProviders(<App />);
		const searchButton = screen.getByRole('button', { name: /search/i });
		expect(searchButton).toBeDisabled();
	});

	test('handles city search submission', async () => {
		mockedUseWeatherDetails.mockReturnValue({ data: null, isLoading: false, isError: false });
		renderWithProviders(<App />);

		const searchInput = screen.getByTestId('search-autocomplete');
		const searchButton = screen.getByRole('button', { name: /search/i });

		fireEvent.change(searchInput, { target: { value: 'London' } });
		fireEvent.click(searchButton);

		expect(mockedUseWeatherDetails).toHaveBeenCalledWith('London');
	});

	test('does not display weather when no data', () => {
		mockedUseWeatherDetails.mockReturnValue({ data: null, isLoading: false, isError: false });
		renderWithProviders(<App />);
		expect(screen.queryByTestId('weather-display')).not.toBeInTheDocument();
	});

	test('handles empty city search', () => {
		mockedUseWeatherDetails.mockReturnValue({ data: null, isLoading: false, isError: false });
		renderWithProviders(<App />);

		const searchInput = screen.getByTestId('search-autocomplete');
		fireEvent.change(searchInput, { target: { value: '' } });

		expect(mockedUseWeatherDetails).toHaveBeenCalledWith('');
	});
});

import { render, screen, fireEvent } from '@testing-library/react';
import SearchAutoComplete from './SearchAutoComplete';
import useSearchDetails from '../hooks/searchDetails';
import { useDebounce } from 'use-debounce';

// Mock the hooks
jest.mock('../hooks/searchDetails');
jest.mock('use-debounce');

const mockUseSearchDetails = useSearchDetails as jest.Mock;
const mockUseDebounce = useDebounce as jest.Mock;

describe('SearchAutoComplete', () => {
	const mockSetSearchTerms = jest.fn();
	const mockSetInputValue = jest.fn();

	beforeEach(() => {
		mockUseDebounce.mockReturnValue(['', mockSetInputValue]);
		mockUseSearchDetails.mockReturnValue({ data: [] });
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('renders correctly', () => {
		render(<SearchAutoComplete searchTerms="" setSearchTerms={mockSetSearchTerms} />);
		expect(screen.getByLabelText('Search for a city')).toBeInTheDocument();
	});

	it('handles location selection', () => {
		mockUseSearchDetails.mockReturnValue({
			data: [{ name: 'London', region: 'Greater London', country: 'UK' }]
		});

		render(<SearchAutoComplete searchTerms="" setSearchTerms={mockSetSearchTerms} />);
		const input = screen.getByLabelText('Search for a city');

		fireEvent.change(input, { target: { value: 'London' } });
		fireEvent.click(screen.getByText('London, Greater London, UK'));

		expect(mockSetSearchTerms).toHaveBeenCalledWith('London, Greater London, UK');
	});

	it('handles text input changes', () => {
		render(<SearchAutoComplete searchTerms="" setSearchTerms={mockSetSearchTerms} />);
		const input = screen.getByLabelText('Search for a city');

		fireEvent.change(input, { target: { value: 'New York' } });
		expect(mockSetInputValue).toHaveBeenCalledWith('New York');
	});
});

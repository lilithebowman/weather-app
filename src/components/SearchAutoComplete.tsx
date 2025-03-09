import { TextField } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import useSearchDetails from '../hooks/searchDetails'
import { useDebounce } from 'use-debounce'

interface LocationOption {
	name: string;
	region?: string;
	country?: string;
}

interface SearchAutoCompleteProps {
	searchTerms: string,
	setSearchTerms: (city: string) => void
}

const SearchAutoComplete: React.FC<SearchAutoCompleteProps> = ({ searchTerms, setSearchTerms }) => {
	const [inputValue, setInputValue] = useDebounce(searchTerms, 500)
	const { data } = useSearchDetails(inputValue)

	const handleSearchTermChange = (
		event: React.SyntheticEvent<Element, Event>,
		value: string | LocationOption
	) => {
		event.preventDefault();
		if (typeof value === 'string') {
			setSearchTerms(value);
		} else {
			const newValue = value.name +
				(value.region ? ', ' + value.region : '') +
				(value.country ? ', ' + value.country : '');
			setSearchTerms(newValue);
		}
	}

	const handleInputChange = (
		event: React.SyntheticEvent<Element, Event>,
		value: string | null
	) => {
		event.preventDefault();
		if (value) {
			setInputValue(value);
		}
	}

	return (
		<Autocomplete
			freeSolo
			id='city_id'
			className='search-autocomplete'
			disableClearable
			options={data || []}
			getOptionLabel={(option: string | LocationOption) => {
				if (typeof option === 'string') return option;
				return `${option.name}${option.region ? ', ' + option.region : ''}${option.country ? ', ' + option.country : ''}`;
			}}
			onChange={handleSearchTermChange}
			onInputChange={handleInputChange}
			renderInput={(params) => (
				<TextField
					{...params}
					label='Search for a city'
					slotProps={{
						input: {
							...params.InputProps,
							type: 'search',
						},
					}}
				/>
			)}
		/>
	)
}

export default SearchAutoComplete

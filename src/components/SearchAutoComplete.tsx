import { TextField } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import useSearchDetails from '../hooks/searchDetails'
import { useDebounce } from 'use-debounce'

interface SearchAutoCompleteProps {
	location: string,
	setCity: (city: string) => void
}

const SearchAutoComplete: React.FC<SearchAutoCompleteProps> = ({ location, setCity }) => {
	const [inputValue, setInputValue] = useDebounce(location, 500)
	const { data } = useSearchDetails(inputValue || '')

	console.log('data: ')
	console.log(data)

	return (
		<Autocomplete
			id='city_id'
			className='search-autocomplete'
			key={inputValue}
			options={data || []}
			loading={data === undefined}
			loadingText='Loading...'
			noOptionsText='No matching cities'
			disableCloseOnSelect={true}
			onChange={(event, value, reason) => {
				event.preventDefault()
				if (reason === 'selectOption') {
					console.log('Setting the city');
					console.log(event)
					if (value) {
						setCity(value.name)
					}
				}
			}}
			getOptionLabel={(option: {
				name: string,
				region: string,
				country: string
			}) => `${option?.name}${option?.region ? ', ' + option?.region : ''}${option?.country ? ', ' + option?.country : ''}`}
			onInputChange={(event) => {
				if ((event.target as HTMLInputElement).value) {
					setInputValue((event.target as HTMLInputElement).value)
				}
			}}
			renderInput={params => (
				<TextField
					{...params}
					label='Search for a City'
					value={location || data?.name || ''}
				/>
			)}
		/>
	)
}

export default SearchAutoComplete

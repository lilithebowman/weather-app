import { Formik, Form, Field } from 'formik'
import { TextField } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import Button from '@mui/material/Button'
import useSearchDetails from '../hooks/searchDetails'
import { useDebounce } from 'use-debounce'

interface SearchAutoCompleteProps {
	city: string
	submit: (params: { city_id: string }) => void
}

const SearchAutoComplete: React.FC<SearchAutoCompleteProps> = ({ city, submit }) => {
	const [inputValue, setInputValue] = useDebounce(city, 500)

	const { data, isLoading, isError } = useSearchDetails(inputValue)

	if (isError) {
		return (<div className="search-error">Unable to find a location by that name. Try another search term.</div>)
	}

	if (isLoading) {
		return (<div className="search-loading loading">Loading&hellip</div>)
	}

	const initialValues = {
		city_id: '',
	}

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={(value) => {
				e.preventDefault()
				// setInputValue(value.city_id)
				console.log(value.city_id)
			}}
		>
			{({
				values
			}) => (
				<Form>
					<Autocomplete
						id="city_id"
						options={data}
						getOptionLabel={(option: { name: string }) => option.name}
						style={{ width: 300 }}
						renderInput={params => (
							<TextField
								{...params}
								onChange={(event) => {
									setInputValue((event.target as HTMLInputElement).value)
								}}
								margin="normal"
								label="Cities"
								fullWidth
								value={values.city_id}
							/>
						)}
					/>

					<Button
						variant="contained"
						color="primary"
						type="submit"
					>
						Submit
					</Button>
				</Form>
			)}
		</Formik>
	)
}

export default SearchAutoComplete

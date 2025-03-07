import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import axios from 'axios';
import useSearchDetails from '../hooks/searchDetails';

interface SearchAutoCompleteProps {
	city: string;
	submit: (params: { city_id: string }) => void;
}

const SearchAutoComplete: React.FC<SearchAutoCompleteProps> = ({ city, submit }) => {
	const [inputValue, setInputValue] = useState(city);

	useEffect(() => {
		if (inputValue) {
			// Fetch city options based on input value
			axios.get(`/api/cities?query=${inputValue}`).then((response) => {
				setInputValue(response.data as string);
			});
		}
	}, [inputValue]);

	const { data: options, isLoading, isError } = useSearchDetails(inputValue)

	if (isError) {
		return (<div className="search-error">Unable to find a location by that name. Try another search term.</div>)
	}

	if (isLoading) {
		return (<div className="search-loading loading">Loading&hellip;</div>)
	}

	return (
		<Formik
			initialValues={{ city_id: city }
			}
			onSubmit={(values) => {
				submit({ city_id: values.city_id });
			}}
		>
			{({ setFieldValue }) => (
				<Form>
					<Autocomplete<{ name: string }>
						options={options}
						getOptionLabel={(option) => option.name}
						onInputChange={(event) => {
							setInputValue((event.target as HTMLInputElement).value);
						}}
						onChange={(event) => {
							setFieldValue('city_id', (event.target as HTMLInputElement).value);
						}}
						renderInput={(params) => (
							<Field
								{...params}
								name="city_id"
								as={TextField}
								label="Search City"
								variant="outlined"
								fullWidth
							/>
						)}
					/>
					< Button type="submit" variant="contained" color="primary" >
						Submit
					</Button>
				</Form>
			)}
		</Formik>
	);
};

export default SearchAutoComplete;

import { useState } from 'react'
import './App.css'
import useWeatherDetails from './hooks/weatherDetails'
import { Formik, Field, Form } from 'formik'

function App() {
	const [city, setCity] = useState('Toronto')
	const { data, isError } = useWeatherDetails(city)

	return (
		<>
			<div>
				<h1>Weather</h1>
				{isError ? (<div>Error</div>) : null}
				<pre>
					{JSON.stringify(data)}
				</pre>

				<Formik
					initialValues={{ city: '' }}
					onSubmit={async (values) => {
						await new Promise((resolve) => setTimeout(resolve, 500))
						setCity(values.city)
					}}
				>
					<Form>
						<Field name="city" type="text" placeholder="City" />
						<button type="submit">Submit</button>
					</Form>
				</Formik>
			</div>
		</>
	)
}

export default App

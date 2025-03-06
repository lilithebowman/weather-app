import './App.css'
import useWeatherDetails from './hooks/weatherDetails'

function App() {
	const { data, isLoading, isError } = useWeatherDetails()

	return (
		<>
			<div>
				<h1>Weather</h1>
				<pre>
					{JSON.stringify(data)}
				</pre>
			</div>
		</>
	)
}

export default App

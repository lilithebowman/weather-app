import './App.css'
import { weatherQuery } from './queries/weather'
import { useQuery } from '@tanstack/react-query'

function App() {
	const query = useQuery({ queryKey: ['weather-query'], queryFn: weatherQuery })

	return (
		<>
			<div>
				<h1>Weather</h1>
				<pre>
					{JSON.stringify(query, null)}
				</pre>
			</div>
		</>
	)
}

export default App

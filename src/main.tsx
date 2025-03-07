import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import App from './App.tsx'

const queryProvider = new QueryClient({ defaultOptions: { queries: { refetchOnWindowFocus: false } } })

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<QueryClientProvider client={queryProvider}>
			<App />
		</QueryClientProvider>
	</StrictMode>,
)

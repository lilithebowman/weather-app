/** @jsxImportSource react */
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FC, PropsWithChildren } from 'react'
import useWeatherDetails from './weatherDetails'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
		},
	},
})

const wrapper: FC<PropsWithChildren> = ({ children }) => (
	<QueryClientProvider client={queryClient} >
		{children}
	</QueryClientProvider>
)

describe('useWeatherDetails', () => {
	beforeEach(() => {
		queryClient.clear()
		jest.clearAllMocks()
	})

	it('returns null when city is empty', async () => {
		const { result } = renderHook(() => useWeatherDetails(''), { wrapper })
		await waitFor(() => expect(result.current.isSuccess).toBe(true))
		expect(result.current.data).toBeNull()
	})

	it('fetches weather data successfully', async () => {
		const mockWeatherData = {
			location: { name: 'London' },
			current: { temp_c: 20 }
		}

		global.fetch = jest.fn().mockResolvedValueOnce({
			ok: true,
			json: () => Promise.resolve(mockWeatherData),
		} as Response)

		const { result } = renderHook(() => useWeatherDetails('London'), { wrapper })

		await waitFor(() => expect(result.current.isSuccess).toBe(true))
		expect(result.current.data).toEqual(mockWeatherData)
	})

	it('handles API errors', async () => {
		global.fetch = jest.fn().mockResolvedValueOnce({
			ok: false,
			statusText: 'Not Found'
		} as Response)

		const { result } = renderHook(() => useWeatherDetails('InvalidCity'), { wrapper })

		await waitFor(() => expect(result.current.isError).toBe(true))
		expect(result.current.error).toMatchObject({
			message: 'Weather API error: Not Found'
		})
	})
})

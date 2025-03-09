import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import useSearchDetails from './searchDetails'

const queryClient = new QueryClient()
const wrapper = ({ children }: { children: React.ReactNode }) => (
	<QueryClientProvider client={queryClient}>
		{children}
	</QueryClientProvider>
)

describe('useSearchDetails', () => {
	beforeEach(() => {
		queryClient.clear()
		jest.clearAllMocks()
	})

	it('returns undefined for empty search term', async () => {
		const { result } = renderHook(() => useSearchDetails(''), { wrapper })

		await waitFor(() => {
			expect(result.current.data).toBeUndefined()
		})
	})

	it('fetches search results successfully', async () => {
		const mockData = [{ name: 'London', country: 'UK' }]
		global.fetch = jest.fn(() =>
			Promise.resolve({
				ok: true,
				json: () => Promise.resolve(mockData),
			})
		) as jest.Mock

		const { result } = renderHook(() => useSearchDetails('London'), { wrapper })

		await waitFor(() => {
			expect(result.current.data).toEqual(mockData)
		})
	})
})

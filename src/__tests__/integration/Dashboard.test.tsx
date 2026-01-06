import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import userEvent from '@testing-library/user-event'
import DashboardPage from '../../app/page'

// Helper ErrorBoundary for testing thrown errors
class ErrorBoundary extends React.Component<{ fallback: React.ReactNode }, { hasError: boolean }> {
  constructor(props: any) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  render() {
    return this.state.hasError ? this.props.fallback : this.props.children
  }
}

describe('Dashboard integration (user flows, persistence)', () => {
  beforeEach(() => {
    // Reset localStorage mocks
    window.localStorage.getItem.mockReset()
    window.localStorage.setItem.mockReset()
    window.localStorage.clear()
  })

  it('loads with initial content and shows count', async () => {
    render(<DashboardPage />)
    // initial mock content generates 20 items
    const itemsText = await screen.findByText(/items available/i)
    expect(itemsText).toHaveTextContent('20')
  })

  it('search filters results', async () => {
    render(<DashboardPage />)
    // wait for content
    await screen.findByText(/items available/i)

    const search = screen.getByPlaceholderText(/Search content across all categories/i)
    // choose a search term that will reduce results, e.g., "Technology"
    await act(async () => {
      await userEvent.type(search, 'Technology')
    })

    // Header should update to reflect filtered count (at least 1)
    const itemsText = await screen.findByText(/items available/i)
    expect(itemsText).not.toHaveTextContent('20')
    // should be a number
    expect(itemsText.textContent).toMatch(/\d+ items available/)
  })

  it('can add to favorites and view favorites section and localStorage persists favorites', async () => {
    render(<DashboardPage />)
    // wait for items
    await screen.findByText(/items available/i)

    // Find the first card's title and then its favorite button
    const firstTitle = screen.getAllByRole('heading', { level: 3 })
      .map(h => h.textContent)
      .find(t => t && /Update/.test(t))

    expect(firstTitle).toBeDefined()

    // Locate the content grid and click the first favorite button inside it
    const grid = document.querySelector('div.grid.grid-cols-1') as HTMLElement
    expect(grid).toBeTruthy()
    const favBtn = grid.querySelector('button') as HTMLButtonElement
    expect(favBtn).toBeTruthy()

    // click favorite
    await act(async () => {
      await userEvent.click(favBtn)
    })

    // localStorage.setItem should be called with 'favorites'
    await waitFor(() => {
      expect(window.localStorage.setItem).toHaveBeenCalled()
    })

    // navigate to Favorites section via header button
    const favNav = screen.getByRole('button', { name: /Favorites/i })
    await act(async () => {
      await userEvent.click(favNav)
    })

    // Heading should indicate Saved Content and count should be 1
    expect(screen.getByText(/Saved Content/i)).toBeInTheDocument()
    const itemsText = screen.getByText(/items available/i)
    expect(itemsText.textContent).toMatch(/1 items? available/)

    // toggle off favorite
    await act(async () => {
      await userEvent.click(favBtn!)
    })
    // items count should go to 0
    await waitFor(() => {
      expect(screen.getByText(/items available/i).textContent).toMatch(/0 items? available/)
    })
  })

  it('navigates between sections Home and Trending', async () => {
    render(<DashboardPage />)
    await screen.findByText(/items available/i)

    const trending = screen.getByRole('button', { name: /Trending/i })
    await act(async () => {
      await userEvent.click(trending)
    })
    expect(screen.getByText(/Trending Now/i)).toBeInTheDocument()

    const home = screen.getByRole('button', { name: /Home/i })
    await act(async () => {
      await userEvent.click(home)
    })
    expect(screen.getByText(/Your Content Feed/i)).toBeInTheDocument()
  })

  it('dark mode toggle updates document class and persists in localStorage', async () => {
    render(<DashboardPage />)
    await screen.findByText(/items available/i)

    // find the dark mode button by locating the Sun (svg) element and clicking its parent button
    const sunSvg = document.querySelector('svg.text-cyan-400')
    expect(sunSvg).toBeTruthy()
    const btn = sunSvg!.closest('button') as HTMLButtonElement
    // ensure any click-driven updates are awaited
    await act(async () => {
      await userEvent.click(btn)
    })

    // record current state, click toggle, and assert it flips
    const initialHasDark = document.documentElement.classList.contains('dark')
    await act(async () => {
      await userEvent.click(btn)
    })
    await waitFor(() => {
      expect(document.documentElement.classList.contains('dark')).toBe(!initialHasDark)
    })
    // localStorage setItem should be called with the new state
    expect(window.localStorage.setItem).toHaveBeenCalledWith('darkMode', JSON.stringify(!initialHasDark))

    // simulate saved darkMode = false before mount to verify persistence
    window.localStorage.getItem.mockImplementation((k: string) => (k === 'darkMode' ? JSON.stringify(false) : null))
    // rerender (unmount + mount)
    const { unmount } = render(<DashboardPage />)
    unmount()
    render(<DashboardPage />)

    await waitFor(() => {
      expect(document.documentElement.classList.contains('dark')).toBe(false)
    })
  })

  it('supports error boundary when localStorage has invalid favorites JSON (fallback shown)', async () => {
    // suppress noisy console.error emitted during the failing mount
    const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

    // make localStorage return invalid JSON for favorites key
    window.localStorage.getItem.mockImplementation((k: string) => (k === 'favorites' ? 'INVALID_JSON' : null))

    const fallback = <div data-testid="fallback">Error occurred</div>
    render(
      <ErrorBoundary fallback={fallback}>
        <DashboardPage />
      </ErrorBoundary>
    )

    // ErrorBoundary should render fallback when parse fails
    await screen.findByTestId('fallback')
    expect(screen.getByTestId('fallback')).toHaveTextContent('Error occurred')

    errSpy.mockRestore()
  })
})

export {}

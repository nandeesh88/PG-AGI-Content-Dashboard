import { rest } from 'msw'
import { server } from '../mocks/server'

describe('newsApi (MSW integration)', () => {
  const ORIGINAL_ENV = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...ORIGINAL_ENV }
  })

  afterAll(() => {
    process.env = ORIGINAL_ENV
  })

  test('fetchNews via network returns mapped data and respects page', async () => {
    process.env.NEXT_PUBLIC_NEWS_API_KEY = 'real-key'
    // respond with a title that contains the page param so we can assert it's forwarded
    server.use(
      rest.get('https://newsapi.org/v2/top-headlines', (req, res, ctx) => {
        const page = req.url.searchParams.get('page') || '1'
        return res(
          ctx.status(200),
          ctx.json({
            status: 'ok',
            totalResults: 1,
            articles: [
              {
                source: { id: null, name: 'MSW Source' },
                author: 'MSW Author',
                title: `MSW Title page-${page}`,
                description: 'MSW desc',
                url: 'https://msw.test/article',
                urlToImage: '',
                publishedAt: new Date().toISOString(),
                content: '',
              },
            ],
          })
        )
      })
    )

    const api = await import('@/services/newsApi')
    const items = await api.fetchNews('general', 2, 1)

    expect(items).toHaveLength(1)
    expect(items[0].title).toContain('page-2')
    expect(items[0].source).toBe('MSW Source')
  })

  test('fetchNews falls back to mock data on 500', async () => {
    process.env.NEXT_PUBLIC_NEWS_API_KEY = 'real-key'
    server.use(
      rest.get('https://newsapi.org/v2/top-headlines', (req, res, ctx) => {
        return res(ctx.status(500))
      })
    )

    const spy = jest.spyOn(console, 'error').mockImplementation(() => {})
    const api = await import('@/services/newsApi')
    const items = await api.fetchNews('finance', 1, 3)

    // fallback returns mock data with requested category
    expect(items).toHaveLength(3)
    expect(items.every(i => i.category === 'finance')).toBe(true)
    spy.mockRestore()
  })

  test('searchNews returns mapped data from /everything', async () => {
    process.env.NEXT_PUBLIC_NEWS_API_KEY = 'real-key'
    server.use(
      rest.get('https://newsapi.org/v2/everything', (req, res, ctx) => {
        const q = req.url.searchParams.get('q') || 'none'
        return res(
          ctx.status(200),
          ctx.json({
            status: 'ok',
            totalResults: 1,
            articles: [
              {
                source: { id: null, name: 'Search Source' },
                author: 'Search Author',
                title: `Search Title for ${q}`,
                description: 'Search desc',
                url: 'https://msw.test/search',
                urlToImage: '',
                publishedAt: new Date().toISOString(),
                content: '',
              },
            ],
          })
        )
      })
    )

    const api = await import('@/services/newsApi')
    const items = await api.searchNews('ai', 1, 5)

    expect(items).toHaveLength(1)
    expect(items[0].title).toContain('ai')
    expect(items[0].source).toBe('Search Source')
  })

  test('searchNews returns [] when API returns 429', async () => {
    process.env.NEXT_PUBLIC_NEWS_API_KEY = 'real-key'
    server.use(
      rest.get('https://newsapi.org/v2/everything', (req, res, ctx) => {
        return res(ctx.status(429))
      })
    )

    const spy = jest.spyOn(console, 'error').mockImplementation(() => {})
    const api = await import('@/services/newsApi')
    const items = await api.searchNews('rate', 1, 5)

    expect(items).toEqual([])
    spy.mockRestore()
  })
})

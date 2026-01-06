
// Helper to build a fake NewsAPI response
const makeApiResponse = (count = 3) => ({
  status: 'ok',
  totalResults: count,
  articles: Array.from({ length: count }).map((_, i) => ({
    source: { id: null, name: `Source ${i + 1}` },
    author: `Author ${i + 1}`,
    title: `Title ${i + 1}`,
    description: `Description ${i + 1}`,
    url: `https://example.com/article-${i + 1}`,
    urlToImage: `https://picsum.photos/id/${i + 1}/800/600`,
    publishedAt: new Date().toISOString(),
    content: `Content ${i + 1}`,
  })),
})

describe('newsApi service', () => {
  const ORIGINAL_ENV = process.env

  beforeEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
    process.env = { ...ORIGINAL_ENV }
  })

  afterAll(() => {
    process.env = ORIGINAL_ENV
  })

  test('fetchNews returns mock data when API key is missing', async () => {
    process.env.NEXT_PUBLIC_NEWS_API_KEY = ''
    const api = await import('@/services/newsApi')

    const items = await api.fetchNews('technology', 1, 5)

    expect(items).toHaveLength(5)
    expect(items.every(i => i.category === 'technology')).toBe(true)
    expect(items[0].type).toBe('news')
  })

  test('fetchNews calls the API and maps response when API key present', async () => {
    process.env.NEXT_PUBLIC_NEWS_API_KEY = 'real-key'

    const getMock = jest.fn().mockResolvedValue({ data: makeApiResponse(2) })
    // Mock axios.create to return object w/ get at module import time
    jest.doMock('axios', () => ({ create: () => ({ get: getMock }) }))

    const api = await import('@/services/newsApi')

    const items = await api.fetchNews('sports', 2, 2)

    expect(getMock).toHaveBeenCalledWith('/top-headlines', expect.objectContaining({ params: expect.objectContaining({ category: 'sports', page: 2, pageSize: 2 }) }))
    expect(items).toHaveLength(2)
    expect(items[0].title).toBe('Title 1')
    expect(items[0].source).toBe('Source 1')
    expect(items[0].id).toMatch(/^news-/)
  })

  test('fetchNews falls back to mock data when request throws (500/429/etc.)', async () => {
    process.env.NEXT_PUBLIC_NEWS_API_KEY = 'real-key'
    const getMock = jest.fn().mockRejectedValue(new Error('500 Internal'))
    jest.doMock('axios', () => ({ create: () => ({ get: getMock }) }))

    const api = await import('@/services/newsApi')

    const items = await api.fetchNews('finance', 1, 3)

    expect(getMock).toHaveBeenCalled()
    expect(items).toHaveLength(3)
    expect(items.every(i => i.category === 'finance')).toBe(true)
  })

  test('searchNews filters mock data when API key missing and respects pageSize', async () => {
    process.env.NEXT_PUBLIC_NEWS_API_KEY = ''
    const api = await import('@/services/newsApi')

    // generateMockNews creates titles that include category words; search for "breaking" which is common in general
    const results = await api.searchNews('breaking', 1, 4)

    expect(results.length).toBeLessThanOrEqual(4)
    expect(results.every(r => r.type === 'news')).toBe(true)
    expect(results.slice(0, 4).length).toBe(results.length)
  })

  test('searchNews calls API and maps results when API key present', async () => {
    process.env.NEXT_PUBLIC_NEWS_API_KEY = 'real-key'
    const getMock = jest.fn().mockResolvedValue({ data: makeApiResponse(3) })
    jest.doMock('axios', () => ({ create: () => ({ get: getMock }) }))

    const api = await import('@/services/newsApi')

    const items = await api.searchNews('ai', 1, 3)

    expect(getMock).toHaveBeenCalledWith('/everything', expect.objectContaining({ params: expect.objectContaining({ q: 'ai', page: 1, pageSize: 3 }) }))
    expect(items).toHaveLength(3)
    expect(items[0].id).toMatch(/^news-search-/)
    expect(items[0].title).toBe('Title 1')
  })

  test('searchNews returns [] when API errors', async () => {
    process.env.NEXT_PUBLIC_NEWS_API_KEY = 'real-key'
    const getMock = jest.fn().mockRejectedValue({ response: { status: 429 } })
    jest.doMock('axios', () => ({ create: () => ({ get: getMock }) }))

    const api = await import('@/services/newsApi')

    const items = await api.searchNews('rate', 1, 5)

    expect(getMock).toHaveBeenCalled()
    expect(items).toEqual([])
  })

  test('rate limit (429) for fetchNews falls back to mock data', async () => {
    process.env.NEXT_PUBLIC_NEWS_API_KEY = 'real-key'
    const err: any = new Error('Too many requests')
    err.response = { status: 429 }
    const getMock = jest.fn().mockRejectedValue(err)
    jest.doMock('axios', () => ({ create: () => ({ get: getMock }) }))

    const api = await import('@/services/newsApi')

    const items = await api.fetchNews('health', 1, 2)

    expect(getMock).toHaveBeenCalled()
    expect(items).toHaveLength(2)
    expect(items.every(i => i.category === 'health')).toBe(true)
  })

  test('pagination logic: different pages and sizes are forwarded to API', async () => {
    process.env.NEXT_PUBLIC_NEWS_API_KEY = 'real-key'
    const getMock = jest.fn().mockResolvedValue({ data: makeApiResponse(5) })
    jest.doMock('axios', () => ({ create: () => ({ get: getMock }) }))

    const api = await import('@/services/newsApi')

    await api.fetchNews('general', 3, 5)

    expect(getMock).toHaveBeenCalledWith('/top-headlines', expect.objectContaining({ params: expect.objectContaining({ page: 3, pageSize: 5 }) }))
  })
})

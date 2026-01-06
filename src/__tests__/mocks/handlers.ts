import { rest } from 'msw'

export const handlers = [
  // Example content API handler used in integration tests; returns a small set
  rest.get('/api/content', (req, res, ctx) => {
    const items = Array.from({ length: 5 }).map((_, i) => ({
      id: `api-item-${i}`,
      type: ['news', 'recommendation', 'post'][i % 3],
      title: `API Item ${i}`,
      description: `Description ${i}`,
      image: '',
      url: '#',
      category: 'API',
      source: 'Test API',
      publishedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    }))
    return res(ctx.status(200), ctx.json(items))
  }),
]

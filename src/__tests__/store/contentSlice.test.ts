import reducer, {
  setSearchQuery,
  setCategory,
  reorderContent,
  resetContent,
  fetchAllContent,
  fetchMoreContent,
} from '../../store/slices/contentSlice'
import { configureStore } from '@reduxjs/toolkit'

type Item = { id: string; title?: string }

describe('contentSlice reducer and thunks', () => {
  it('returns initial state when passed undefined', () => {
    const state = reducer(undefined, { type: '@@INIT' } as any)
    expect(state.items).toEqual([])
    expect(state.loading).toBe(false)
    expect(state.error).toBeNull()
    expect(state.page).toBe(1)
    expect(state.hasMore).toBe(true)
    expect(state.filters.searchQuery).toBe('')
  })

  it('handles setSearchQuery and setCategory', () => {
    const start = reducer(undefined, { type: '@@INIT' } as any)
    const s1 = reducer(start, setSearchQuery('needle'))
    expect(s1.filters.searchQuery).toBe('needle')

    const s2 = reducer(s1, setCategory('news'))
    expect(s2.filters.category).toBe('news')

    const s3 = reducer(s2, setCategory(undefined))
    expect(s3.filters.category).toBeUndefined()
  })

  it('reorderContent moves items and preserves immutability', () => {
    const initial = {
      items: [{ id: 'a' }, { id: 'b' }, { id: 'c' }] as unknown as any,
      loading: false,
      error: null,
      page: 1,
      hasMore: true,
      filters: { searchQuery: '' },
    }

    const prevItems = initial.items.slice()
    const next = reducer(initial as any, reorderContent({ oldIndex: 0, newIndex: 2 }))
    expect(next.items.map((i: Item) => i.id)).toEqual(['b', 'c', 'a'])
    // previous array should remain unchanged
    expect(prevItems.map((i: Item) => i.id)).toEqual(['a', 'b', 'c'])
  })

  it('resetContent clears items and resets pagination/flags', () => {
    const populated = {
      items: [{ id: 'x' }] as unknown as any,
      loading: false,
      error: 'oops',
      page: 5,
      hasMore: false,
      filters: { searchQuery: 'a' },
    }
    const res = reducer(populated as any, resetContent())
    expect(res.items).toEqual([])
    expect(res.page).toBe(1)
    expect(res.hasMore).toBe(true)
    expect(res.error).toBeNull()
  })

  it('handles pending/fulfilled/rejected for fetchAllContent via reducer actions', () => {
    const pending = reducer(undefined as any, fetchAllContent.pending('', { categories: [], page: 1 }))
    expect(pending.loading).toBe(true)
    expect(pending.error).toBeNull()

    const payload = [{ id: 'p1' }]
    const fulfilled = reducer(pending as any, fetchAllContent.fulfilled(payload as any, '', { categories: [], page: 1 }))
    expect(fulfilled.loading).toBe(false)
    expect(fulfilled.items).toEqual(payload)
    expect(fulfilled.error).toBeNull()

    const rejected = reducer(pending as any, fetchAllContent.rejected(new Error('no'), '', { categories: [], page: 1 }))
    expect(rejected.loading).toBe(false)
    expect(rejected.error).toBe('Failed to fetch content')
  })

  it('dispatching thunks resolves to fulfilled with payload [] (payloadCreator currently returns [])', async () => {
    const store = configureStore({ reducer: { content: reducer } })
    const res = await store.dispatch<any>(fetchAllContent({ categories: [], page: 1 }))
    expect(res.type).toMatch(/fulfilled$/)
    expect(res.payload).toEqual([])

    const res2 = await store.dispatch<any>(fetchMoreContent({ categories: [], page: 2 }))
    expect(res2.type).toMatch(/fulfilled$/)
    expect(res2.payload).toEqual([])
  })

  it('reorder on empty items leaves items empty', () => {
    const start = reducer(undefined as any, { type: '@@INIT' } as any)
    const next = reducer(start, reorderContent({ oldIndex: 0, newIndex: 1 }))
    expect(next.items).toEqual([])
  })
})

export {}

import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../store'

export function renderWithProviders(ui: React.ReactElement) {
  return render(<Provider store={store}>{ui}</Provider>)
}

export * from '@testing-library/react'
export { default as userEvent } from '@testing-library/user-event'

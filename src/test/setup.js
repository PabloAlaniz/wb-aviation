import { expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import { act } from 'react'

// Polyfill React.act for React 19+ compatibility
if (typeof globalThis.IS_REACT_ACT_ENVIRONMENT === 'undefined') {
  globalThis.IS_REACT_ACT_ENVIRONMENT = true
}

// Cleanup after each test
afterEach(() => {
  act(() => {
    cleanup()
  })
})

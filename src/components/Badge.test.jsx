import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Badge } from './Badge'

describe('Badge', () => {
  it('renders children correctly', () => {
    render(<Badge>Test Badge</Badge>)
    expect(screen.getByText('Test Badge')).toBeInTheDocument()
  })

  it('applies default variant by default', () => {
    const { container } = render(<Badge>Default</Badge>)
    const badge = container.firstChild
    expect(badge).toHaveClass('bg-gray-900', 'text-gray-50')
  })

  it('applies destructive variant correctly', () => {
    const { container } = render(<Badge variant="destructive">Error</Badge>)
    const badge = container.firstChild
    expect(badge).toHaveClass('bg-red-500', 'text-gray-50')
  })

  it('applies outline variant correctly', () => {
    const { container } = render(<Badge variant="outline">Outline</Badge>)
    const badge = container.firstChild
    expect(badge).toHaveClass('border', 'border-gray-200')
  })

  it('applies secondary variant correctly', () => {
    const { container } = render(<Badge variant="secondary">Secondary</Badge>)
    const badge = container.firstChild
    expect(badge).toHaveClass('bg-gray-100', 'text-gray-900')
  })

  it('applies custom className', () => {
    const { container } = render(<Badge className="custom-class">Custom</Badge>)
    const badge = container.firstChild
    expect(badge).toHaveClass('custom-class')
  })
})

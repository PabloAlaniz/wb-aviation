import React from 'react'
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Separator } from './Separator'

describe('Separator', () => {
  it('renders horizontal separator by default', () => {
    const { container } = render(<Separator />)
    const separator = container.firstChild
    expect(separator).toHaveClass('h-[1px]', 'w-full')
  })

  it('renders vertical separator when orientation is vertical', () => {
    const { container } = render(<Separator orientation="vertical" />)
    const separator = container.firstChild
    expect(separator).toHaveClass('h-full', 'w-[1px]')
  })

  it('applies custom className', () => {
    const { container } = render(<Separator className="custom-class" />)
    const separator = container.firstChild
    expect(separator).toHaveClass('custom-class')
  })

  it('applies default background color', () => {
    const { container } = render(<Separator />)
    const separator = container.firstChild
    expect(separator).toHaveClass('bg-gray-200')
  })

  it('renders as div element', () => {
    const { container } = render(<Separator />)
    const separator = container.querySelector('div')
    expect(separator).toBeInTheDocument()
  })
})

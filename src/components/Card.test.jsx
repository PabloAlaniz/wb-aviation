import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './Card'

describe('Card', () => {
  it('renders children correctly', () => {
    render(<Card>Test Card</Card>)
    expect(screen.getByText('Test Card')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(<Card className="custom-class">Card</Card>)
    const card = container.firstChild
    expect(card).toHaveClass('custom-class')
  })

  it('applies default styles', () => {
    const { container } = render(<Card>Card</Card>)
    const card = container.firstChild
    expect(card).toHaveClass('rounded-lg', 'border', 'bg-white', 'shadow-sm')
  })
})

describe('CardHeader', () => {
  it('renders children correctly', () => {
    render(<CardHeader>Header Content</CardHeader>)
    expect(screen.getByText('Header Content')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(<CardHeader className="custom">Header</CardHeader>)
    const header = container.firstChild
    expect(header).toHaveClass('custom')
  })

  it('applies default styles', () => {
    const { container } = render(<CardHeader>Header</CardHeader>)
    const header = container.firstChild
    expect(header).toHaveClass('flex', 'flex-col', 'space-y-1.5', 'p-6')
  })
})

describe('CardTitle', () => {
  it('renders children correctly', () => {
    render(<CardTitle>Title Text</CardTitle>)
    expect(screen.getByText('Title Text')).toBeInTheDocument()
  })

  it('renders as h3 element', () => {
    const { container } = render(<CardTitle>Title</CardTitle>)
    const title = container.querySelector('h3')
    expect(title).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(<CardTitle className="custom">Title</CardTitle>)
    const title = container.firstChild
    expect(title).toHaveClass('custom')
  })
})

describe('CardDescription', () => {
  it('renders children correctly', () => {
    render(<CardDescription>Description text</CardDescription>)
    expect(screen.getByText('Description text')).toBeInTheDocument()
  })

  it('renders as p element', () => {
    const { container } = render(<CardDescription>Desc</CardDescription>)
    const desc = container.querySelector('p')
    expect(desc).toBeInTheDocument()
  })

  it('applies text color class', () => {
    const { container } = render(<CardDescription>Desc</CardDescription>)
    const desc = container.firstChild
    expect(desc).toHaveClass('text-gray-500')
  })
})

describe('CardContent', () => {
  it('renders children correctly', () => {
    render(<CardContent>Content text</CardContent>)
    expect(screen.getByText('Content text')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(<CardContent className="custom">Content</CardContent>)
    const content = container.firstChild
    expect(content).toHaveClass('custom')
  })

  it('applies default padding styles', () => {
    const { container } = render(<CardContent>Content</CardContent>)
    const content = container.firstChild
    expect(content).toHaveClass('p-6', 'pt-0')
  })
})

import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { Input, Label } from './Input'

describe('Input', () => {
  it('renders input element', () => {
    render(<Input data-testid="test-input" />)
    const input = screen.getByTestId('test-input')
    expect(input).toBeInTheDocument()
  })

  it('accepts value prop', () => {
    render(<Input value="test value" onChange={() => {}} />)
    const input = screen.getByDisplayValue('test value')
    expect(input).toBeInTheDocument()
  })

  it('accepts placeholder prop', () => {
    render(<Input placeholder="Enter text" />)
    const input = screen.getByPlaceholderText('Enter text')
    expect(input).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(<Input className="custom-class" />)
    const input = container.firstChild
    expect(input).toHaveClass('custom-class')
  })

  it('applies default styles', () => {
    const { container } = render(<Input />)
    const input = container.firstChild
    expect(input).toHaveClass('flex', 'h-10', 'rounded-md', 'border')
  })

  it('can be disabled', () => {
    render(<Input disabled data-testid="disabled-input" />)
    const input = screen.getByTestId('disabled-input')
    expect(input).toBeDisabled()
  })

  it('handles user input', async () => {
    const user = userEvent.setup()
    render(<Input data-testid="user-input" />)
    const input = screen.getByTestId('user-input')
    
    await user.type(input, 'Hello')
    expect(input).toHaveValue('Hello')
  })

  it('accepts type prop', () => {
    render(<Input type="email" data-testid="email-input" />)
    const input = screen.getByTestId('email-input')
    expect(input).toHaveAttribute('type', 'email')
  })
})

describe('Label', () => {
  it('renders children correctly', () => {
    render(<Label>Label Text</Label>)
    expect(screen.getByText('Label Text')).toBeInTheDocument()
  })

  it('renders as label element', () => {
    const { container } = render(<Label>Label</Label>)
    const label = container.querySelector('label')
    expect(label).toBeInTheDocument()
  })

  it('accepts htmlFor prop', () => {
    render(<Label htmlFor="input-id">Label</Label>)
    const label = screen.getByText('Label')
    expect(label).toHaveAttribute('for', 'input-id')
  })

  it('applies custom className', () => {
    const { container } = render(<Label className="custom">Label</Label>)
    const label = container.firstChild
    expect(label).toHaveClass('custom')
  })

  it('applies default styles', () => {
    const { container } = render(<Label>Label</Label>)
    const label = container.firstChild
    expect(label).toHaveClass('text-sm', 'font-medium')
  })
})

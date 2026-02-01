import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SimpleSelect
} from './Select'

describe('Select', () => {
  it('renders children as render prop', () => {
    render(
      <Select value="test" onValueChange={() => {}}>
        {({ value }) => <div>Value: {value}</div>}
      </Select>
    )
    expect(screen.getByText('Value: test')).toBeInTheDocument()
  })

  it('provides isOpen and setIsOpen to children', () => {
    const { rerender } = render(
      <Select value="test" onValueChange={() => {}}>
        {({ isOpen }) => <div>{isOpen ? 'Open' : 'Closed'}</div>}
      </Select>
    )
    expect(screen.getByText('Closed')).toBeInTheDocument()
  })
})

describe('SelectTrigger', () => {
  it('renders children correctly', () => {
    render(<SelectTrigger onClick={() => {}}>Trigger Text</SelectTrigger>)
    expect(screen.getByText('Trigger Text')).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    render(<SelectTrigger onClick={handleClick}>Click me</SelectTrigger>)
    
    const button = screen.getByRole('button')
    await user.click(button)
    
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('renders as button element', () => {
    render(<SelectTrigger onClick={() => {}}>Trigger</SelectTrigger>)
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })

  it('renders chevron icon', () => {
    const { container } = render(<SelectTrigger onClick={() => {}}>Trigger</SelectTrigger>)
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })
})

describe('SelectValue', () => {
  const options = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' }
  ]

  it('displays selected option label', () => {
    render(<SelectValue value="1" options={options} placeholder="Select..." />)
    expect(screen.getByText('Option 1')).toBeInTheDocument()
  })

  it('displays placeholder when no value selected', () => {
    render(<SelectValue value="" options={options} placeholder="Select an option" />)
    expect(screen.getByText('Select an option')).toBeInTheDocument()
  })

  it('applies placeholder style when no value', () => {
    const { container } = render(<SelectValue value="" options={options} placeholder="Placeholder" />)
    const span = container.querySelector('span')
    expect(span).toHaveClass('text-gray-500')
  })

  it('does not apply placeholder style when value is selected', () => {
    const { container } = render(<SelectValue value="1" options={options} placeholder="Placeholder" />)
    const span = container.querySelector('span')
    expect(span).not.toHaveClass('text-gray-500')
  })
})

describe('SelectContent', () => {
  it('renders children when isOpen is true', () => {
    render(<SelectContent isOpen={true}>Content Here</SelectContent>)
    expect(screen.getByText('Content Here')).toBeInTheDocument()
  })

  it('does not render when isOpen is false', () => {
    render(<SelectContent isOpen={false}>Content Here</SelectContent>)
    expect(screen.queryByText('Content Here')).not.toBeInTheDocument()
  })

  it('applies dropdown styling', () => {
    const { container } = render(<SelectContent isOpen={true}>Content</SelectContent>)
    const content = container.firstChild
    expect(content).toHaveClass('absolute', 'z-50', 'bg-white', 'shadow-lg')
  })
})

describe('SelectItem', () => {
  it('renders children correctly', () => {
    render(<SelectItem value="test" onSelect={() => {}}>Item Text</SelectItem>)
    expect(screen.getByText('Item Text')).toBeInTheDocument()
  })

  it('calls onSelect with value when clicked', async () => {
    const user = userEvent.setup()
    const handleSelect = vi.fn()
    render(<SelectItem value="test-value" onSelect={handleSelect}>Click Item</SelectItem>)
    
    const item = screen.getByText('Click Item')
    await user.click(item)
    
    expect(handleSelect).toHaveBeenCalledWith('test-value')
  })

  it('applies hover styling', () => {
    const { container } = render(<SelectItem value="test" onSelect={() => {}}>Item</SelectItem>)
    const item = container.firstChild
    expect(item).toHaveClass('hover:bg-gray-100', 'cursor-pointer')
  })
})

describe('SimpleSelect', () => {
  const options = [
    { value: 'opt1', label: 'Option 1' },
    { value: 'opt2', label: 'Option 2' },
    { value: 'opt3', label: 'Option 3' }
  ]

  it('renders with placeholder', () => {
    render(
      <SimpleSelect
        value=""
        onValueChange={() => {}}
        placeholder="Choose option"
        options={options}
      />
    )
    expect(screen.getByText('Choose option')).toBeInTheDocument()
  })

  it('opens dropdown when trigger is clicked', async () => {
    const user = userEvent.setup()
    render(
      <SimpleSelect
        value=""
        onValueChange={() => {}}
        placeholder="Select"
        options={options}
      />
    )
    
    const trigger = screen.getByRole('button')
    await user.click(trigger)
    
    expect(screen.getByText('Option 1')).toBeInTheDocument()
    expect(screen.getByText('Option 2')).toBeInTheDocument()
    expect(screen.getByText('Option 3')).toBeInTheDocument()
  })

  it('calls onValueChange when option is selected', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    render(
      <SimpleSelect
        value=""
        onValueChange={handleChange}
        placeholder="Select"
        options={options}
      />
    )
    
    const trigger = screen.getByRole('button')
    await user.click(trigger)
    
    const option = screen.getByText('Option 2')
    await user.click(option)
    
    expect(handleChange).toHaveBeenCalledWith('opt2')
  })

  it('closes dropdown after selection', async () => {
    const user = userEvent.setup()
    render(
      <SimpleSelect
        value=""
        onValueChange={() => {}}
        placeholder="Select"
        options={options}
      />
    )
    
    const trigger = screen.getByRole('button')
    await user.click(trigger)
    
    const option = screen.getByText('Option 1')
    await user.click(option)
    
    // After selection, dropdown should close
    expect(screen.queryByText('Option 2')).not.toBeInTheDocument()
  })

  it('displays selected value', () => {
    render(
      <SimpleSelect
        value="opt2"
        onValueChange={() => {}}
        placeholder="Select"
        options={options}
      />
    )
    expect(screen.getByText('Option 2')).toBeInTheDocument()
  })
})

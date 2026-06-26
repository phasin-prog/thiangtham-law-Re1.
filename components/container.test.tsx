import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Container } from './container'
import React from 'react'

describe('Container Component', () => {
  it('renders children correctly', () => {
    render(<Container>Test Content</Container>)
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('applies default padding classes', () => {
    const { container } = render(<Container>Test</Container>)
    expect(container.firstChild).toHaveClass('mx-auto')
  })
})

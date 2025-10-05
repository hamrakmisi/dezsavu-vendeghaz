import type { Meta, StoryObj } from '@storybook/react'
import SearchBar from '../components/SearchBar'

const meta = {
  title: 'Components/SearchBar',
  component: SearchBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the search input'
    },
    buttonText: {
      control: 'text',
      description: 'Text displayed on the search button'
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'error', 'warning'],
      description: 'Button variant style'
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes'
    }
  },
  args: {
    onSearch: (query: string) => {
      console.log('Search query:', query)
    }
  },
} satisfies Meta<typeof SearchBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: "Keresés...",
    buttonText: "Keresés",
    variant: "primary"
  }
}

export const Success: Story = {
  args: {
    placeholder: "Keresés...",
    buttonText: "Keresés",
    variant: "success"
  }
}

export const Error: Story = {
  args: {
    placeholder: "Keresés...",
    buttonText: "Keresés",
    variant: "error"
  }
}

import type { Meta, StoryObj } from '@storybook/react'
import DatePicker from '../components/DatePicker'

const meta = {
  title: 'Components/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'date',
      description: 'Selected date value'
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the input'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the date picker is disabled'
    },
    minDate: {
      control: 'date',
      description: 'Minimum selectable date'
    },
    maxDate: {
      control: 'date',
      description: 'Maximum selectable date'
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes'
    }
  },
  args: {
    onChange: (date: Date | undefined) => {
      console.log('Selected date:', date)
    }
  },
} satisfies Meta<typeof DatePicker>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: "Válasszon dátumot..."
  }
}

export const WithValue: Story = {
  args: {
    value: new Date(),
    placeholder: "Válasszon dátumot..."
  }
}

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Letiltott dátumválasztó"
  }
}

export const WithMinMaxDate: Story = {
  args: {
    minDate: new Date(),
    maxDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    placeholder: "Válasszon dátumot (következő 30 nap)"
  }
}

export const CheckIn: Story = {
  args: {
    placeholder: "Bejelentkezés dátuma",
    minDate: new Date()
  }
}

export const CheckOut: Story = {
  args: {
    placeholder: "Kijelentkezés dátuma",
    minDate: new Date(Date.now() + 24 * 60 * 60 * 1000) // Tomorrow
  }
}

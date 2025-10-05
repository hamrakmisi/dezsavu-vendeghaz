import type { Meta, StoryObj } from '@storybook/react'
import DateRangePicker from '../components/DateRangePicker'

const meta = {
  title: 'Components/DateRangePicker',
  component: DateRangePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    checkInDate: {
      control: 'date',
      description: 'Check-in date value'
    },
    checkOutDate: {
      control: 'date',
      description: 'Check-out date value'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the date range picker is disabled'
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
    onCheckInChange: (date: Date | undefined) => {
      console.log('Check-in date:', date)
    },
    onCheckOutChange: (date: Date | undefined) => {
      console.log('Check-out date:', date)
    }
  },
} satisfies Meta<typeof DateRangePicker>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {}
}

export const WithValues: Story = {
  args: {
    checkInDate: new Date(),
    checkOutDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) // 3 days from now
  }
}

export const Disabled: Story = {
  args: {
    disabled: true
  }
}

export const WithMinMaxDate: Story = {
  args: {
    minDate: new Date(),
    maxDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) // 90 days from now
  }
}

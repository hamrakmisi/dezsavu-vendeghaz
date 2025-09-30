import type { Meta, StoryObj } from '@storybook/react'
import ImageCarousel from '../components/ImageCarousel'
import Button from '../components/Button'
import React from 'react'

const meta = {
  title: 'Components/ImageCarousel',
  component: ImageCarousel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    images: {
      control: 'object',
      description: 'Array of image URLs to display in the carousel'
    },
    interval: {
      control: 'number',
      description: 'Time in milliseconds between automatic transitions'
    },
    height: {
      control: 'text',
      description: 'Tailwind CSS height class for the carousel'
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes'
    }
  },
  args: {},
} satisfies Meta<typeof ImageCarousel>

export default meta
type Story = StoryObj<typeof meta>

// Sample images for the stories
const sampleImages = [
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1520637836862-4d197d17c50a?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop'
]

export const Default: Story = {
  args: {
    images: sampleImages,
    interval: 5000,
    height: 'h-96'
  }
}

export const WithOverlay: Story = {
  args: {
    images: sampleImages,
    interval: 5000,
    height: 'h-96',
    children: React.createElement('div', {
      className: 'bg-black/50 text-white p-8 rounded-lg text-center backdrop-blur-sm'
    }, [
      React.createElement('h2', {
        key: 'title',
        className: 'text-3xl font-bold mb-4'
      }, 'Dézsavű Vendégház'),
      React.createElement('p', {
        key: 'subtitle',
        className: 'text-lg mb-6'
      }, 'Pihenjen nálunk a természet ölelésében'),
      React.createElement(Button, {
        key: 'button',
        text: 'Foglalás',
        variant: 'primary',
        className: 'uppercase font-bold'
      })
    ])
  }
}

export const EmptyCarousel: Story = {
  args: {
    images: [],
    interval: 5000,
    height: 'h-96'
  }
}

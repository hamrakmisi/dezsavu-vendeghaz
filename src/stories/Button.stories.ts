import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import Button from '../components/Button';

const meta = {
  title: 'Example/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        text: 'Button',
        variant: 'primary',
        onClick: fn(),
    },
};

export const Secondary: Story = {
    args: {
        text: 'Button',
        variant: 'secondary',
        onClick: fn(),
    },
};

export const Success: Story = {
    args: {
        text: 'Button',
        variant: 'success',
        onClick: fn(),
    },
};

export const Error: Story = {
    args: {
        text: 'Button',
        variant: 'error',
        onClick: fn(),
    },
};

export const Warning: Story = {
    args: {
        text: 'Button',
        variant: 'warning',
        onClick: fn(),
    },
};

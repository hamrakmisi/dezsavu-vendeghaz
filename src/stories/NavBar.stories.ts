import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import NavBar from '../components/NavBar';

const meta = {
  title: 'Example/NavBar',
  component: NavBar,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'grey',
      values: [
        { name: 'grey', value: '#808080' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof NavBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

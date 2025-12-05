import type { Meta, StoryObj } from '@storybook/react';
import { Progress } from '../src/atoms/Progress';

const meta = {
  title: 'Atoms/Progress',
  component: Progress,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 50,
  },
};

export const Empty: Story = {
  args: {
    value: 0,
  },
};

export const Complete: Story = {
  args: {
    value: 100,
  },
};

export const Quarter: Story = {
  args: {
    value: 25,
  },
};

export const ThreeQuarters: Story = {
  args: {
    value: 75,
  },
};

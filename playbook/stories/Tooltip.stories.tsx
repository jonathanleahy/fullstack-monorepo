import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from '../src/molecules/Tooltip';
import { Button } from '../src/atoms/Button';

const meta = {
  title: 'Molecules/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: 'This is a tooltip',
    children: <Button>Hover me</Button>,
  },
};

export const TopPosition: Story = {
  args: {
    content: 'Tooltip on top',
    side: 'top',
    children: <Button variant="outline">Top</Button>,
  },
};

export const RightPosition: Story = {
  args: {
    content: 'Tooltip on right',
    side: 'right',
    children: <Button variant="outline">Right</Button>,
  },
};

export const BottomPosition: Story = {
  args: {
    content: 'Tooltip on bottom',
    side: 'bottom',
    children: <Button variant="outline">Bottom</Button>,
  },
};

export const LeftPosition: Story = {
  args: {
    content: 'Tooltip on left',
    side: 'left',
    children: <Button variant="outline">Left</Button>,
  },
};

export const LongContent: Story = {
  args: {
    content: 'This is a tooltip with longer content to show how it wraps',
    children: <Button variant="secondary">Long tooltip</Button>,
  },
};

export const OnIcon: Story = {
  render: () => (
    <Tooltip content="More information">
      <button className="p-2 rounded-full hover:bg-accent">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>
    </Tooltip>
  ),
};

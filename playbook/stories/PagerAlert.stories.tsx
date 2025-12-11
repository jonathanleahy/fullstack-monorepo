import type { Meta, StoryObj } from '@storybook/react';
import { PagerAlert } from '../src/content-blocks/PagerAlert';

const meta: Meta<typeof PagerAlert> = {
  title: 'Content Blocks/PagerAlert',
  component: PagerAlert,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'light',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['critical', 'warning', 'info', 'success'],
      description: 'The visual style of the alert',
    },
    content: {
      control: 'text',
      description: 'The alert message (first line is title, rest is body)',
    },
    time: {
      control: 'text',
      description: 'Optional timestamp',
    },
    source: {
      control: 'text',
      description: 'Alert source/app name',
    },
  },
};

export default meta;
type Story = StoryObj<typeof PagerAlert>;

export const Critical: Story = {
  args: {
    variant: 'critical',
    time: '2:47 AM',
    source: 'PagerDuty',
    content: `CRITICAL: Duplicate notifications detected
847 users received the same vaccination reminder twice. Service: pettracker-notifications`,
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    time: '3:15 PM',
    source: 'CloudWatch',
    content: `High CPU Usage Warning
Instance i-0abc123 is at 85% CPU utilization for the last 15 minutes.`,
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    time: 'Just now',
    source: 'AWS',
    content: `Deployment Complete
Your Lambda function pettracker-api has been deployed successfully.`,
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    time: '9:00 AM',
    source: 'CI/CD',
    content: `Build Passed
All 127 tests passed. Coverage: 94.2%`,
  },
};

export const NoBody: Story = {
  name: 'Title Only',
  args: {
    variant: 'critical',
    time: '11:30 PM',
    source: 'Alert',
    content: 'Database connection timeout - check RDS instance',
  },
};

export const LongMessage: Story = {
  args: {
    variant: 'warning',
    time: '4:22 AM',
    source: 'Monitor',
    content: `Memory Usage Approaching Limit
Current usage: 7.2GB of 8GB (90%). Consider scaling up or optimizing memory usage to prevent OOM errors.`,
  },
};

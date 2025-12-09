import type { Meta, StoryObj } from '@storybook/react';
import { CheckList } from '../src/content-blocks/CheckList';

const meta = {
  title: 'Content Blocks/CheckList',
  component: CheckList,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '600px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CheckList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: `✓ AWS CLI installed and configured
✓ IAM user created with appropriate permissions
✓ MFA enabled on root account
✓ Billing alerts configured`,
  },
};

export const WithTitle: Story = {
  args: {
    title: 'Pre-deployment Checklist',
    content: `✓ All tests passing
✓ Environment variables configured
✓ Database migrations ready
✓ Rollback plan documented`,
  },
};

export const LearningObjectives: Story = {
  args: {
    title: 'What You Will Learn',
    content: `✓ Understand AWS global infrastructure
✓ Set up the AWS CLI and SDKs
✓ Create and manage IAM users and roles
✓ Configure billing alerts and budgets`,
  },
};

export const CompletedTasks: Story = {
  args: {
    title: 'Completed',
    content: `- Created VPC with public and private subnets
- Launched EC2 instance in private subnet
- Configured NAT Gateway for outbound traffic
- Set up Security Groups with least privilege`,
  },
};

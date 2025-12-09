import type { Meta, StoryObj } from '@storybook/react';
import { MistakeList } from '../src/content-blocks/MistakeList';

const meta = {
  title: 'Content Blocks/MistakeList',
  component: MistakeList,
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
} satisfies Meta<typeof MistakeList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: `✗ Launched in us-east-1 (didn't know there were other regions)
✗ Used the default VPC (didn't know what a VPC was)
✗ Left SSH open to 0.0.0.0/0 (security risk!)
✗ Chose a t2.micro (correct, but by accident)`,
  },
};

export const WithTitle: Story = {
  args: {
    title: 'Common Beginner Mistakes',
    content: `✗ Hardcoding credentials in source code
✗ Not setting up billing alerts
✗ Using root account for daily work
✗ Ignoring the principle of least privilege`,
  },
};

export const SecurityMistakes: Story = {
  args: {
    title: 'Security Anti-Patterns',
    content: `- Storing secrets in environment variables without encryption
- Using wildcard (*) in IAM policies
- Not enabling MFA on the root account
- Leaving S3 buckets public by default`,
  },
};

export const SingleItem: Story = {
  args: {
    content: `✗ Forgot to add .env to .gitignore`,
  },
};

import type { Meta, StoryObj } from '@storybook/react';
import { Callout } from '../src/content-blocks/Callout';

const meta = {
  title: 'Content Blocks/Callout',
  component: Callout,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'warning', 'tip', 'danger'],
    },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '600px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Callout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {
  args: {
    variant: 'info',
    content: 'AWS Free Tier includes 750 hours of t2.micro or t3.micro instances per month for the first 12 months.',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    content: 'Running instances outside the Free Tier will incur charges. Always check your billing dashboard.',
  },
};

export const Tip: Story = {
  args: {
    variant: 'tip',
    content: 'Use AWS CloudShell for quick CLI access without installing anything locally. It comes pre-configured with your credentials.',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    content: 'Never commit AWS credentials to source control. Use environment variables or AWS Secrets Manager instead.',
  },
};

export const CustomTitle: Story = {
  args: {
    variant: 'info',
    title: 'Did You Know?',
    content: 'AWS has over 30 regions worldwide, with more being added regularly. Each region has multiple Availability Zones for high availability.',
  },
};

export const MultilineContent: Story = {
  args: {
    variant: 'warning',
    title: 'Before You Continue',
    content: `Make sure you have completed the following steps:

1. Created an AWS account
2. Set up IAM user with programmatic access
3. Installed the AWS CLI on your machine`,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Callout
        variant="info"
        content="This is an informational message with helpful context."
      />
      <Callout
        variant="tip"
        content="This is a helpful tip to improve your workflow."
      />
      <Callout
        variant="warning"
        content="This is a warning about something you should be careful about."
      />
      <Callout
        variant="danger"
        content="This is a critical warning about a potential problem."
      />
    </div>
  ),
};

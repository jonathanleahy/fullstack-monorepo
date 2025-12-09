import type { Meta, StoryObj } from '@storybook/react';
import { TerminalBlock } from '../src/content-blocks/TerminalBlock';

const meta = {
  title: 'Content Blocks/TerminalBlock',
  component: TerminalBlock,
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
} satisfies Meta<typeof TerminalBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: `$ npm install aws-sdk
added 45 packages in 2.3s

$ aws --version
aws-cli/2.13.0 Python/3.11.4`,
  },
};

export const WithTitle: Story = {
  args: {
    title: 'AWS CLI Setup',
    content: `$ aws configure
AWS Access Key ID [None]: AKIA****************
AWS Secret Access Key [None]: ****
Default region name [None]: us-east-1
Default output format [None]: json`,
  },
};

export const WithComments: Story = {
  args: {
    title: 'Installation',
    content: `# Install the AWS CLI
$ curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
$ unzip awscliv2.zip
$ sudo ./aws/install

# Verify installation
$ aws --version
aws-cli/2.13.0 Python/3.11.4`,
  },
};

export const CommandOutput: Story = {
  args: {
    title: 'Docker Build',
    content: `$ docker build -t myapp .
Sending build context to Docker daemon  2.048kB
Step 1/5 : FROM node:18-alpine
 ---> a283f62cb84b
Step 2/5 : WORKDIR /app
 ---> Running in 8f3c1b2e9a4d
 ---> e7b9f2a1c3d5
Step 3/5 : COPY package*.json ./
 ---> 4a2b3c4d5e6f
Successfully built 4a2b3c4d5e6f
Successfully tagged myapp:latest`,
  },
};

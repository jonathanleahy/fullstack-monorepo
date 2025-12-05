import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { TagInput } from '../src/atoms/TagInput';

const meta = {
  title: 'Atoms/TagInput',
  component: TagInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '350px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TagInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive wrapper to handle state
function TagInputWrapper({
  initialTags = [],
  suggestions = [],
  placeholder
}: {
  initialTags?: string[];
  suggestions?: string[];
  placeholder?: string;
}) {
  const [tags, setTags] = useState(initialTags);
  return (
    <TagInput
      tags={tags}
      onChange={setTags}
      suggestions={suggestions}
      placeholder={placeholder}
    />
  );
}

export const Default: Story = {
  render: () => <TagInputWrapper />,
};

export const WithInitialTags: Story = {
  render: () => <TagInputWrapper initialTags={['react', 'typescript', 'tailwind']} />,
};

export const WithSuggestions: Story = {
  render: () => (
    <TagInputWrapper
      suggestions={['javascript', 'typescript', 'react', 'vue', 'angular', 'svelte', 'nextjs', 'remix']}
      placeholder="Type to see suggestions..."
    />
  ),
};

export const WithTagsAndSuggestions: Story = {
  render: () => (
    <TagInputWrapper
      initialTags={['react', 'nextjs']}
      suggestions={['javascript', 'typescript', 'react', 'vue', 'angular', 'svelte', 'nextjs', 'remix']}
    />
  ),
};

export const CustomPlaceholder: Story = {
  render: () => <TagInputWrapper placeholder="Add skills..." />,
};

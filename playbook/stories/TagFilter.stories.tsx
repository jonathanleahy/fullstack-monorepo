import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { TagFilter } from '../src/molecules/TagFilter';

const meta = {
  title: 'Molecules/TagFilter',
  component: TagFilter,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TagFilter>;

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive wrapper to handle state
function TagFilterWrapper({
  availableTags,
  initialSelected = []
}: {
  availableTags: string[];
  initialSelected?: string[];
}) {
  const [selectedTags, setSelectedTags] = useState(initialSelected);
  return (
    <TagFilter
      availableTags={availableTags}
      selectedTags={selectedTags}
      onChange={setSelectedTags}
    />
  );
}

export const Default: Story = {
  render: () => (
    <TagFilterWrapper
      availableTags={['javascript', 'typescript', 'react', 'vue', 'angular']}
    />
  ),
};

export const WithSelectedTags: Story = {
  render: () => (
    <TagFilterWrapper
      availableTags={['javascript', 'typescript', 'react', 'vue', 'angular']}
      initialSelected={['react', 'typescript']}
    />
  ),
};

export const ManyTags: Story = {
  render: () => (
    <TagFilterWrapper
      availableTags={[
        'javascript', 'typescript', 'react', 'vue', 'angular',
        'svelte', 'nextjs', 'remix', 'nodejs', 'express',
        'graphql', 'rest', 'api', 'testing', 'devops'
      ]}
      initialSelected={['react', 'typescript', 'graphql']}
    />
  ),
};

export const SingleTag: Story = {
  render: () => (
    <TagFilterWrapper
      availableTags={['featured']}
    />
  ),
};

export const AllSelected: Story = {
  render: () => (
    <TagFilterWrapper
      availableTags={['beginner', 'intermediate', 'advanced']}
      initialSelected={['beginner', 'intermediate', 'advanced']}
    />
  ),
};

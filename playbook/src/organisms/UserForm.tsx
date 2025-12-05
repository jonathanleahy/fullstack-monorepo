import * as React from 'react';
import { Button } from '../atoms/Button';
import { FormField } from '../molecules/FormField';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../molecules/Card';

export interface UserFormProps {
  onSubmit: (data: { name: string; email: string; password: string }) => void;
  isLoading?: boolean;
  title?: string;
}

export function UserForm({ onSubmit, isLoading = false, title = 'Create User' }: UserFormProps) {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <FormField
            label="Name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <FormField
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <FormField
            label="Password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
            minLength={8}
            hint="Minimum 8 characters"
          />
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Creating...' : 'Create User'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

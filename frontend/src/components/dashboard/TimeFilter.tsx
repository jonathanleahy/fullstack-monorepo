import { useState } from 'react';
import { Button } from '@repo/playbook';

export type TimeRange = 'all' | '7d' | '30d' | '90d' | 'custom';

interface TimeFilterProps {
  value: TimeRange;
  onChange: (range: TimeRange, fromDate?: string, toDate?: string) => void;
  customFromDate?: string;
  customToDate?: string;
}

export function TimeFilter({ value, onChange, customFromDate, customToDate }: TimeFilterProps) {
  const [showCustom, setShowCustom] = useState(value === 'custom');
  const [fromDate, setFromDate] = useState(customFromDate || '');
  const [toDate, setToDate] = useState(customToDate || '');

  const handleRangeClick = (range: TimeRange) => {
    if (range === 'custom') {
      setShowCustom(true);
      return;
    }
    setShowCustom(false);

    const today = new Date();
    let from: Date | undefined;

    switch (range) {
      case '7d':
        from = new Date(today);
        from.setDate(from.getDate() - 7);
        break;
      case '30d':
        from = new Date(today);
        from.setDate(from.getDate() - 30);
        break;
      case '90d':
        from = new Date(today);
        from.setDate(from.getDate() - 90);
        break;
      case 'all':
      default:
        onChange('all');
        return;
    }

    onChange(range, formatDate(from), formatDate(today));
  };

  const handleCustomApply = () => {
    if (fromDate || toDate) {
      onChange('custom', fromDate || undefined, toDate || undefined);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm text-muted-foreground">Time period:</span>
      <div className="flex gap-1">
        <Button
          variant={value === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleRangeClick('all')}
        >
          All time
        </Button>
        <Button
          variant={value === '7d' ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleRangeClick('7d')}
        >
          7 days
        </Button>
        <Button
          variant={value === '30d' ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleRangeClick('30d')}
        >
          30 days
        </Button>
        <Button
          variant={value === '90d' ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleRangeClick('90d')}
        >
          90 days
        </Button>
        <Button
          variant={value === 'custom' || showCustom ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleRangeClick('custom')}
        >
          Custom
        </Button>
      </div>

      {showCustom && (
        <div className="flex items-center gap-2 mt-2 sm:mt-0">
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="px-2 py-1 text-sm border rounded-md bg-background"
            placeholder="From"
          />
          <span className="text-muted-foreground">to</span>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="px-2 py-1 text-sm border rounded-md bg-background"
            placeholder="To"
          />
          <Button size="sm" onClick={handleCustomApply}>
            Apply
          </Button>
        </div>
      )}
    </div>
  );
}

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

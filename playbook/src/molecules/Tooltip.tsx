import * as React from 'react';
import { cn } from '../lib/utils';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
}

const Tooltip: React.FC<TooltipProps> = ({ content, children, side = 'top' }) => {
  const [show, setShow] = React.useState(false);

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onFocus={() => setShow(true)}
        onBlur={() => setShow(false)}
      >
        {children}
      </div>
      {show && (
        <div
          className={cn(
            'absolute z-50 px-3 py-1.5 text-xs bg-primary text-primary-foreground rounded-md shadow-md whitespace-nowrap animate-in fade-in-0 zoom-in-95',
            positionClasses[side]
          )}
          role="tooltip"
        >
          {content}
        </div>
      )}
    </div>
  );
};

export { Tooltip };
export type { TooltipProps };

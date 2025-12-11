import { ReactNode } from 'react';

type FloatDirection = 'left' | 'right';
type DiagramSize = 'small' | 'medium' | 'large';

interface FloatingDiagramProps {
  children: ReactNode;
  diagram: ReactNode;
  float?: FloatDirection;
  size?: DiagramSize;
}

const sizeConfig: Record<DiagramSize, string> = {
  small: 'w-64',
  medium: 'w-80',
  large: 'w-96',
};

export function FloatingDiagram({
  children,
  diagram,
  float = 'right',
  size = 'medium',
}: FloatingDiagramProps) {
  const width = sizeConfig[size];
  const floatClass = float === 'left' ? 'float-left mr-6' : 'float-right ml-6';

  return (
    <div className="my-6 overflow-hidden">
      <div className={`${floatClass} ${width} mb-4`}>
        {diagram}
      </div>
      <div className="prose prose-slate dark:prose-invert">
        {children}
      </div>
      <div className="clear-both" />
    </div>
  );
}

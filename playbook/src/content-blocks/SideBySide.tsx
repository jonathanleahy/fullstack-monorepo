import { ReactNode } from 'react';

type DiagramPosition = 'left' | 'right';
type DiagramSize = 'small' | 'medium' | 'large';

interface SideBySideProps {
  children: ReactNode;
  diagram: ReactNode;
  position?: DiagramPosition;
  size?: DiagramSize;
}

const sizeConfig: Record<DiagramSize, string> = {
  small: 'w-1/3',
  medium: 'w-1/2',
  large: 'w-2/3',
};

export function SideBySide({
  children,
  diagram,
  position = 'right',
  size = 'medium',
}: SideBySideProps) {
  const diagramWidth = sizeConfig[size];

  const diagramElement = (
    <div className={`${diagramWidth} flex-shrink-0`}>
      <div className="sticky top-4">
        {diagram}
      </div>
    </div>
  );

  const textElement = (
    <div className="flex-1 min-w-0">
      {children}
    </div>
  );

  return (
    <div className="my-6 flex gap-6 items-start">
      {position === 'left' ? (
        <>
          {diagramElement}
          {textElement}
        </>
      ) : (
        <>
          {textElement}
          {diagramElement}
        </>
      )}
    </div>
  );
}

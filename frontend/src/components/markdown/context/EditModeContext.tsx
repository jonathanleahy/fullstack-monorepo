/**
 * Edit Mode Context - Provides edit mode state and callbacks to nested components
 */

import { createContext, useContext } from 'react';

export interface EditModeContextType {
  editMode: boolean;
  onDiagramLayoutChange?: (diagramCode: string, newMarkdown: string) => void;
  onMoveDiagram?: (diagramCode: string, direction: 'up' | 'down') => void;
  canMoveDiagram?: (diagramCode: string, direction: 'up' | 'down') => boolean;
}

export const EditModeContext = createContext<EditModeContextType>({ editMode: false });

export function useEditMode() {
  return useContext(EditModeContext);
}

export function EditModeProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: EditModeContextType;
}) {
  return (
    <EditModeContext.Provider value={value}>
      {children}
    </EditModeContext.Provider>
  );
}

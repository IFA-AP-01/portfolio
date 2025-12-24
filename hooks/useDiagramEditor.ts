import { useState, useCallback, useMemo, useEffect } from 'react';
import { DiagramElement, DiagramEditorState, ElementType, ConnectorType, SavedDiagram } from '@/lib/types';
import { useHistory } from './useHistory';

const generateId = () => {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.randomUUID) {
    return window.crypto.randomUUID();
  }
  return Math.random().toString(36).substring(2, 9);
};

const INITIAL_STATE: DiagramEditorState = {
  elements: [],
  selectedIds: [],
  activeTool: 'select',
  activeConnectorType: 'straight',
  zoom: 1,
  pan: { x: 0, y: 0 },
};

export const useDiagramEditor = () => {
  const { 
    state: elements, 
    set: setElements, 
    undo, 
    redo, 
    canUndo, 
    canRedo,
    resetHistory
  } = useHistory<DiagramElement[]>([]);

  const [uiState, setUiState] = useState<Omit<DiagramEditorState, 'elements'>>({
    selectedIds: [],
    activeTool: 'select',
    activeConnectorType: 'straight',
    zoom: 1,
    pan: { x: 0, y: 0 },
  });

  const [history, setHistory] = useState<SavedDiagram[]>([]);
  const [currentId, setCurrentId] = useState<string | null>(null);

  const AUTOSAVE_KEY = 'diagram_autosave';
  const HISTORY_KEY = 'diagram_history';
  const CURRENT_ID_KEY = 'diagram_current_id';

  // Load persistence
  useEffect(() => {
    // Load history
    try {
      const savedHistory = localStorage.getItem(HISTORY_KEY);
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }
    } catch (e) {
      console.error('Failed to load history', e);
    }

    // Load last session
    try {
      const savedSession = localStorage.getItem(AUTOSAVE_KEY);
      if (savedSession) {
        const parsed = JSON.parse(savedSession);
        // Load elements into history
        if (parsed.elements) {
            resetHistory(parsed.elements);
        }
        
        // Load UI state
        setUiState(prev => ({
          ...prev,
          zoom: parsed.zoom ?? 1,
          pan: parsed.pan ?? { x: 0, y: 0 },
          activeConnectorType: parsed.activeConnectorType ?? 'straight',
          activeTool: 'select',
          selectedIds: [],
        }));
      }
      
      const savedCurrentId = localStorage.getItem(CURRENT_ID_KEY);
      if (savedCurrentId) {
          setCurrentId(savedCurrentId);
      }
    } catch (e) {
      console.error('Failed to load session', e);
    }
  }, [resetHistory]);

  const generateName = useCallback((elems: DiagramElement[]) => {
      // Find first text-containing element, prioritized by y position (top-most) then x position
      const textElements = elems
          .filter(e => e.text && e.text.trim().length > 0 && e.text !== 'New Text')
          .sort((a, b) => {
              if (Math.abs(a.y - b.y) > 10) return a.y - b.y;
              return a.x - b.x;
          });
      
      if (textElements.length > 0) {
          return textElements[0].text.substring(0, 30);
      }
      
      return `Untitled - ${new Date().toLocaleString()}`;
  }, []);

  // Auto-save
  useEffect(() => {
    const timeout = setTimeout(() => {
      // 1. Save current session state (autosave for crash recovery)
      const dataToSave = {
        elements: elements,
        zoom: uiState.zoom,
        pan: uiState.pan,
        activeConnectorType: uiState.activeConnectorType, 
      };
      localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(dataToSave));

      // 2. Save to history list
      if (elements.length > 0) {
          const name = generateName(elements);
          const now = Date.now();

          setHistory(prev => {
              let newHistory;
              // If we have a current ID and it exists in history, update it
              if (currentId && prev.some(h => h.id === currentId)) {
                  newHistory = prev.map(h => {
                      if (h.id === currentId) {
                          // Only update if changed significantly? For now update on every autosave debounce
                          // Only update name if it was auto-generated or if user wants dynamic names?
                          // User said: "name will get from content of first element" implies dynamic renaming.
                          return {
                              ...h,
                              name: name.startsWith('Untitled -') ? name : h.name === name ? h.name : name, // Smart renaming logic
                              lastModified: now,
                              data: {
                                  elements: elements,
                                  zoom: uiState.zoom,
                                  pan: uiState.pan,
                                  // Don't carry over selection
                                  selectedIds: [],
                                  activeTool: 'select' as const,
                                  activeConnectorType: uiState.activeConnectorType, 
                              }
                          };
                      }
                      return h;
                  });
              } else {
                  // Create new entry
                  const newEntryId = generateId();
                  const newEntry: SavedDiagram = {
                      id: newEntryId,
                      name: name,
                      lastModified: now,
                      data: {
                          elements: elements,
                          zoom: uiState.zoom,
                          pan: uiState.pan,
                          selectedIds: [],
                          activeTool: 'select' as const,
                          activeConnectorType: uiState.activeConnectorType,
                      }
                  };
                  newHistory = [newEntry, ...prev];
                  setCurrentId(newEntryId);
                  localStorage.setItem(CURRENT_ID_KEY, newEntryId);
              }
              
              localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
              return newHistory;
          });
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [elements, uiState, currentId, generateName]);

  // No need for separate setElements here as we have it from useHistory
  // But for compatibility if needed, or if we want to augment it, 
  // We can just use the destructured setElements directly in code.
  // Actually, we exposed setElements from hook, so we can use it.
  
  const selectedIds = useMemo(() => uiState.selectedIds, [uiState.selectedIds]);
  const activeTool = useMemo(() => uiState.activeTool, [uiState.activeTool]);
  const activeConnectorType = useMemo(() => uiState.activeConnectorType, [uiState.activeConnectorType]);

  const setSelectedIds = useCallback((ids: string[]) => {
    setUiState((prev) => {
      if (prev.selectedIds.length === ids.length && prev.selectedIds.every((id, i) => id === ids[i])) {
        return prev;
      }
      return { ...prev, selectedIds: ids };
    });
  }, []);

  const setActiveTool = useCallback((tool: DiagramEditorState['activeTool']) => {
    setUiState((prev) => ({ ...prev, activeTool: tool }));
  }, []);

  const setConnectorType = useCallback((type: ConnectorType) => {
    setUiState((prev) => ({ ...prev, activeConnectorType: type }));
  }, []);

  const addElement = useCallback((type: ElementType, x: number, y: number, initialProps?: Partial<DiagramElement>) => {
    const id = generateId();
    const newElement: DiagramElement = {
      id,
      type,
      x,
      y,
      width: type === 'text' ? 100 : 120,
      height: type === 'text' ? 30 : 80,
      rotation: 0,
      text: type === 'text' ? 'New Text' : '',
      fill: type === 'connector' ? 'transparent' : '#ffffff',
      stroke: 2,
      strokeColor: '#000000',
      textColor: '#000000',
      fontSize: 14,
      fontWeight: 'normal',
      ...initialProps,
      connectorType: type === 'connector' ? uiState.activeConnectorType : undefined,
    };

    setElements([...elements, newElement]);
    
    setUiState((prev) => ({
      ...prev,
      selectedIds: [newElement.id],
      activeTool: 'select',
    }));
    
    return id;
  }, [elements, uiState.activeConnectorType, setElements]);

  const updateElement = useCallback((id: string, updates: Partial<DiagramElement>) => {
    setElements(elements.map((el) => (el.id === id ? { ...el, ...updates } : el)));
  }, [elements, setElements]);

  const deleteSelected = useCallback(() => {
    setElements(elements.filter((el) => !uiState.selectedIds.includes(el.id)));
    setUiState(prev => ({ ...prev, selectedIds: [] }));
  }, [elements, uiState.selectedIds, setElements]);

  const setPan = useCallback((newPan: { x: number; y: number }) => {
    setUiState((prev) => ({ ...prev, pan: newPan }));
  }, []);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      const delta = -e.deltaY * 0.001;
      setUiState((prev) => ({
        ...prev,
        zoom: Math.min(Math.max(prev.zoom + delta, 0.1), 5.0),
      }));
    } else {
      setUiState((prev) => ({
        ...prev,
        pan: {
          x: prev.pan.x - e.deltaX,
          y: prev.pan.y - e.deltaY,
        },
      }));
    }
  }, []);

  const saveToHistory = useCallback((name: string = 'Untitled Diagram') => {
    // This is now predominantly handled by auto-save, but can double as "Save A Copy"
    const newEntryId = generateId();
    const newEntry: SavedDiagram = {
      id: newEntryId,
      name,
      lastModified: Date.now(),
      data: {
        elements,
        zoom: uiState.zoom,
        pan: uiState.pan,
        selectedIds: [], 
        activeTool: 'select',
        activeConnectorType: uiState.activeConnectorType
      }
    };
    
    setHistory(prev => {
      const newHistory = [newEntry, ...prev];
      localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
      return newHistory;
    });
    
    // Switch context to the new copy? 
    setCurrentId(newEntryId);
    localStorage.setItem(CURRENT_ID_KEY, newEntryId);
  }, [elements, uiState]); 

  const loadDiagram = useCallback((diagram: SavedDiagram) => {
    resetHistory(diagram.data.elements);
    
    setUiState(prev => ({
      ...prev,
      zoom: diagram.data.zoom || 1,
      pan: diagram.data.pan || { x: 0, y: 0 },
      activeTool: 'select',
      selectedIds: []
    }));
    
    setCurrentId(diagram.id);
    localStorage.setItem(CURRENT_ID_KEY, diagram.id);
  }, [resetHistory]);

  const deleteFromHistory = useCallback((id: string) => {
    setHistory(prev => {
      const newHistory = prev.filter(h => h.id !== id);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
      return newHistory;
    });
    if (currentId === id) {
        setCurrentId(null);
        localStorage.removeItem(CURRENT_ID_KEY);
    }
  }, [currentId]);

  const createNew = useCallback(() => {
    resetHistory([]);
    setUiState(prev => ({
        ...prev,
        activeTool: 'select',
        selectedIds: [],
        pan: {x: 0, y: 0},
        zoom: 1
    }));
    setCurrentId(null);
    localStorage.removeItem(CURRENT_ID_KEY);
  }, [resetHistory]);

  return {
    // Map UI state to match expected interface + add history
    elements,
    selectedIds,
    activeTool,
    zoom: uiState.zoom,
    pan: uiState.pan,
    setElements,
    setSelectedIds,
    setActiveTool,
    addElement,
    updateElement,
    deleteSelected,
    handleWheel,
    setPan,
    activeConnectorType,
    setConnectorType,
    // History & Persistence
    history,
    saveToHistory,
    loadDiagram,
    deleteFromHistory,
    createNew,
    undo,
    redo,
    canUndo,
    canRedo
  };
};

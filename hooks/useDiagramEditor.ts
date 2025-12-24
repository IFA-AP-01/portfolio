import { useState, useCallback, useMemo, useEffect } from 'react';
import { DiagramElement, DiagramEditorState, ElementType, ConnectorType, SavedDiagram } from '@/lib/types';

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
  const [state, setState] = useState<DiagramEditorState>(INITIAL_STATE);
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
        setState(prev => ({
          ...prev,
          ...parsed,
          // Reset transient states
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
  }, []);

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
        elements: state.elements,
        zoom: state.zoom,
        pan: state.pan,
        activeConnectorType: state.activeConnectorType, 
      };
      localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(dataToSave));

      // 2. Save to history list
      if (state.elements.length > 0) {
          const name = generateName(state.elements);
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
                                  elements: state.elements,
                                  zoom: state.zoom,
                                  pan: state.pan,
                                  // Don't carry over selection
                                  selectedIds: [],
                                  activeTool: 'select' as const,
                                  activeConnectorType: state.activeConnectorType, 
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
                          elements: state.elements,
                          zoom: state.zoom,
                          pan: state.pan,
                          selectedIds: [],
                          activeTool: 'select' as const,
                          activeConnectorType: state.activeConnectorType,
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
  }, [state.elements, state.zoom, state.pan, state.activeConnectorType, currentId, generateName]);

  const elements = useMemo(() => state.elements, [state.elements]);
  const selectedIds = useMemo(() => state.selectedIds, [state.selectedIds]);
  const activeTool = useMemo(() => state.activeTool, [state.activeTool]);
  const activeConnectorType = useMemo(() => state.activeConnectorType, [state.activeConnectorType]);

  const setElements = useCallback((elements: DiagramElement[]) => {
    setState((prev) => ({ ...prev, elements }));
  }, []);

  const setSelectedIds = useCallback((ids: string[]) => {
    setState((prev) => {
      if (prev.selectedIds.length === ids.length && prev.selectedIds.every((id, i) => id === ids[i])) {
        return prev;
      }
      return { ...prev, selectedIds: ids };
    });
  }, []);

  const setActiveTool = useCallback((tool: DiagramEditorState['activeTool']) => {
    setState((prev) => ({ ...prev, activeTool: tool }));
  }, []);

  const setConnectorType = useCallback((type: ConnectorType) => {
    setState((prev) => ({ ...prev, activeConnectorType: type }));
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
      connectorType: type === 'connector' ? state.activeConnectorType : undefined,
    };

    setState((prev) => ({
      ...prev,
      elements: [...prev.elements, newElement],
      selectedIds: [newElement.id],
      activeTool: 'select',
    }));
    
    return id;
  }, [state.activeConnectorType]);

  const updateElement = useCallback((id: string, updates: Partial<DiagramElement>) => {
    setState((prev) => ({
      ...prev,
      elements: prev.elements.map((el) => (el.id === id ? { ...el, ...updates } : el)),
    }));
  }, []);

  const deleteSelected = useCallback(() => {
    setState((prev) => ({
      ...prev,
      elements: prev.elements.filter((el) => !prev.selectedIds.includes(el.id)),
      selectedIds: [],
    }));
  }, []);

  const setPan = useCallback((newPan: { x: number; y: number }) => {
    setState((prev) => ({ ...prev, pan: newPan }));
  }, []);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      const delta = -e.deltaY * 0.001;
      setState((prev) => ({
        ...prev,
        zoom: Math.min(Math.max(prev.zoom + delta, 0.1), 5.0),
      }));
    } else {
      setState((prev) => ({
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
        ...state,
        selectedIds: [], 
        activeTool: 'select'
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
  }, [state]); 

  const loadDiagram = useCallback((diagram: SavedDiagram) => {
    // Save current state before switching? (Auto-save handles it)
    setState(prev => ({
      ...prev,
      elements: diagram.data.elements,
      zoom: diagram.data.zoom || 1,
      pan: diagram.data.pan || { x: 0, y: 0 },
      activeTool: 'select',
      selectedIds: []
    }));
    setCurrentId(diagram.id);
    localStorage.setItem(CURRENT_ID_KEY, diagram.id);
  }, []);

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
    setState({
        ...INITIAL_STATE,
        elements: [], 
    });
    setCurrentId(null);
    localStorage.removeItem(CURRENT_ID_KEY);
  }, []);

  return {
    elements,
    selectedIds,
    activeTool,
    zoom: state.zoom,
    pan: state.pan,
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
    createNew
  };
};

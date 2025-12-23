import { useState, useCallback, useMemo } from 'react';
import { DiagramElement, DiagramEditorState, ElementType, ConnectorType } from '@/lib/types';

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
      fill: type === 'connector' ? 'transparent' : '#ffffff', // Connectors transparent fill
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
      activeTool: 'select', // Switch back to select after adding
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
      // Zoom logic
      const delta = -e.deltaY * 0.001;
      setState((prev) => ({
        ...prev,
        zoom: Math.min(Math.max(prev.zoom + delta, 0.1), 5.0),
      }));
    } else {
      // Pan logic
      setState((prev) => ({
        ...prev,
        pan: {
          x: prev.pan.x - e.deltaX,
          y: prev.pan.y - e.deltaY,
        },
      }));
    }
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
  };
};

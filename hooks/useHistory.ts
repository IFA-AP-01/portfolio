import { useState, useCallback, useMemo } from 'react';

export function useHistory<T>(initialState: T) {
  const [state, setState] = useState<{
    history: T[];
    index: number;
  }>({
    history: [initialState],
    index: 0
  });

  const current = useMemo(() => state.history[state.index], [state.history, state.index]);

  const push = useCallback((newStateOrFn: T | ((prev: T) => T)) => {
    setState((prev) => {
      const currentItem = prev.history[prev.index];
      
      const newState = typeof newStateOrFn === 'function' 
        ? (newStateOrFn as (prev: T) => T)(currentItem)
        : newStateOrFn;

      // Simple equality check for primitives or references, JSON stringify for objects
      // Note: JSON.stringify is expensive for large objects, but safe for deep comparison
      if (JSON.stringify(currentItem) === JSON.stringify(newState)) {
        return prev;
      }

      const newHistory = prev.history.slice(0, prev.index + 1);
      newHistory.push(newState);
      return {
        history: newHistory,
        index: newHistory.length - 1
      };
    });
  }, []);

  const undo = useCallback(() => {
    setState((prev) => ({
      ...prev,
      index: Math.max(prev.index - 1, 0)
    }));
  }, []);

  const redo = useCallback(() => {
    setState((prev) => ({
      ...prev,
      index: Math.min(prev.index + 1, prev.history.length - 1)
    }));
  }, []);
  
  const canUndo = state.index > 0;
  const canRedo = state.index < state.history.length - 1;

  const resetHistory = useCallback((newState: T) => {
    setState({
      history: [newState],
      index: 0
    });
  }, []);

  // Expose history and index for debugging or advanced usage
  return {
    state: current,
    set: push,
    undo,
    redo,
    canUndo,
    canRedo,
    history: state.history,
    index: state.index,
    resetHistory
  };
}

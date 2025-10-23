import React, { useReducer, useMemo } from 'react';
import context from './context';
import reducer from './reducer';
import initial from './initial';

const { Provider } = context;

export default ({ setTaskId, reload, children }: any) => {
  const [state, dispatch] = useReducer(reducer, initial);
  const contextValue = useMemo(() => ({
    setTaskId,
    reload,
    state,
    dispatch,
  }), [
    setTaskId,
    reload,
    state,
  ])

  return (
    <Provider
      value={contextValue}
    >
      {children}
    </Provider>
  );
};

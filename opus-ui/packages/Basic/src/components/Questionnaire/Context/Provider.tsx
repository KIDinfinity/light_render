import React, { useReducer } from 'react';
import context from './context';
import reducer from './reducer';
import initial from './initial';

const { Provider } = context;

export default ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initial);
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

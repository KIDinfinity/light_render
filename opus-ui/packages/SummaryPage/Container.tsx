import type { ReactNode } from 'react';
import React from 'react';
import Context from './Context';
import createReducer from './reducers/create';

const { Provider } = Context;

interface IProps {
  children: ReactNode;
}

export default ({ children }: IProps) => {
  const [state, dispatch] = createReducer();

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

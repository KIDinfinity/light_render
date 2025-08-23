import React from 'react';
import Context from './Context';

const { Provider } = Context;

export default ({ children, namespace }: any) => {
  return <Provider value={{ namespace }}>{children}</Provider>;
};

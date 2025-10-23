import React from 'react';
import Context from './Context';

const { Provider } = Context;

export default ({ children, data }: any) => {
  return <Provider value={{ data }}>{children}</Provider>;
};

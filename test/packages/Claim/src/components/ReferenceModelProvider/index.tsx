import React from 'react';
import Context from './Context';

const { Provider } = Context;

export default ({ children, referenceModel }: any) => {
  return <Provider value={{ referenceModel }}>{children}</Provider>;
};

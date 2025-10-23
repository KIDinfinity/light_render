import React from 'react';
import Context from './Context';

const { Provider } = Context;

export default ({ children }: any) => {
  return (
    <Provider value={{ checking: true, editableOfSustainability: false }}>{children}</Provider>
  );
};

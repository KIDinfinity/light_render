import React, { useState } from 'react';
import context from './Context';

const { Provider } = context;

export default ({ displayName, children, ...values }: any) => {
  const [parentExpand, setParentExpand] = useState<boolean>(false);
  const [parentHasHidden, setParentHasHidden] = useState<boolean>(false);
  const [activeChild, setActiveChild] = useState<string[]>([]);

  return (
    <Provider
      value={{
        displayName,
        hasParentExpand: true,
        parentExpand,
        setParentExpand,
        parentHasHidden,
        setParentHasHidden,
        activeChild,
        setActiveChild,
        ...values,
      }}
    >
      {children}
    </Provider>
  );
};

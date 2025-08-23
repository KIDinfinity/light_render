import React, { useState } from 'react';
import LayoutContext from './LayoutContext';

export default ({ children }) => {
  const [headerVisiable, setHeaderVisiable] = useState(true);

  return (
    <LayoutContext.Provider
      value={{
        headerVisiable,
        setHeaderVisiable,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

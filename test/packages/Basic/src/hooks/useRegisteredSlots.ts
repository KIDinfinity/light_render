import React, { useMemo } from 'react';

export default ({ children }: any) => {
  return useMemo(() => {
    const childsMap = new Map();
    // console.log(children, 'children', lodash.isArray(children), React.isValidElement(children));
    React.Children.forEach(children, (child: any) => {
      const displayName = child?.type?.displayName;
      if (displayName) {
        childsMap.set(displayName, React.createElement('div', { 'data-id': displayName }, [child]));
      }
    });
    // if (lodash.isArray(children)) {
    // }
    return childsMap;
  }, [children]);
};

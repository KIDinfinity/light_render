import * as React from 'react';

export default (element: React.ReactNode, props: any) => {
  const cloneElement = (element: React.ReactNode, ...restArgs: any[]) => {
    if (!React.isValidElement(element)) return element;

    return React.cloneElement(element, { ...restArgs, ...props });
  };

  return React.Children.map(element, cloneElement);
};

import React from 'react';
import lodash from 'lodash';

export default function childrenWithProps(ele, props) {
  const clone = (item, i) => {
    if (item.$$typeof === Symbol.for('react.element')) {
      return React.cloneElement(item, {
        ...props,
        key: i,
      });
    }

    return item;
  };

  if (lodash.isArray(ele)) {
    return Object.values(ele).map(clone);
  }

  return React.Children.map(ele, clone);
}

import React from 'react';
import lodash from 'lodash';
import styles from './List.less';

export default ({ children, list, listLength }) => {
  const newChildren = lodash.filter(children, (item: any) => React.isValidElement(item));
  const rewriteChildren = React.Children.map(newChildren, (child) => ({
    ...child,
    props: {
      ...child.props,
      children: React.Children.map(child.props.children, (child1) => {
        const config = lodash.find(list, (item) => item.type === child1.props.type);
        return lodash.isPlainObject(config)
          ? React.cloneElement(child1, {
              typeCode: config.typeCode,
              dictCode: config.dictCode,
              sortNum: config.sortNum,
            })
          : child1;
      }),
    },
  }));

  return <div className={listLength > 2 ? styles.lists : styles.list}>{rewriteChildren}</div>;
};

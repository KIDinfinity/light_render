import React from 'react';
import lodash from 'lodash';
import styles from './TabList.less';

export default ({ children, list }: any) => {
  const rewriteChildren = React.Children.map(children, (child) => ({
    ...child,
    props: {
      ...child.props,
      children: React.Children.map(child.props.children, (child1) => {
        const config = lodash.find(list, (item) => item.type === child1.props.type);

        return lodash.isPlainObject(config)
          ? React.cloneElement(child1, {
              ...config,
            })
          : child1;
      }),
    },
  }));

  return <div className={styles.list}>{rewriteChildren}</div>;
};

import React from 'react';
import styles from './index.less';

export default ({ children, selected }: any) => {
  return (
    <div className={styles.container}>
      {React.Children.map(children, (child) => {
        if (child.type.displayName === selected) {
          return child;
        }
        return null;
      })}
    </div>
  );
};

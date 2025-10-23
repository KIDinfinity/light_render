import React from 'react';
import styles from './index.less';

const Layout = ({ children }: any) => {
  return (
    <div className={styles.container}>
      {React.Children.map(children, (child: any) => {
        if (!React.isValidElement(child)) {
          return null;
        }
        if (child?.type.displayName === 'sectionName') {
          return <div className={styles.sectionName}>{child}</div>;
        }
        if (child?.type.displayName === 'questions') {
          return <div className={styles.questions}>{child}</div>;
        }
      })}
    </div>
  );
};

export default Layout;

import React from 'react';
import styles from './index.less';

const Layout: React.FC = ({ children }: any) => {
  return (
    <div className={styles.container}>
      {React.Children.map(children, (child: any) => {
        if (!React.isValidElement(child)) {
          return null;
        }
        if (child?.type.displayName === 'answers') {
          return <div className={styles.answers}>{child}</div>;
        }
        if (child?.type.displayName === 'description') {
          return <div className={styles.description}>{child}</div>;
        }
      })}
    </div>
  );
};

export default Layout;

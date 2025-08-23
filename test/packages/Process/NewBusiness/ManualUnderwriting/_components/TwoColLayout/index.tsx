import React, { Children } from 'react';
import styles from './index.less';

interface ITwoColLayoutProps {
  children: React.ReactNode;
}
const TwoColLayout = ({ children }: ITwoColLayoutProps) => {
  return (
    <div className={styles.layouWrap}>
      {Children.map(children, (child) => {
        return child;
      })}
    </div>
  );
};

export default TwoColLayout;

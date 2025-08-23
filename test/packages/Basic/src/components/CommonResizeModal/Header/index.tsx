import React from 'react';
import Capitalize from 'basic/components/CaseHeader/Capitalize';
import styles from './index.less';

interface IProps {
  title: string;
}
const Header = ({ title }: IProps) => {
  return (
    <div className={styles.container}>
      <Capitalize title={title} className={styles.title} />
    </div>
  );
};

Header.displayName = 'header';

export default Header;

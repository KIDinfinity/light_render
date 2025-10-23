import React from 'react';
import styles from './index.less';
import { ReactComponent } from 'navigator/assets/expand.svg';

export default function CommonHeader({
  title,
  click,
  displayExpand,
}: {
  title: string;
  click: () => void;
  displayExpand: boolean;
}) {
  return (
    <div className={styles.header}>
      {title}
      {displayExpand && <ReactComponent onClick={click} />}
    </div>
  );
}

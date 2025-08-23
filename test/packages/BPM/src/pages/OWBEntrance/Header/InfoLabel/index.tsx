import React from 'react';
import Label from '@/components/Label/LabelText';
import styles from './index.less';

export default ({ indicator }: any) => {
  return (
    <div className={styles.flag}>
      <Label indicator={indicator} className={styles.label} />
    </div>
  );
};

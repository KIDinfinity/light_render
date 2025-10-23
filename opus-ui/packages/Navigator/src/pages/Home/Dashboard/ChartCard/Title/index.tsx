import React from 'react';
import Ellipsis from '@/components/Ellipsis';
import styles from './index.less';

export default ({ title }: any) => {
  return (
    <h3 className={styles.title}>
      {/**
        //@ts-ignore */}
      <Ellipsis lines={1} tooltip>
        {title}
      </Ellipsis>
    </h3>
  );
};

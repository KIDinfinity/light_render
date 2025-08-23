import React from 'react';
import lodash from 'lodash';
import ProcessItem from './ProcessItem';
import type { ProcessDataItem } from 'packages/Integration/types/data';
import styles from './index.less';

interface IProps {
  interfaceProcessList: ProcessDataItem[];
}

export default ({ interfaceProcessList }: IProps) => {
  return (
    <div className={styles.cardWrapper}>
      {lodash.map(interfaceProcessList, (item: any) => {
        return (
          <div className={styles.card} key={item.requestTime}>
            <ProcessItem key={item.interfaceCode} processItem={item} />
          </div>
        );
      })}
    </div>
  );
};

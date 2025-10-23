import React from 'react';
import TakeOverInfo from './TakeOverInfo';
import TakeOverTable from './TakeOverTable';
import styles from './index.less';
import { useModelTakeOverFlag, useModelTakeOverList, useShowModelTakeOverTable } from '../hooks';

export default () => {
  const takeOverFlag = useModelTakeOverFlag();
  const showTable = useShowModelTakeOverTable();
  const takeOverList = useModelTakeOverList();
  return (
    <>
      <div className={styles.takeOverField}>
        <TakeOverInfo data={{ takeOverFlag }} />
      </div>
      {showTable && (
        <div className={styles.takeOverTable}>
          <TakeOverTable data={takeOverList} />
        </div>
      )}
    </>
  );
};

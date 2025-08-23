import React from 'react';
import TakeOverInfo from './TakeOverInfo';
import TakeOverTable from './TakeOverTable';
import styles from './index.less';
import { formUtils } from 'basic/components/Form';
import { useSelector } from 'dva';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

export default () => {
  const takeOverData = useSelector(({ [NAMESPACE]: model }: any) => model?.modalData?.takeOver);

  return (
    <>
      <div className={styles.takeOverField}>
        <TakeOverInfo data={takeOverData} />
      </div>
      {formUtils.queryValue(takeOverData?.takeOverFlag) === 'Y' && (
        <div className={styles.takeOverTable}>
          <TakeOverTable data={takeOverData?.takeOverList} />
        </div>
      )}
    </>
  );
};

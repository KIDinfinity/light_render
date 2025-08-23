import React from 'react';
import { useSelector } from 'dva';
import lodash from 'lodash';
import { NAMESPACE } from '../activity.config';
import OtherProcedure from './OtherProcedure';
import styles from './index.less';

const ProcedureList = ({ treatmentId }: any) => {
  const OtherProcedureList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.treatmentListMap?.[treatmentId]?.otherProcedureList
  );

  return (
    <div className={styles.serviceList}>
      {lodash.map(OtherProcedureList, (item: any) => (
        <OtherProcedure
          treatmentId={treatmentId}
          ohterProcedureId={item}
          key={`otherProcedure-${item}`}
        />
      ))}
    </div>
  );
};

export default ProcedureList;

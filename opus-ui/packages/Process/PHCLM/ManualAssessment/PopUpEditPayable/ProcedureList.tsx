import React from 'react';
import { useSelector } from 'dva';
import lodash from 'lodash';
import { NAMESPACE } from '../activity.config';
import Procedure from './Procedure';
import styles from './index.less';

const ProcedureList = ({ treatmentId }: any) => {
  const procedureList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.treatmentListMap?.[treatmentId]?.procedureList
  );

  return (
    <div className={styles.serviceList}>
      {lodash.map(procedureList, (item: any) => (
        <Procedure treatmentId={treatmentId} procedureId={item} key={`procedure-${item}`} />
      ))}
    </div>
  );
};

export default ProcedureList;

import React from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { formUtils } from 'basic/components/Form';
import Item from './Item';
import styles from './index.less';

export default ({ incidentId, treatmentId, opTreatmentIdList }: any) => {
  const opTreatmentPayableListMap = useSelector(
    ({ opusClaimAssessment }: any) => opusClaimAssessment.claimEntities.opTreatmentPayableListMap
  );

  const opTreatmentPayableList = lodash
    .chain(opTreatmentPayableListMap)
    .filter(
      (item: any) =>
        item.treatmentId === treatmentId && opTreatmentIdList.includes(item.opTreatmentId)
    )
    .orderBy(
      (item: any) => {
        return formUtils.queryValue(item.dateOfConsultation);
      },
      ['asc']
    )
    .value();

  return (
    <div className={styles.treatmentPayableWrap}>
      {lodash.map(opTreatmentPayableList, (item: any) => (
        <Item key={item?.id} item={item} incidentId={incidentId} treatmentId={treatmentId} />
      ))}
    </div>
  );
};

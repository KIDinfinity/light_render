import React from 'react';
import lodash from 'lodash';
import Item from './Item';
import styles from './List.less';
import { useSelector } from 'dva';

const TreatmentList = ({ incidentId }: any) => {
  const treatmentList = useSelector(
    ({ JPCLMOfClaimAssessment }: any) =>
      JPCLMOfClaimAssessment.claimEntities.incidentListMap[incidentId].treatmentList
  );

  return (
    <div className={styles.treatmentListWrap}>
      {lodash.isArray(treatmentList) &&
        lodash.map(treatmentList, (item) => (
          <Item incidentId={incidentId} treatmentId={item} key={item} />
        ))}
    </div>
  );
};

export default TreatmentList;

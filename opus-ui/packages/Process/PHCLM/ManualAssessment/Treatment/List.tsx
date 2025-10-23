import React from 'react';
import { NAMESPACE } from '../activity.config';

import { useSelector } from 'dva';
import lodash from 'lodash';
import ListItem from './ListItem';
import styles from './TreatmentList.less';

const TreatmentList = ({ incidentId }: any) => {
  const treatmentList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.incidentListMap?.[incidentId]?.treatmentList
  );

  return (
    <div className={styles.treatmentListWrap}>
      {lodash.isArray(treatmentList) &&
        treatmentList.map((item) => (
          <ListItem incidentId={incidentId} treatmentId={item} key={item} />
        ))}
    </div>
  );
};

export default TreatmentList;

import React from 'react';
import { NAMESPACE } from '../activity.config';

import { useSelector } from 'dva';
import lodash from 'lodash';
import ListItem from './ListItem';
import styles from './TreatmentList.less';
import Add from './Add';

const TreatmentList = ({ incidentId }: any) => {
  const treatmentList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.incidentListMap?.[incidentId]?.treatmentList
  );
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
    <div className={styles.treatmentListWrap}>
      {lodash.isArray(treatmentList) &&
        treatmentList.map((item) => (
          <ListItem incidentId={incidentId} treatmentId={item} key={item} />
        ))}
      {editable && !treatmentList && <Add incidentId={incidentId} treatmentList={treatmentList} />}
    </div>
  );
};

export default TreatmentList;

import React from 'react';
import { NAMESPACE } from '../activity.config';

import { useSelector } from 'dva';
import lodash from 'lodash';
import ListItem from './ListItem';
import Add from './Add';
import styles from './TreatmentList.less';

const TreatmentList = ({ incidentId }: any) => {
  const treatmentList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities.incidentListMap[incidentId]?.treatmentList
  );
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
    <div className={styles.treatmentListWrap}>
      {lodash.isArray(treatmentList) &&
        treatmentList.map((item) => (
          <ListItem incidentId={incidentId} treatmentId={item} key={item} />
        ))}
      {editable && <Add incidentId={incidentId} treatmentList={treatmentList} />}
    </div>
  );
};

export default TreatmentList;

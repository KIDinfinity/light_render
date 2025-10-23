import React from 'react';
import { NAMESPACE } from 'opus/Pages/Process/Claim/ManualAssessment/activity.config';
import { useSelector } from 'dva';
import lodash from 'lodash';
import Item from './Item';
import Header from './Header';
import styles from './index.less';

const Diagnosis = ({ incidentId }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const claimEntities = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimEntities
  );

  const incidentItem: any = claimEntities.incidentListMap[incidentId];
  const diagnosisList = incidentItem?.diagnosisList;

  return (
    <div className={styles.diagnosis}>
      {((lodash.isArray(diagnosisList) && lodash.size(diagnosisList) > 0) || editable) && (
        <Header incidentId={incidentId} />
      )}
      {lodash.compact(diagnosisList).map((item, index, arr) => (
        <Item incidentId={incidentId} diagnosisId={item} key={item} canDelete={arr?.length > 1} index={index} />
      ))}
    </div>
  );
};

export default Diagnosis;

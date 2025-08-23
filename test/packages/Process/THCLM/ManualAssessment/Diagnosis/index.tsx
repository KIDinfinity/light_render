import React from 'react';
import { NAMESPACE } from '../activity.config';
import { FormLayoutContext } from 'basic/components/Form';
import { useSelector } from 'dva';
import lodash from 'lodash';
import Item from './Item';
import Add from './Add';
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
      <FormLayoutContext.ExpandProvider>
        {((lodash.isArray(diagnosisList) && lodash.size(diagnosisList) > 0) || editable) && (
          <Header incidentId={incidentId} />
        )}
        {lodash.compact(diagnosisList).map((item) => (
          <Item incidentId={incidentId} diagnosisId={item} key={item} />
        ))}
        {editable && <Add incidentId={incidentId} />}
      </FormLayoutContext.ExpandProvider>
    </div>
  );
};

export default Diagnosis;

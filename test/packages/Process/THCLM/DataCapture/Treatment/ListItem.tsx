import React from 'react';
import { NAMESPACE } from '../activity.config';

import { useSelector, useDispatch } from 'dva';
import { SectionCard } from 'basic/components/Form';
import Header from './Header';
import Basic from './Basic';
import Check from './Check';
import Procedure from '../Procedure/List';
import Invoice from '../Invoice/List';
import TreatmentLayout from './TreatmentLayout/TreatmentLayout';
import styles from './Item.less';

const TreatmentItem = ({ treatmentId, incidentId, isAdd = false }: any) => {
  const dispatch = useDispatch();
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const onDelete = () => {
    dispatch({
      type: `${NAMESPACE}/removeTreatmentItem`,
      payload: {
        incidentId,
        treatmentId,
      },
    });
  };

  return (
    <SectionCard
      title={<Header treatmentId={treatmentId} incidentId={incidentId} isAdd={isAdd} />}
      showButton={editable && !isAdd}
      handleClick={onDelete}
      backgroundColorName={'card2BgColor'}
    >
      {!isAdd && (
        <TreatmentLayout>
          <TreatmentLayout.Left>
            <div className={styles.basicLayout}>
              <div className={styles.basic}>
                <Basic incidentId={incidentId} treatmentId={treatmentId} />
              </div>
              <Check incidentId={incidentId} treatmentId={treatmentId} />
            </div>
          </TreatmentLayout.Left>
          <TreatmentLayout.Right>
            <Procedure treatmentId={treatmentId} incidentId={incidentId} />
          </TreatmentLayout.Right>
          <TreatmentLayout.Bottom>
            <Invoice treatmentId={treatmentId} incidentId={incidentId} />
          </TreatmentLayout.Bottom>
        </TreatmentLayout>
      )}
    </SectionCard>
  );
};

export default TreatmentItem;

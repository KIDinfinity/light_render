import React from 'react';
import { NAMESPACE } from 'opus/Pages/Process/Claim/ManualAssessment/activity.config';
import { FormLayoutContext } from 'basic/components/Form';
import { useSelector, useDispatch } from 'dva';
import { Icon } from 'antd';
import { ReactComponent as AddIcon } from 'opus/Modules/Envoy/Assets/add.svg';
import { isAdjustmentFun } from 'opus/Pages/Process/Claim/ManualAssessment/_models/functions';
import Title from './Title';
import styles from './Header.less';
import { DeleteButton } from 'opus/Components/Modals/DeleteModal';

export default ({ form, treatmentId, incidentId }: any) => {
  const dispatch = useDispatch();
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const isAdjustmentValue = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) =>
      modelnamespace?.claimEntities?.treatmentListMap?.[treatmentId]?.isAdjustment
  );

  const onAdd = () => {
    if (isAdjustmentFun(isAdjustmentValue)) return;

    dispatch({
      type: `${NAMESPACE}/addTreatment`,
      payload: {
        incidentId,
      },
    });
  };

  const deleteCallback = () => {
    dispatch({
      type: `${NAMESPACE}/treatmentDelete`,
      payload: {
        incidentId,
        treatmentId,
      },
    });
  };

  return (
    <div className={styles.header}>
      <div className={styles.title}>
        <Title treatmentId={treatmentId} />
      </div>
      <div className={styles.section}>
        {editable && !isAdjustmentFun(isAdjustmentValue) && (
          <Icon component={AddIcon} onClick={onAdd} />
        )}
        {editable && <DeleteButton handleDelete={deleteCallback} />}
        <FormLayoutContext.ExpandIcon className={styles.icon} />
      </div>
    </div>
  );
};

import React from 'react';
import { NAMESPACE } from '../activity.config';
import { useSelector, useDispatch } from 'dva';
import { IsAdjustment } from 'claim/enum/IsAdjustment';
import { FormBorderCard } from 'basic/components/Form';

import TreatmentPayableSection from 'process/Components/BussinessControls/TreatmentPayable';
import styles from './index.less';

const TreatmentPayable = ({ item }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const dispatch = useDispatch();
  const policyBackgrounds = useSelector(
    ({ formCommonController }: any) => formCommonController?.policyBackgrounds
  );

  const handleDelete = () => {
    dispatch({
      type: `${NAMESPACE}/removeTreatmentPayableItem`,
      payload: {
        id: item?.id,
        benefitCategory: item?.benefitCategory,
      },
    });
  };

  const isAdjustMent = item?.isAdjustment === IsAdjustment.Yes;
  const policyNo = item?.policyNo;

  return (
    <FormBorderCard
      button={{ visiable: editable, callback: handleDelete }}
      className={isAdjustMent && styles.isAdjustment}
      type="weight"
      borderColor={policyBackgrounds?.[policyNo]}
    >
      <TreatmentPayableSection.SectionBasic NAMESPACE={NAMESPACE} item={item} />
    </FormBorderCard>
  );
};

export default TreatmentPayable;

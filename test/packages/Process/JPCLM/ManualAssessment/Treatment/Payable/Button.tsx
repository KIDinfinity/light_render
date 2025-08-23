import React from 'react';
import { Button } from 'antd';
import { useSelector, useDispatch } from 'dva';
import classnames from 'classnames';
import EIsAdjustment from 'process/JPCLM/ManualAssessment/_models/enum/isAdjustment';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { getSerialClaimPayableData } from '../_hooks';
import styles from './index.less';

export default ({ incidentId, treatmentId, treatmentPayableId, opTreatmentPayableId }: any) => {
  const dispatch = useDispatch();
  const editable = useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const isAdjustment =
    useSelector(
      ({ JPCLMOfClaimAssessment }: any) =>
        JPCLMOfClaimAssessment.claimEntities.treatmentListMap[treatmentId]?.isAdjustment
    ) === EIsAdjustment.Y;

  const payableData = getSerialClaimPayableData({
    incidentId,
    treatmentId,
    treatmentPayableItemId: treatmentPayableId,
  });

  const showSerialClaimSelection = () => {
    dispatch({
      type: 'JPCLMOfClaimAssessment/saveSerialClaimShow',
      payload: {
        payableData,
      },
    });
  };

  return (
    !isAdjustment && (
      <Button
        disabled={editable}
        onClick={showSerialClaimSelection}
        className={classnames(styles.btn, styles.serialClaim)}
      >
        {formatMessageApi({ Label_BIZ_Claim: 'SerialClaimSelection' })}
      </Button>
    )
  );
};

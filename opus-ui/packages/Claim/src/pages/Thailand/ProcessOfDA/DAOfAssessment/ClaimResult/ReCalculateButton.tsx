import React from 'react';
import { Button } from 'antd';
import { useSelector, useDispatch } from 'dva';
import lodash from 'lodash';

import { messageModal } from '@/utils/commonMessage';
import { formatMessageApi } from '@/utils/dictFormatMessage';

const ReCalculateButton = () => {
  const dispatch = useDispatch();
  const { benefitItemPayableListMap, reCalculateLoading, taskNotEditable, flags } = useSelector(
    (state: any) => ({
      benefitItemPayableListMap:
        state?.daOfClaimAssessmentController?.claimProcessData?.hasChangeSection
          ?.benefitItemPayableListMap,
      taskNotEditable: state?.claimEditable?.taskNotEditable,
      reCalculateLoading: state?.loading.effects['daOfClaimAssessmentController/reCalculate'],
      flags: state?.daOfClaimAssessmentController?.claimProcessData?.flags,
    })
  );

  const handleReCalculate = () => {
    if (lodash.some(benefitItemPayableListMap, (item) => lodash.size(item) > 0)) {
      messageModal(
        {
          typeCode: 'Label_COM_WarningMessage',
          dictCode: 'MSG_000408',
        },
        {
          okFn: () => {
            dispatch({ type: 'daOfClaimAssessmentController/reCalculate' });
          },
          cancelFn: () => {},
        }
      );
      return;
    }
    dispatch({ type: 'daOfClaimAssessmentController/reCalculate' });
  };

  return !taskNotEditable ? (
    <Button
      onClick={handleReCalculate}
      disabled={lodash.chain(flags).split(',').includes('no_reassessment').value()}
      loading={reCalculateLoading}
      id="recalculate"
    >
      {formatMessageApi({
        Label_BPM_Button: 'ReCalculate',
      })}
    </Button>
  ) : null;
};

export default ReCalculateButton;

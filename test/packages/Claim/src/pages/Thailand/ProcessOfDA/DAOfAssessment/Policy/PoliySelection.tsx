import React, { useCallback } from 'react';
import { useSelector,  useDispatch } from 'dva';
import { shallowEqual } from 'react-redux';
import { Radio } from 'antd';
import useGetPolicySelection from 'claim/pages/Thailand/ProcessOfDA/DAOfAssessment/_hooks/useGetPolicySelection';

export default ({ value, fatherId, policyNos, type }: any) => {
  const Selection = useGetPolicySelection({ fatherId, type });
  const taskNotEditable = useSelector(
    (state: any) => state?.claimEditable.taskNotEditable,
    shallowEqual
  );

  const dispatch = useDispatch();

  const handleChange = useCallback((e: any) => {
    const policySelection = e.target.value;
    dispatch({
      type: 'daOfClaimAssessmentController/savePolicySelection',
      payload: {
        changedFields: {
          policySelection,
        },
        fatherId,
        type,
      },
    });
    dispatch({
      type: 'daOfClaimAssessmentController/saveClaimBankAccounts',
      payload: {
        id: policySelection,
        fatherId,
        policyNos,
        type,
      },
    });

    if (type == 'policyOwner') {
      dispatch({
        type: 'daOfClaimAssessmentController/resetNewPolicyPayorSelection',
      });
    } else {
      dispatch({
        type: 'daOfClaimAssessmentController/resetPolicyOwnerSelection',
      });
    }
    dispatch({
      type: 'daOfClaimAssessmentController/resetNewPayeeSelection',
    });
  }, []);

  return (
    <>
      <Radio.Group onChange={handleChange} value={Selection}>
        <Radio disabled={taskNotEditable} value={value} />
      </Radio.Group>
    </>
  );
};

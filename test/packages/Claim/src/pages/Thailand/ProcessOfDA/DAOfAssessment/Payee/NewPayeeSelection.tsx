import React, { useCallback } from 'react';
import { useSelector,  useDispatch } from 'dva';
import { shallowEqual } from 'react-redux';
import { Radio } from 'antd';
import useGetPayeeSelection from 'claim/pages/Thailand/ProcessOfDA/DAOfAssessment/_hooks/useGetPayeeSelection';

export default ({ payeeId }: any) => {
  const taskNotEditable = useSelector(
    (state: any) => state?.claimEditable.taskNotEditable,
    shallowEqual
  );
  const selection = useGetPayeeSelection();
  const dispatch = useDispatch();
  const handleChange = useCallback((e) => {
    const payeeSelection = e.target.value;

    dispatch({
      type: 'daOfClaimAssessmentController/saveEntry',
      target: 'saveNewPayeeSelection',
      payload: {
        changedFields: {
          payeeSelection,
        },
      },
    });
    dispatch({
      type: 'daOfClaimAssessmentController/saveNewPayee',
    });
    dispatch({
      type: 'daOfClaimAssessmentController/resetPolicyOwnerSelection',
    });
  }, []);
  return (
    <>
      <Radio.Group onChange={handleChange} value={selection}>
        <Radio disabled={taskNotEditable} value={payeeId} />
      </Radio.Group>
    </>
  );
};

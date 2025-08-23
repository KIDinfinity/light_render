import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'dva';
import Item from './Item';
import { NAMESPACE } from '../../activity.config';
import { isDataCapture } from 'process/GeneralPOS/common/utils';

const PolicyLoan = ({ transactionId }) => {
  const dispatch = useDispatch();
  const { caseCategory, activityKey } = useSelector(({ processTask }: any) => processTask?.getTask);

  const isNotDataCapture = !isDataCapture({ caseCategory, activityKey });

  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/policySurrenderInit`,
      payload: {
        transactionId,
        isNotDataCapture,
      },
    });
  }, [isNotDataCapture]);

  return <Item transactionId={transactionId} />;
};
export default PolicyLoan;

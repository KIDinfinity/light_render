import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'dva';
import Item from './Item';
import { NAMESPACE } from '../../activity.config';
import { isDataCapture } from 'process/GeneralPOS/common/utils';

const PolicyLoan = ({ transactionId }) => {
  const dispatch = useDispatch();
  const { caseCategory } = useSelector(({ processTask }: any) => processTask.getTask) || {};

  useEffect(() => {
    if (!isDataCapture({ caseCategory })) {
      setTimeout(() => {
        dispatch({
          type: `${NAMESPACE}/getLoanQuotation`,
          payload: {
            transactionId,
          },
        });
      }, 500);
    }
  }, [transactionId]);

  return <Item transactionId={transactionId} />;
};
export default PolicyLoan;

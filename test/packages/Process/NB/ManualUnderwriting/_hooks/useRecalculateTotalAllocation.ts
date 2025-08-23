import { useEffect } from 'react';
import { useDispatch } from 'dva';
import useGetTotalFund from 'process/NB/ManualUnderwriting/_hooks/useGetTotalFund';
import { NAMESPACE } from '../activity.config';

export default (totalFundInfoList: any) => {
  const dispatch = useDispatch();
  const total = useGetTotalFund(totalFundInfoList);
  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/setFundFieldData`,
      payload: {
        changedFields: {
          totalFundAllocation: total,
        },
      },
    });
  }, [total]);
};

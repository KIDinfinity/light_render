import { useEffect } from 'react';
import { useDispatch } from 'dva';
import lodash from 'lodash';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import useGetCoverageAllInsureds from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useGetCoverageAllInsureds.ts';

export default () => {
  const dispatch = useDispatch();
  const insureds = useGetCoverageAllInsureds();

  useEffect(() => {
    if (insureds?.length === 1) {
      const name = lodash.chain(insureds).first().value();

      dispatch({
        type: `${NAMESPACE}/setProductSection`,
        payload: {
          changedFields: {
            name,
          },
        },
      });
    } else {
      dispatch({
        type: `${NAMESPACE}/setProductSection`,
        payload: {
          changedFields: {
            name: '',
          },
        },
      });
    }
  }, [dispatch, insureds]);
};

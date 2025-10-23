import { useEffect } from 'react';
import { useDispatch } from 'dva';
import lodash from 'lodash';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import useGetCoverageAllInsureds from 'process/NB/ManualUnderwriting/_hooks/useGetCoverageAllInsureds';

export default () => {
  const dispatch = useDispatch();
  const insureds = useGetCoverageAllInsureds();

  useEffect(() => {
    if (insureds?.length === 1) {
      const name = lodash.chain(insureds).first().value();

      dispatch({
        type: `${NAMESPACE}/changeSelectedProductFields`,
        payload: {
          changedFields: {
            name,
          },
        },
      });
    } else {
      dispatch({
        type: `${NAMESPACE}/changeSelectedProductFields`,
        payload: {
          changedFields: {
            name: '',
          },
        },
      });
    }
  }, [dispatch, insureds]);
};

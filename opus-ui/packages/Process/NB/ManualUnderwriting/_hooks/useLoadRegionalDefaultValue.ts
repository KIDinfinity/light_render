import { useEffect } from 'react';
import { useDispatch } from 'dva';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';

export default ({ codeType }: any) => {
  const dispatch = useDispatch();
  return useEffect(() => {
    if (!codeType) {
      return false;
    }
    dispatch({
      type: `${NAMESPACE}/loadRegionalDefaultValue`,
      payload: {
        codeType,
      },
    });
  }, [codeType]);
};

import { useEffect } from 'react';
import { useDispatch } from 'umi';
import lodash from 'lodash';
import useGetSummaryEnvoy from 'summary/hooks/useGetSummaryEnvoy';

export default () => {
  const dispatch = useDispatch();
  const data = useGetSummaryEnvoy();
  useEffect(() => {
    if (!lodash.isEmpty(data)) {
      dispatch({
        type: 'envoyController/saveGroupInfo',
        payload: {
          historyReasonGroups: data,
        },
      });
    }
  }, [data]);
};

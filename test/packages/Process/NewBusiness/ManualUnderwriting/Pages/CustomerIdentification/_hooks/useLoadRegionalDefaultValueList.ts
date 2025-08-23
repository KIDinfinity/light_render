import { useEffect } from 'react';
import { useDispatch } from 'dva';
import { NAMESPACE } from '../activity.config';

export default () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/loadRegionalDefaultValueList`,
    });

    return () => {
      dispatch({
        type: `${NAMESPACE}/setRegionalDefaultValueList`,
        payload: {
          cfgRegionalDefaultValueList: [],
        },
      });
    };
  }, []);
};

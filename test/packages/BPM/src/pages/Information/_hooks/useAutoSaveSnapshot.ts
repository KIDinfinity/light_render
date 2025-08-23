import { useEffect } from 'react';
import { useSelector, useDispatch,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import useAbortController from '@/components/AbortController/useAbortController';

export default () => {
  const { addInformations } = useSelector(
    (state: any) => ({
      addInformations: state?.navigatorInformationController?.addInformations,
    }),
    shallowEqual
  );
  const dispatch = useDispatch();
  const signal = useAbortController([addInformations]);
  const saveSnapshot = lodash.debounce(() => {
    dispatch({
      type: 'navigatorInformationController/saveSnapshot',
      payload: {
        data: addInformations,
        signal,
      },
    });
  }, 30000);
  useEffect(() => {
    saveSnapshot();
  }, [signal]);
};

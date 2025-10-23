import React, { useEffect } from 'react';
import navigator from 'navigator/api';
import { useDispatch } from 'dva';
import lodash from 'lodash';

export default ({ children }: any) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // @ts-ignore
    const sub = navigator.AdvancedQueryListener.subscribe((state: any, event: any): boolean => {
      const { value: searchValue, dataType } = lodash.pick(state?.context, ['value', 'dataType']);
      if (
        (state.value === 'loadEnd' && event?.type === 'trigger') ||
        (state.value === 'tirggerAdvancedQueryEnd' && event?.type === 'loadEnd')
      ) {
        console.log(1211111, dataType);
        dispatch({
          type: 'advancedQueryController/enter',
          payload: {
            tabIndex: '1',
            stateOfSearch: {
              params: {
                [dataType]: searchValue,
              },
            },
          },
        });

        dispatch({
          type: 'advancedQueryAllForm/saveInitDataAddData',
          payload: {
            saveTabName: '2',
            params: {
              [dataType]: searchValue,
            },
          },
        });
        return false;
      }

      return false;
    });

    return sub?.unsubscribe;
  }, []);

  return <>{children}</>;
};

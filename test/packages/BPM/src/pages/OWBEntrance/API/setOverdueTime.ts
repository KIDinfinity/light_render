import { useContext, useEffect } from 'react';
import lodash from 'lodash';
import context from '../Context/context';

export default (overdueTimeRender: any) => {
  const { dispatch, state } = useContext(context);
  const { overdueTimeRender: preOverdueTimeRender } = state;
  useEffect(() => {
    if (
      overdueTimeRender?.props?.overdueTime &&
      !lodash.isEqual(
        overdueTimeRender?.props?.overdueTime,
        preOverdueTimeRender?.props?.overdueTime
      )
    ) {
      dispatch({
        type: 'setOverdueTime',
        payload: {
          overdueTimeRender,
        },
      });
    }
  }, [overdueTimeRender]);
};

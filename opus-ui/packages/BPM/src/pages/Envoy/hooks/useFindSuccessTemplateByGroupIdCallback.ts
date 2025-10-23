import { useCallback } from 'react';
import lodash from 'lodash';
import { useDispatch } from 'dva';

export default () => {
  const dispatch = useDispatch();
  return useCallback(async (reasonDetailsList: any) => {
    if (!lodash.isEmpty(reasonDetailsList)) {
      await dispatch({
        type: 'envoyController/findSuccessTemplateByGroupId',
        payload: {
          param: lodash.map(reasonDetailsList, (item) => {
            return {
              reasonGroupId: item.reasonGroupId,
              reasonExecuteType: item.status,
            };
          }),
        },
      });
    }
  }, []);
};

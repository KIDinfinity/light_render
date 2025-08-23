import { useCallback } from 'react';
import { useDispatch } from 'dva';
import lodash from 'lodash';
import { EDataType } from 'bpm/pages/Envoy/enum';

interface IParams {
  type: EDataType;
  data: any;
}

export default ({ data, type }: IParams) => {
  const dispatch = useDispatch();
  return useCallback(
    (role: string) => {
      if (type === EDataType.REASON) {
        dispatch({
          type: 'envoyController/changeReasonRoleInfo',
          payload: {
            role,
            ctn: lodash.cloneDeep(data),
          },
        });
      } else {
        dispatch({
          type: 'envoyController/changeReminderRoleInfo',
          payload: {
            role,
            ctn: lodash.cloneDeep(data),
          },
        });
      }
      dispatch({
        type: 'envoyController/validateFields',
        payload: {
          dataId: data?.groupId,
        },
      });
    },
    [data, type]
  );
};

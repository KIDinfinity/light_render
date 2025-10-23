import { useCallback } from 'react';
import { useDispatch } from 'dva';
import lodash from 'lodash';
import { EDataType } from 'bpm/pages/Envoy/enum';

interface IParams {
  type: EDataType;
  data: any;
  groupCode: string;
  onBlur?: boolean;
}
export default ({ type, data, groupCode, onBlur = false }: IParams) => {
  const dispatch = useDispatch();
  return useCallback(
    (value: string) => {
      const newValue = onBlur ? lodash.trim(value) : value;
      if (type === EDataType.REASON) {
        dispatch({
          type: 'envoyController/changeReasonDestInfo',
          payload: {
            dest: newValue,
            ctn: lodash.cloneDeep(data),
          },
        });
      } else {
        dispatch({
          type: 'envoyController/changeReminderDestInfo',
          payload: {
            dest: newValue,
            ctn: lodash.cloneDeep(data),
            to: newValue,
            groupCode,
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
    [type, data, groupCode]
  );
};

import { useCallback } from 'react';
import { useDispatch, useSelector } from 'dva';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import { formUtils } from 'basic/components/Form';
import { get } from '@/services/owbNbChequeInfoControllerService';
import lodash from 'lodash';

export default () => {
  const dispatch = useDispatch();
  const chequeInfoList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.modalData.processData.chequeInfoList
  );

  return useCallback(
    async (e: any) => {
      const chequeNo = e?.target?.value;
      if (!!chequeNo) {
        const params = await dispatch({
          type: `${NAMESPACE}/getChequeParams`,
        });
        const response = await get({
          ...params,
          chequeNo,
          chequeInfoList: formUtils.cleanValidateData(chequeInfoList),
        });
        if (response?.success) {
          const { chequeInfoList: newList } = lodash.pick(response?.resultData, ['chequeInfoList']);
          dispatch({
            type: `${NAMESPACE}/saveModalChequeInfoList`,
            payload: {
              chequeInfoList: newList,
            },
          });
        }
      }
    },
    [dispatch, chequeInfoList]
  );
};

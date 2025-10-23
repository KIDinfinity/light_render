import { useCallback } from 'react';
import { useDispatch } from 'dva';
import moment from 'moment';
import { listDefaultMemo } from '@/services/envoyMemoControllerService';
import lodash from 'lodash';
import { EReasonStatus } from 'bpm/pages/Envoy/enum';
import { v4 as uuidv4 } from 'uuid';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import useHandleSaveAllEnvoyCallback from 'bpm/pages/Envoy/hooks/useHandleSaveAllEnvoyCallback';

export default () => {
  const dispatch = useDispatch();
  const memoDescriptionList = getDrowDownList('DropDown_ENV_PendingMemoDescription');
  const handleSaveAllEnvoy = useHandleSaveAllEnvoyCallback();
  return useCallback(
    async ({ reasonGroupCode, memoCode, caseCategory, taskId, groupIdx }: any) => {
      const response = await listDefaultMemo({
        reasonGroupCode,
        memoCode,
        caseCategory,
        taskId,
      });
      const { success, resultData } = lodash.pick(response, ['success', 'resultData']);
      if (lodash.isArray(resultData) && !lodash.isEmpty(resultData)) {
        await handleSaveAllEnvoy();
      }
      if (success) {
        lodash.forEach(resultData, (group: any) => {
          (async () => {
            const { memoCode, reasonGroupCode } = lodash.pick(group, [
              'memoCode',
              'reasonGroupCode',
            ]);
            const memoDesc = lodash
              .chain(memoDescriptionList)
              .find((item: any) => item.dictCode === memoCode)
              .get('dictName')
              .value();
            const id = uuidv4();
            dispatch({
              type: 'envoyController/addEnvoy',
              payload: {
                requestType: 'Pending',
                id,
                status: EReasonStatus.DRAFT,
              },
            });
            await dispatch({
              type: 'envoyController/setReasonGroup',
              payload: {
                id,
                groupCode: reasonGroupCode,
                groupIdx,
                pendingMemoList: [
                  {
                    id: uuidv4(),
                    memoCode,
                    memoDesc,
                    pendingDate: moment().format(),
                  },
                ],
              },
            });
          })();
        });
      }
    },
    [listDefaultMemo, memoDescriptionList, handleSaveAllEnvoy]
  );
};

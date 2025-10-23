import { useCallback } from 'react';
import { useDispatch } from 'dva';
import moment from 'moment';
import useGetCurrentProcessMemoDropdown from 'bpm/pages/Envoy/hooks/useGetCurrentProcessMemoDropdown';
import useAutoAddRelateMemoCallback from 'bpm/pages/Envoy/hooks/useAutoAddRelateMemoCallback';
import lodash from 'lodash';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import { v4 as uuidv4 } from 'uuid';

interface IProps {
  reasonGroupId: string;
}

export default ({ reasonGroupId, groupIdx }: IProps) => {
  const dispatch = useDispatch();
  const dicts = useGetCurrentProcessMemoDropdown();
  const handleAddRelateEnvoy = useAutoAddRelateMemoCallback();
  const memoDescriptionList = getDrowDownList('DropDown_ENV_PendingMemoDescription');
  return useCallback(
    async (value: string) => {
      const groupCode = lodash
        .chain(dicts)
        .find((item: any) => item.memoCode === value)
        .get('reasonGroupCode')
        .value();
      const memoDesc = lodash
        .chain(memoDescriptionList)
        .find((item: any) => item.dictCode === value)
        .get('dictName')
        .value();
      const result = await dispatch({
        type: 'envoyController/setReasonGroup',
        payload: {
          id: reasonGroupId,
          groupCode,
          groupIdx,
          pendingMemoList: [
            {
              id: uuidv4(),
              memoCode: value,
              memoDesc,
              pendingDate: moment().format(),
            },
          ],
        },
      });
      if (!!result?.id) {
        lodash
          .chain(result)
          .get('reasonDetails', [])
          .forEach((reason: any) => {
            const params: any = lodash.pick(result, ['taskId', 'groupCode', 'caseCategory']);
            (async () => {
              await dispatch({
                type: 'envoyController/getListMemos',
                payload: {
                  reasonCode: reason?.reasonCode,
                  caseCategory: params?.caseCategory,
                },
              });
              await dispatch({
                type: 'envoyController/saveReasonMemoCode',
                payload: {
                  groupId: reasonGroupId,
                  dataId: reason?.id,
                  names: [`pendingMemoList{${reason?.reasonIdx}}_memoCode`],
                  value,
                },
              });
              handleAddRelateEnvoy({
                memoCode: value,
                taskId: params?.taskId,
                reasonGroupCode: params?.groupCode,
                caseCategory: params?.caseCategory,
                groupIdx,
              });
            })();
          })
          .value();
      }
    },
    [dicts, reasonGroupId, dispatch, handleAddRelateEnvoy, memoDescriptionList, groupIdx]
  );
};

import { useCallback } from 'react';
import lodash from 'lodash';
import { useDispatch } from 'dva';
import { history } from 'umi';
import CaseCategory from 'enum/CaseCategory';

export default ({ reasonDetail }: any) => {
  const dispatch = useDispatch();
  return useCallback(
    async ({}) => {
      const { subCaseCategory, subCaseNo, subTaskId } = lodash.pick(reasonDetail, [
        'subCaseCategory',
        'subCaseNo',
        'subTaskId',
      ]);

      if (subCaseCategory === CaseCategory.KH_ME_CTG001) {
        dispatch({
          type: 'processTask/toogleMedicalRequestModal',
          payload: {
            medicalRequestModalDisplay: true,
          },
        });

        dispatch({
          type: 'processTask/setSubTaskId',
          payload: {
            subTaskId,
          },
        });
      } else {
        history.push(`/navigator/case/detail/${subCaseNo}`);
      }
    },
    [reasonDetail]
  );
};

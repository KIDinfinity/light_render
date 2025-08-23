import lodash from 'lodash';
import { produce } from 'immer';
import { getFieldName } from 'bpm/pages/Envoy/_utils/dataTransferFn';
import { tenant, Region } from '@/components/Tenant';

interface IAction {
  payload: {
    groupId: string;
    dataId: string;
    names: string[];
    value: string;
  };
}

export default function saveReasonMemoCode(state: any, { payload }: IAction) {
  const { groupId, dataId, names, value } = payload;
  const paths = names.map(getFieldName);
  return produce(state, (draftState: any) => {
    const { listMemos } = draftState;
    lodash.forEach(draftState.currentReasonGroups, (reasonGroup: any) => {
      if (reasonGroup?.id === groupId) {
        lodash.forEach(reasonGroup.reasonDetails, (reason: any, index) => {
          if (reason?.id === dataId) {
            const obj = lodash.cloneDeep(reason);
            paths.map((path) => lodash.set(obj, path, value));
            // pending memo 联动
            if (value !== '') {
              const memoCategory = lodash
                .get(listMemos, `${reason?.reasonCode}`, [])
                .find((memo: any) => memo?.memoCode === value)?.memoCategory;
              names.map((name) => {
                if (lodash.includes(name, 'memoCode')) {
                  const desc = lodash
                    .get(listMemos, `${reason?.reasonCode}`, [])
                    .find((memo: any) => memo?.memoCode === value)?.memoDesc;
                  const memoDesc = tenant.region({
                    [Region.ID]: () => {
                      return reason.reasonName == 'Supplementary Document' ? '' : desc;
                    },
                    notMatch: desc,
                  });
                  lodash.set(obj, `${paths[index]?.split('.')[0]}.memoDesc`, memoDesc);
                }
                lodash.set(obj, `${paths[index]?.split('.')[0]}.memoCategory`, memoCategory);
              });
            }
            reasonGroup.reasonDetails[index] = obj;
          }
        });
      }
    });
  });
}

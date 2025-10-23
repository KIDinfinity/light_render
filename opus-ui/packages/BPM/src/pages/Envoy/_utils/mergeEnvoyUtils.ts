import type { useDispatch } from 'react-redux';
import lodash from 'lodash';
import { EReasonStatus } from 'bpm/pages/Envoy/enum';
import { produce } from 'immer';

export const getMergedEnvoy = (state: any) => {
  const currentReasonGroups = lodash.get(state, 'envoyController.currentReasonGroups');
  const reasonConfigs = state.envoyController.reasonConfigs;

  const toSendEnvoySet = new Set();
  lodash
    .chain(currentReasonGroups)
    .filter(({ status }: any) => status === EReasonStatus.DRAFT)
    .filter((item: any) => {
      const allowMerge = lodash
        .chain(reasonConfigs)
        .find((configItem: any) => configItem.code === item.groupCode)
        .get('allowMerge')
        .value();
      return allowMerge === 'Y';
    })
    .groupBy('groupCode')
    .entries()
    .forEach(([groupCode, groupData]) => {
      const [firstGroup, ...otherGroup] = groupData;

      const currentGroupMemos = new Set();
      const reasonDetailId = lodash.get(firstGroup, 'reasonDetails[0].id', '');
      lodash
        .chain(groupData)
        .forEach((singleGroup) => {
          lodash
            .chain(singleGroup)
            .get('reasonDetails', [])
            .forEach((reason: any) => {
              lodash
                .chain(reason)
                .get('pendingMemoList', [])
                .forEach((memoItem: any) => {
                  currentGroupMemos.add({
                    ...memoItem,
                    reasonDetailId,
                    reasonGroupId: firstGroup.id,
                  });
                })
                .value();
            })
            .value();
        })
        .value();

      const dataToSend = produce(firstGroup, (draft: any) => {
        lodash.set(draft, 'reasonDetails[0].pendingMemoList', Array.from(currentGroupMemos));
      });

      toSendEnvoySet.add(dataToSend);
    })
    .value();
  return Array.from(toSendEnvoySet);
};

export const getDeleteEnvoy = (state: any) => {
  const currentReasonGroups = lodash.get(state, 'envoyController.currentReasonGroups');
  const reasonConfigs = state.envoyController.reasonConfigs;

  const toDeleteDataSet = new Set();
  lodash
    .chain(currentReasonGroups)
    .filter(({ status }: any) => status === EReasonStatus.DRAFT)
    .filter((item: any) => {
      const allowMerge = lodash
        .chain(reasonConfigs)
        .find((configItem: any) => configItem.code === item.groupCode)
        .get('allowMerge')
        .value();
      return allowMerge === 'Y';
    })
    .groupBy('groupCode')
    .entries()
    .forEach(([, groupData]: any) => {
      const [, ...otherGroup] = groupData;

      lodash.forEach(otherGroup, (group: any) => {
        toDeleteDataSet.add(group);
      });
    })
    .value();
  return Array.from(toDeleteDataSet);
};

export const getUnrelevantEnvoy = (state: any) => {
  const currentReasonGroups = lodash.get(state, 'envoyController.currentReasonGroups');
  const reasonConfigs = state.envoyController.reasonConfigs;

  return lodash
    .chain(currentReasonGroups)
    .filter(({ status }: any) => status === EReasonStatus.DRAFT)
    .filter((item: any) => {
      const allowMerge = lodash
        .chain(reasonConfigs)
        .find((configItem: any) => configItem.code === item.groupCode)
        .get('allowMerge')
        .value();
      return allowMerge !== 'Y';
    })
    .value();
};
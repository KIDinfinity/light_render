import { produce } from 'immer';
import lodash from 'lodash';

const saveIntegrationCheckDetail = (state: any, action: any) => {
  const { integrationCheckDetail, taskId, activityKey } = lodash.pick(action?.payload, [
    'integrationCheckDetail',
    'activityKey',
    'taskId',
  ]);

  const nextState = produce(state, (draftState: any) => {
    const listItemIndex = lodash.findIndex(draftState?.integrationChecklist, (listItem: any) => {
      return listItem?.taskId === taskId && listItem?.activityKey === activityKey;
    });

    const recordIndex = lodash
      .chain(draftState?.integrationChecklist)
      .get(`[${listItemIndex}].integrationCallRecordList`, [])
      .findIndex(
        (recordItem: any) =>
          recordItem?.integrationSessionId ===
          integrationCheckDetail?.integrationSessionId
      )
      .value();

    lodash.set(
      draftState,
      `integrationChecklist[${listItemIndex}].integrationCallRecordList[${recordIndex}]`,
      {
        ...integrationCheckDetail,
        interfaceProcessList: integrationCheckDetail?.interfaceProcessList,
      }
    );
  });

  return { ...nextState };
};

export default saveIntegrationCheckDetail;

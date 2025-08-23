import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { id, coverageItemId, deleteAll } = lodash.pick(action?.payload, ['id', 'coverageItemId', 'deleteAll']);

  const coverageIndex = lodash
    .chain(state)
    .get('processData.coverageList', [])
    .findIndex((item: any) => item?.id === coverageItemId)
    .value();
  const coverageRemarkList = lodash
    .chain(state)
    .get('processData.coverageList', [])
    .find((item: any) => item?.id == coverageItemId)
    .get('coverageRemarkList', [])
    .filter((item: any) => !deleteAll && item?.id !== id)
    .value();

  const nextState = produce(state, (draftState: any) => {
    lodash.set(
      draftState,
      `processData.coverageList[${coverageIndex}].coverageRemarkList`,
      coverageRemarkList
    );
  });
  return {
    ...nextState,
  };
};

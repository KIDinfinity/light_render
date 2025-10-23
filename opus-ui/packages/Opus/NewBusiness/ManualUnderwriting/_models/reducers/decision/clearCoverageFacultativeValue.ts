import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any) => {
  const { coverageId } = state.payload || {};
  const nextState = produce(state, (draftState: any) => {
    const coverageList = lodash.get(draftState, 'processData.coverageList', []);
    const index = lodash.findIndex(coverageList, (item: any) => item?.id === coverageId);
    lodash.set(draftState, `processData.coverageList[${index}]`, {
      ...coverageList[index],
      facultativePackageCode: undefined,
      facultativeReason: undefined,
    });
  });
  return { ...nextState };
};

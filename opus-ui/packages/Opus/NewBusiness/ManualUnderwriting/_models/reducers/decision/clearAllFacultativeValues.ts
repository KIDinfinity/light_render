import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any) => {
  const nextState = produce(state, (draftState: any) => {
    const coverageList = lodash.get(draftState, 'processData.coverageList');
    const newCoverageList = lodash.map(coverageList, (coverageItem: any) => ({
      ...coverageItem,
      facultativePackageCode: undefined,
      facultativeReason: undefined,
    }));
    lodash.set(draftState, 'processData.coverageList', newCoverageList);
  });
  return { ...nextState };
};

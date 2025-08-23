import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { id } = lodash.pick(action?.payload, ['id']);
  const coverageList = lodash.get(state, 'modalData.processData.coverageList');
  const finalCoverageList = lodash
    .filter(coverageList, (item) => item.id !== id)
    .map((item, index) => ({ ...item, coverageNum: index + 1 }));
  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, `modalData.processData.coverageList`, finalCoverageList);
  });
  return {
    ...nextState,
  };
};

import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { filterProductTypeList } = lodash.pick(action?.payload, ['filterProductTypeList']);
  const nextState = produce(state, (draftState: any) => {
    if (lodash.size(filterProductTypeList)) {
      const coverageList = lodash.cloneDeep(draftState?.processData.coverageList);

      const newCoverageList = lodash.filter(
        coverageList,
        (item) => !lodash.includes(filterProductTypeList, item?.coreCode)
      );

      lodash.set(draftState, 'processData.coverageList', newCoverageList);
    }
  });

  return {
    ...nextState,
  };
};

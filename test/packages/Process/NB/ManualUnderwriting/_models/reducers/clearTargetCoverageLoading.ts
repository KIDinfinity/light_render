import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { coverageId, coverageLoadingList } = lodash.pick(action?.payload, [
    'coverageId',
    'coverageLoadingList',
  ]);
  const nextState = produce(state, (draftState: any) => {
    const coverageList = lodash
      .chain(state)
      .get('businessData.policyList[0].coverageList', [])
      .map((coverage: any) => {
        if (coverage?.id === coverageId) {
          return {
            ...coverage,
            coverageLoadingList: [
              ...lodash.filter(
                coverageLoadingList,
                (item: any) => item?.loadingFunctionType === 'C'
              ),
            ],
          };
        }
        return coverage;
      })
      .value();
    lodash.set(draftState, 'businessData.policyList[0].coverageList', coverageList);
  });
  return { ...nextState };
};

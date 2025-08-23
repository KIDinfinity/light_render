import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const clientId = lodash.get(action?.payload, 'id');
  const nextState = produce(state, (draftState: any) => {
    const coverageList =
      lodash.get(draftState, 'businessData.policyList[0].coverageList', []) || [];
    const newCoverageList = lodash
      .chain(coverageList)
      .map((item: any) => {
        const coverageInsuredList = lodash.map(item.coverageInsuredList, (data: any) => {
          if (data.clientId === clientId) {
            return { ...data, clientId: null, deleted: 1 };
          }
          return data;
        });
        return { ...item, coverageInsuredList };
      })
      .value();
    lodash.set(draftState, 'businessData.policyList[0].coverageList', newCoverageList);
  });
  return {
    ...nextState,
  };
};

import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { insuredId, coverageId } = lodash.pick(action?.payload, ['insuredId', 'coverageId']);
  const { businessData } = state;
  const coverageList = lodash.get(businessData, 'policyList[0].coverageList');
  const index = lodash.findIndex(coverageList, (item: any) => item?.id === coverageId);
  const finalInsuredList = lodash
    .chain(coverageList)
    .find((item: any) => item?.id === coverageId)
    .get('coverageInsuredList')
    .filter((item: any) => item?.id !== insuredId)
    .value();
  const nextState = produce(state, (draftState: any) => {
    lodash.set(
      draftState,
      `businessData.policyList[0].coverageList[${index}].coverageInsuredList`,
      finalInsuredList
    );
  });
  return {
    ...nextState,
  };
};

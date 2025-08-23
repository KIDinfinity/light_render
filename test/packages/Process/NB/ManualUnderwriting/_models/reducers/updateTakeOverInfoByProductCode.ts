import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { productCodeConfig, policyNo, productCode, id } = lodash.pick(action?.payload, [
    'productCodeConfig',
    'policyNo',
    'productCode',
    'id',
  ]);
  const takeOverInfoData = lodash.filter(productCodeConfig, (item: any) => {
    return item?.productCode === productCode && item?.policyNo === policyNo;
  });

  const nextState = produce(state, (draftState: any) => {
    const takeOverList = lodash.get(draftState, 'businessData.takeOverList');
    const { coverageNo, lifeNo, riderNo } = takeOverInfoData[0];
    const index = lodash.findIndex(takeOverList, (item: any) => item?.id === id);

    const ownPolicySection = lodash.get(draftState, `businessData.takeOverList[${index}]`);
    lodash.set(draftState, `businessData.takeOverList[${index}]`, {
      ...ownPolicySection,
      policyNo,
      productCode,
      coverageNo,
      lifeNo,
      riderNo,
    });
  });

  return {
    ...nextState,
  };
};

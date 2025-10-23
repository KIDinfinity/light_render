import { produce } from 'immer';
import lodash from 'lodash';

const policyListUpdate = (state: any, action: any) => {
  const { policyContractList } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    if (lodash.isArray(policyContractList)) {
      const policyList: any = lodash
        .chain(policyContractList)
        .map((item: any) => ({
          ...item,
          dictCode: item.policyId,
          dictName: item.policyId,
        }))
        // @ts-ignore
        .uniq('policyId')
        .value();
      const policyIdList = lodash.map(policyList, (el: any) => el.policyId);

      draftState.policyList = policyList;
    }
  });

  return { ...nextState };
};

export default policyListUpdate;

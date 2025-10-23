import { produce } from 'immer';
import lodash from 'lodash';

const savePolicyBeneficiaryList = (state: any, action: any) => {
  const { policyBeneficiaryList, clientInfoList } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    if (!lodash.isArray(policyBeneficiaryList)) {
      return;
    }

    draftState.claimProcessData.policyBeneficiaryList = lodash.map(
      policyBeneficiaryList,
      (beneficiary: any) => ({
        ...(lodash.find(clientInfoList, { clientId: beneficiary?.clientId }) || {}),
        ...beneficiary,
      })
    );
  });

  return { ...nextState };
};

export default savePolicyBeneficiaryList;

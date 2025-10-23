import { produce } from 'immer';
import lodash from 'lodash';

const saveBeneficiaryInfo = (state: any, action: any) => {
  const { clientInfoList, policyBeneficiaryList } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    const beneficiariesInfo: any = policyBeneficiaryList.map((beneficiary: any) => {
      const clientInfo = clientInfoList.find(
        (client: any) => client.clientId === beneficiary.clientId
      );
      return {
        ...lodash.pick(beneficiary, 'policyId'),
        ...clientInfo,
      };
    });

    draftState.beneficiariesInfo = lodash
      .chain(beneficiariesInfo)
      .compact()
      .uniqBy((info) => `${info.policyId}_${info.clientId}`)
      .value();
  });
  return { ...nextState };
};

export default saveBeneficiaryInfo;

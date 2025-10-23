import lodash from 'lodash';

import { produce } from 'immer';

const updateCustomerRole = (state: any, { payload }: any) => {
  const { clientInfoList = [] } = payload || {};
  return produce(state, (draftState: any) => {
    const { insuredId } = draftState?.businessData?.insured || {};

    const insuredInfo = lodash.find(clientInfoList, { clientId: insuredId }) || {};

    if (insuredId && !lodash.isEmpty(insuredInfo)) {
      draftState.businessData.insured.customerRole = insuredInfo?.customerRole;
    }

    const { clientId } = draftState?.businessData?.claimant || {};
    const claimantInfo = lodash.find(clientInfoList, { clientId }) || {};

    if (clientId && !lodash.isEmpty(claimantInfo)) {
      draftState.businessData.claimant.customerRole = claimantInfo?.customerRole;
    }

    draftState.clientInfoList = clientInfoList;
  });
};

export default updateCustomerRole;

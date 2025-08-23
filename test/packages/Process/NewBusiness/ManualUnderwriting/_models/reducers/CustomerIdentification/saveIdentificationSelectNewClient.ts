import { produce } from 'immer';
import lodash from 'lodash';
import { Selection } from 'process/NewBusiness/ManualUnderwriting/Pages/CustomerIdentification/Enum';

export default (state: any, action: Object) => {
  const { policyId, clientId } = action?.payload;
  const nextState = produce(state, (draftState: any) => {
    const policyList = lodash.get(draftState, 'customerIdentification.datas.policyList', []);
    const policyIndex = lodash.findIndex(policyList, (item) => item.id === policyId);
    const policyItem = lodash.find(policyList, (item) => item.id === policyId);
    const clientInfoList = lodash.get(policyItem, 'clientInfoList', []);
    const clientIndex = lodash.findIndex(clientInfoList, (item: any) => item?.id === clientId);
    const clientItem = lodash.find(clientInfoList, (item) => item?.id === clientId);
    lodash.set(
      draftState,
      `customerIdentification.datas.policyList[${policyIndex}].clientInfoList[${clientIndex}].newClientFlag`,
      'Y'
    );
    const identificationList = lodash.get(clientItem, 'identificationList', []);
    if (lodash.isArray(identificationList) && identificationList.length) {
      const neweIdentificationList = lodash.map(identificationList, (item: any) => {
        return {
          ...item,
          selection: Selection.N,
        };
      });
      lodash.set(
        draftState,
        `customerIdentification.datas.policyList[${policyIndex}].clientInfoList[${clientIndex}].identificationList`,
        neweIdentificationList
      );
    }
  });
  return { ...nextState };
};

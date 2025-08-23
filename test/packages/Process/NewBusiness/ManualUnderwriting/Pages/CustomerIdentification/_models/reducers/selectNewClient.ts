import { produce } from 'immer';
import lodash from 'lodash';
import { Selection } from '../../Enum';

export default (state: any, action: Object) => {
  const { policyId, clientId } = action?.payload;
  const nextState = produce(state, (draftState: any) => {
    const policyList = lodash.get(draftState, 'claimProcessData.policyList', []);
    const policyIndex = lodash.findIndex(policyList, (item) => item.id === policyId);
    const policyItem = lodash.find(policyList, (item) => item.id === policyId);
    const clientInfoList = lodash.get(policyItem, 'clientInfoList', []);
    const clientIndex = lodash.findIndex(clientInfoList, (item: any) => item?.id === clientId);
    const clientItem = lodash.find(clientInfoList, (item) => item?.id === clientId);

    lodash.merge(draftState, {
      claimProcessData: {
        policyList: {
          [policyIndex]: {
            clientInfoList: {
              [clientIndex]: {
                newClientFlag: 'Y',
                updateClientOption: 'UCTE',
              },
            },
          },
        },
      },
    });
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
        `claimProcessData.policyList[${policyIndex}].clientInfoList[${clientIndex}].identificationList`,
        neweIdentificationList
      );
    }
  });
  return { ...nextState };
};

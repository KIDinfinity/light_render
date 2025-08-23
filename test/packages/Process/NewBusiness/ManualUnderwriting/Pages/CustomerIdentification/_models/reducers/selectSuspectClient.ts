import { produce } from 'immer';
import lodash from 'lodash';
import { Selection } from '../../Enum';

export default (state: any, action: Object) => {
  const { policyId, identificationId, clientId } = action?.payload;
  const nextState = produce(state, (draftState: any) => {
    const policyList = lodash.get(draftState, 'claimProcessData.policyList', []);
    const policyIndex = lodash.findIndex(policyList, (item) => item.id === policyId);
    const policyItem = lodash.find(policyList, (item) => item.id === policyId);
    const clientInfoList = lodash.get(policyItem, 'clientInfoList', []);
    const clientIndex = lodash.findIndex(clientInfoList, (item: any) => item?.id === clientId);
    const clientItem = lodash.find(clientInfoList, (item) => item?.id === clientId);
    const identificationList = lodash.get(clientItem, 'identificationList', []);
    lodash.merge(draftState, {
      claimProcessData: {
        policyList: {
          [policyIndex]: {
            clientInfoList: {
              [clientIndex]: {
                newClientFlag: 'N',
              },
            },
          },
        },
      },
    });
    const newIndentificationList = lodash.map(identificationList, (item: any) => {
      if (item.id === identificationId) {
        return {
          ...item,
          selection: Selection.Y,
        };
      }
      return {
        ...item,
        selection: Selection.N,
      };
    });
    lodash.set(
      draftState,
      `claimProcessData.policyList[${policyIndex}].clientInfoList[${clientIndex}].identificationList`,
      newIndentificationList
    );
  });
  return { ...nextState };
};

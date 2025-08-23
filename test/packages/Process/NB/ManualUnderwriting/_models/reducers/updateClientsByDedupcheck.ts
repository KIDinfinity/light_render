import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const customerIndentificationData = lodash.get(action, 'payload.customerIndentificationData', {});
  const dedupCheckClientInfoList = lodash.get(
    customerIndentificationData,
    'policyList[0].clientInfoList',
    []
  );
  const nextState = produce(state, (draftState: any) => {
    const originClientInfoList = lodash
      .chain(state)
      .get('businessData.policyList[0].clientInfoList')
      .value();
    const clientSet = new Set();
    lodash.forEach(originClientInfoList, (client: any) => {
      if (lodash.some(dedupCheckClientInfoList, (item: any) => item.id === client.id)) {
        const targetItem = lodash.find(
          dedupCheckClientInfoList,
          (item: any) => item.id === client.id
        );
        clientSet.add(targetItem);
      } else {
        clientSet.add(client);
      }
    });
    const clientInfoList = Array.from(clientSet);
    lodash.set(draftState, 'businessData.policyList[0].clientInfoList', clientInfoList);
  });

  return { ...nextState };
};

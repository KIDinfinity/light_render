import lodash from 'lodash';
import { produce }  from 'immer';

export default (state: any, action: any) => {
  const clientInfoList = lodash.get(
    action?.payload,
    'businessData.policyList[0].clientInfoList',
    []
  );
  const nextState = produce(state, (draftState: any) => {
    const originClientInfoList = lodash.get(
      draftState,
      'businessData.policyList[0].clientInfoList'
    );
    const clientSet = new Set();
    lodash.forEach(originClientInfoList, (client: any) => {
      if (lodash.some(clientInfoList, (item: any) => item.id === client.id)) {
        const targetItem = lodash.find(clientInfoList, (item: any) => item.id === client.id);
        clientSet.add(targetItem);
      } else {
        clientSet.add(client);
      }
    });
    const clientInfoListFinally = Array.from(clientSet);
    lodash.set(draftState, 'businessData.policyList[0].clientInfoList', clientInfoListFinally);
  });
  return { ...nextState };
};

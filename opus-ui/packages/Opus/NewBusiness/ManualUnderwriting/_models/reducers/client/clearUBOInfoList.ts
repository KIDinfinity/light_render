import CustomerRole from 'basic/enum/CustomerRole';
import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any) => {
  const nextState = produce(state, (draftState: any) => {
    const clientMap = draftState.modalData.entities.clientMap;
    const uboInfoList = lodash
      .values(clientMap)
      .filter((item: any) => {
        return lodash.isEqual(item.personalInfo.customerRole, [CustomerRole.UBO]);
      })
      .map((client) => client.id);

    lodash.forEach(uboInfoList, (id: string) => {
      delete draftState.modalData.entities.clientMap[id];
    });

    draftState.modalData.processData.clientInfoList =
      draftState.modalData.processData.clientInfoList.filter(
        (clientId: string) => !uboInfoList.includes(clientId)
      );
  });

  return {
    ...nextState,
  };
};

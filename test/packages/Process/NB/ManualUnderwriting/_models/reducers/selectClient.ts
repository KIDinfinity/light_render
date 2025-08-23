import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { id } = lodash.pick(action?.payload, ['id']);
  let id_index: number | null = null;
  const nextState = produce(state, (draftState: any) => {
    const list =
      lodash.chain(draftState).get('businessData.policyList[0].clientInfoList', []).value() || [];
    const expendedClientItem = list.find((item: any, index: number) => {
      id_index = index;
      return item?.id === id;
    });

    if (expendedClientItem && !lodash.isNil(id_index)) {
      // 点击其他client，则remove当前没有勾选role的client
      const currentClient = lodash.get(list, '[0].roleList')
      const isEmptyRoleList = lodash.chain(currentClient)
        .filter(roleData => !roleData.deleted)
        .isEmpty()
        .value();
      if (isEmptyRoleList) {
        currentClient.deleted = 1;
      }

      const tempList = list.splice(0, id_index);
      lodash.set(draftState, 'businessData.policyList[0].clientInfoList', [...list, ...tempList]);
      const { expendedClient } = draftState;
      if (expendedClient) {
        lodash.set(draftState, 'expendedClient', id);
      }
    }
  });
  return {
    ...nextState,
  };
};

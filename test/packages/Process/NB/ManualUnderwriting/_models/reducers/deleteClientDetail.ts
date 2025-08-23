import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const id = lodash.get(action?.payload, 'id');
  const nextState = produce(state, (draftState: any) => {
    let clientInfoList =
      lodash.get(draftState, 'businessData.policyList[0].clientInfoList', []) || [];
    lodash
      .chain(clientInfoList)
      .find((item: any) => item?.id === id)
      .set('deleted', 1)
      .value();
    //过滤掉手动添加又删除掉的client
    clientInfoList = lodash.filter(clientInfoList, (item: any) => {
      return !(item.deleted && item.isManuallyAdded);
    });
    lodash.set(draftState, 'businessData.policyList[0].clientInfoList', clientInfoList);
  });

  return {
    ...nextState,
  };
};

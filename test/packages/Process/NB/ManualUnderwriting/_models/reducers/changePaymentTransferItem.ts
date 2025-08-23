import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, { payload }: any) => {
  const { id, changedFields } = lodash.pick(payload, ['id', 'changedFields']);

  const nextState = produce(state, (draftState: any) => {
    const premiumTransferList = lodash.get(
      draftState,
      'businessData.policyList[0].premiumTransferList',
      []
    );
    const newData = lodash.map(premiumTransferList, (item: any) => {
      if (item?.id === id) {
        return {
          ...item,
          ...changedFields,
        };
      }
      return item;
    });
    lodash.set(draftState, 'businessData.policyList[0].premiumTransferList', newData);
  });
  return { ...nextState };
};

import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { id } = action?.payload;
  const nextState = produce(state, (draftState: any) => {
    const premiumTransferList = lodash.get(
      draftState,
      'businessData.policyList[0].premiumTransferList'
    );
    const index = lodash.findIndex(premiumTransferList, (item: any) => item?.id === id);
    if (premiumTransferList.length === 1) {
      const itemId = lodash.get(
        draftState,
        `businessData.policyList[0].premiumTransferList[${index}].id`
      );
      lodash.set(draftState, `businessData.policyList[0].premiumTransferList[${index}]`, {
        id: itemId,
      });
    } else {
      lodash.set(
        draftState,
        `businessData.policyList[0].premiumTransferList`,
        lodash.filter(premiumTransferList, (item) => item.id !== id)
      );
    }
  });
  return { ...nextState };
};

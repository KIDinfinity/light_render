import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, { payload }: any) => {
  const { id, changedFields } = lodash.pick(payload, ['id', 'changedFields']);

  const nextState = produce(state, (draftState: any) => {
    draftState.modalData.processData.premiumTransferList = lodash.map(
      draftState.modalData.processData.premiumTransferList,
      (item: any) => {
        if (item?.id === id) {
          return {
            ...item,
            ...changedFields,
          };
        }
        return item;
      }
    );
  });
  return { ...nextState };
};

import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { id } = action?.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.modalData.processData.premiumTransferList = lodash.filter(
      draftState.modalData.processData.premiumTransferList,
      (item) => item.id !== id
    );
  });
  return { ...nextState };
};

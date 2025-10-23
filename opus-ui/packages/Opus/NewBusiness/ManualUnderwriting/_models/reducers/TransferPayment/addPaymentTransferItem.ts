import { produce } from 'immer';
import lodash from 'lodash';
import { v4 as uuid } from 'uuid';

export default (state: any, action: any) => {
  const changedFields = lodash.get(action?.payload, 'changedFields');
  const nextState = produce(state, (draftState: any) => {
    const list = draftState.modalData.processData.premiumTransferList || [];

    draftState.modalData.processData.premiumTransferList = [
      ...list,
      {
        id: uuid(),
        ...changedFields,
      },
    ];
  });
  return { ...nextState };
};

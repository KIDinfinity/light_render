import { produce } from 'immer';
import lodash from 'lodash';

const addApplicationItem = (state: any, action: any) => {
  const { addApplicationItem } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    const defaultValue = lodash.pick(draftState.claimProcessData, [
      'recipientAddress',
      'recipientName',
      'recipientPostCode',
    ]);

    draftState.claimProcessData.applicationList = [
      ...(draftState.claimProcessData.applicationList || []),
      addApplicationItem.id,
    ];

    draftState.claimEntities.applicationListMap[addApplicationItem.id] = {
      ...addApplicationItem,
      ...defaultValue,
    };
  });

  return { ...nextState };
};

export default addApplicationItem;

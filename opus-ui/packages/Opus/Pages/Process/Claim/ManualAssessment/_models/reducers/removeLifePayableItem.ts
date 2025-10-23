import { produce } from 'immer';
import lodash from 'lodash';

const removeLifePayableItem = (state: any, action: any) => {
  const { claimIncidentPayableId } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    lodash.set(
      draftState,
      'claimProcessData.claimPayableList',
      lodash.filter(
        draftState.claimProcessData?.claimPayableList,
        (id) => id !== claimIncidentPayableId
      )
    );
    delete draftState.claimEntities.claimPayableListMap[claimIncidentPayableId];
  });
  return { ...nextState };
};

export default removeLifePayableItem;

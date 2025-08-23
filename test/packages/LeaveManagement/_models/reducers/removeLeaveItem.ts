import { produce }  from 'immer';
import lodash from 'lodash';

const removeLeaveItem = (state: any, action: any) => {
  const { id } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.businessData.details = lodash.filter(
      draftState.businessData.details,
      (item: any) => item.id !== id
    );
  });

  return { ...nextState };
};

export default removeLeaveItem;

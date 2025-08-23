import { produce }  from 'immer';
import defaultLeaveitem from '../../Utils/defaultLeaveitem';

const addLeaveItem = (state: any, action: any) => {
  const { caseNo } = action.payload;
  const nextState = produce(state, (draftState) => {
    draftState.businessData.details = [
      ...draftState.businessData.details,
      defaultLeaveitem(caseNo),
    ];
  });

  return { ...nextState };
};

export default addLeaveItem;

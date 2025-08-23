import { PAYEEINFO } from '@/utils/claimConstant';
import{ v4 as  uuidv4 } from 'uuid';
import { produce } from 'immer';

const addPayeeInfoItem = (state: any) => {
  const nextState = produce(state, (draftState: any) => {
    const id = uuidv4();
    const payeeInfoItem = {
      ...PAYEEINFO,
      isAdd: true,
      id,
    };
    draftState.claimProcessData.payeeList = [...draftState.claimProcessData.payeeList, id];
    draftState.claimEntities.payeeListMap[id] = payeeInfoItem;
  });
  return { ...nextState };
};

export default addPayeeInfoItem;

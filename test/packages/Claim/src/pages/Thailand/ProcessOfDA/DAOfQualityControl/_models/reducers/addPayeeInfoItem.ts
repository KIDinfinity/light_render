import { PAYEEINFO } from '@/utils/claimConstant';
import{ v4 as  uuidv4 } from 'uuid';
import { produce } from 'immer';
import { compact } from 'lodash';

const addPayeeInfoItem = (state: any) => {
  const nextState = produce(state, (draftState: any) => {
    const id = uuidv4();
    const payeeInfoItem = {
      ...PAYEEINFO,
      isAdd: true,
      id,
    };
    // debugger;
    draftState.claimProcessData.payeeList = [...compact(draftState.claimProcessData.payeeList), id];
    draftState.claimEntities.payeeListMap[id] = payeeInfoItem;
  });
  return { ...nextState };
};

export default addPayeeInfoItem;

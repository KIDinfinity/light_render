import { produce }  from 'immer';
import { v4 as uuid } from 'uuid';
import lodash from 'lodash';

export default (state: any) => {
  const nextState = produce(state, (draftState: any) => {
    const takeOverList = lodash.get(draftState, 'businessData.takeOverList', []) || [];
    lodash.set(draftState, `businessData.takeOverList`, [
      ...takeOverList,
      {
        id: uuid(),
      },
    ]);
  });
  return {
    ...nextState,
  };
};

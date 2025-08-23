import { produce } from 'immer';
import lodash from 'lodash';

const saveNewPayee = (state: any) => {
  const nextState = produce(state, (draftState: any) => {
    lodash.forEach(draftState?.claimEntities?.payeeListMap, (item: any) => {
      lodash.set(draftState?.claimEntities?.payeeListMap, `${item.id}.select`, 0);
    });
  });

  return { ...nextState };
};

export default saveNewPayee;

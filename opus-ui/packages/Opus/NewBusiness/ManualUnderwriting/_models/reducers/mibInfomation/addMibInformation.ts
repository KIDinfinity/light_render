import { produce } from 'immer';
import lodash from 'lodash';
import { v4 as uuid } from 'uuid';

export default (state: any, action: any) => {
  const nextState = produce(state, (draftState: any) => {
    const mibInfoList = lodash.chain(draftState).get('processData.mibInfoList', []).value();
    lodash.set(draftState, `processData.mibInfoList`, [
      ...mibInfoList,
      {
        id: uuid(),
      },
    ]);
  });
  return {
    ...nextState,
  };
};

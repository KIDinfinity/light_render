import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const id = action?.payload?.id;
  const nextState = produce(state, (draftState: any) => {
    const mibInfoList = lodash
      .chain(draftState)
      .get('processData.mibInfoList')
      .filter((item: any) => item.id !== id)
      .value();
    lodash.set(draftState, `processData.mibInfoList`, [...mibInfoList]);
  });
  return {
    ...nextState,
  };
};

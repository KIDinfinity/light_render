import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { numberofunitsList } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.numberofunitsList = lodash.unionBy(
      draftState.numberofunitsList,
      numberofunitsList,
      'productCode'
    );
  });
  return { ...nextState };
};

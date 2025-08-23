import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { currencyCode } = action?.payload;

  const nextState = produce(state, (draftState: any) => {
    if (!lodash.isEmpty(currencyCode)) {
      lodash.set(draftState, `currencyCode`, currencyCode);
    }
  });
  return {
    ...nextState,
  };
};

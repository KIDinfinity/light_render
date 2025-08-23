import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { riskIndicatorConfigList } = action?.payload;
  const nextState = produce(state, (draftState: any) => {
    return lodash.set(draftState, `riskIndicatorConfigList`, riskIndicatorConfigList);
  });
  return { ...nextState };
};

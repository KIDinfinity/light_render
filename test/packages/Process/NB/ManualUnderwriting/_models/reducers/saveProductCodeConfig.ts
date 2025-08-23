import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { productCodeConfig, policyNo } = lodash.pick(action?.payload, [
    'productCodeConfig',
    'policyNo',
  ]);
  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, `productCodeConfig.${policyNo}`, productCodeConfig);
  });
  return {
    ...nextState,
  };
};

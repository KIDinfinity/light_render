import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { defaultValue, codeType } = action?.payload;
  console.log('saveRegionalDefaultValue', defaultValue, codeType);
  const nextState = produce(state, (draftState: any) => {
    return lodash.set(draftState, `regionalDefaultValue.${codeType}`, defaultValue);
  });
  return { ...nextState };
};

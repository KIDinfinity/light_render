import { produce } from 'immer';
import lodash from 'lodash';

const saveHasChangeSection = (state: any, action: any) => {
  const { sectionName, value, key } = lodash.pick(action?.payload, ['sectionName', 'value', 'key'])
  const nextState = produce(state, (draftState: any) => {
      lodash.set(draftState, `claimProcessData.hasChangeSection.${sectionName}.${key}`, value)
  });
  return { ...nextState };
};

export default saveHasChangeSection;

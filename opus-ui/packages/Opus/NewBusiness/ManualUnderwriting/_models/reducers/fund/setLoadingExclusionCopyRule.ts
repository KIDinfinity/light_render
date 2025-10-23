import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { loadingExclusionCopyRule } = action?.payload;
  const nextState = produce(state, (draftState: any) => {
    const loadingCopyRule = loadingExclusionCopyRule.filter(
      (item) => item.type === 'loading' || !item.type
    );
    const exclusionCopyRule = loadingExclusionCopyRule.filter((item) => item.type === 'exclusion');
    lodash.set(draftState, 'loadingCopyRule', loadingCopyRule);
    lodash.set(draftState, 'exclusionCopyRule', exclusionCopyRule);
  });
  return { ...nextState };
};

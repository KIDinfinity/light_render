import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { changedFields } = lodash.pick(action?.payload, ['changedFields']);
  const nextState = produce(state, (draftState: any) => {
    const productSection = lodash.get(draftState, 'productSection', {});
    lodash.set(draftState, 'productSection', {
      ...productSection,
      ...changedFields,
    });
  });
  return { ...nextState };
};

import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { indentificationModalVisible } = action?.payload;
  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'indentificationModalVisible', indentificationModalVisible);
  });
  return { ...nextState };
};

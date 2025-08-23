
import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { isShowFATCADeclaration } = action?.payload;

  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, `isShowFATCADeclaration`, isShowFATCADeclaration);
  });

  return {
    ...nextState,
  };
};

import lodash from 'lodash';
import { produce } from 'immer';

export default (state: any, action: any) => {
  const isExportLoading = action?.payload?.isExportLoading;
  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'isExportLoading', isExportLoading);
  });
  return { ...nextState };
};

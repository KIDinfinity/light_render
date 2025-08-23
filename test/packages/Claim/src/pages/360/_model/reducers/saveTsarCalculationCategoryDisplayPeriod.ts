import loadsh from 'lodash';
import { produce } from 'immer';

export default (state: any, action: any) => {
  const tsarCalculationCategoryDisplayPeriod = loadsh.get(
    action,
    'payload.tsarCalculationCategoryDisplayPeriod'
  );
  const nextState = produce(state, (draftState: any) => {
    loadsh.set(
      draftState,
      'tsarCalculationCategoryDisplayPeriod',
      tsarCalculationCategoryDisplayPeriod
    );
  });
  return { ...nextState };
};

import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const showHospitalCategorySelect = lodash.get(action, 'payload.showHospitalCategorySelect');
  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'showHospitalCategorySelect', showHospitalCategorySelect);
  });
  return {
    ...nextState,
  };
};

import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, _: any) => {
  const hospitalCategory = lodash.get(state, 'originBusinessData.hospitalCategory');
  const nextState = produce(state, (draftState: any) => {
    if (lodash.isEmpty(hospitalCategory)) {
      lodash.set(draftState, 'showHospitalCategorySelect', true);
    } else {
      lodash.set(draftState, 'showHospitalCategorySelect', false);
    }
  });
  return {
    ...nextState,
  };
};

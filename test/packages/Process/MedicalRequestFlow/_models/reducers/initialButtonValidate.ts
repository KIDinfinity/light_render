import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const nextState = produce(state, (draftState: any) => {
    const haveApprovalData = lodash
      .chain(state)
      .get('businessData.appointmentDateList')
      .find((item: any) => item.status === 'Approval')
      .value();
    const status = lodash.get(action, 'payload.businessData.status');
    if (!lodash.isEmpty(haveApprovalData) || status === 'Completed') {
      lodash.set(draftState, 'buttonValidate', false);
      lodash.set(draftState, 'showHospitalCategorySelect', false);
    } else {
      lodash.set(draftState, 'buttonValidate', true);
    }
  });
  return {
    ...nextState,
  };
};

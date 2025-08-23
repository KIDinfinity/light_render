import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { PosDecesionType } from '../../Enum';

const updatePosApproval = (state: any, action: any) => {
  const { changedFields } = action.payload;

  const fields = formUtils.cleanValidateData(changedFields);
  let result = { ...changedFields };
  if (
    lodash.has(fields, 'posDecision') &&
    lodash.get(fields, 'posDecision') === PosDecesionType.Accepted
  ) {
    result = {
      ...changedFields,
      declineReason: '',
    };
  }
  const nextState = produce(state, (draftState: any) => {
    // eslint-disable-next-line no-param-reassign
    draftState.claimProcessData.posDataDetail.approvalPosDecision = {
      ...draftState.claimProcessData.posDataDetail.approvalPosDecision,
      ...result,
    };
  });

  return { ...nextState };
};

export default updatePosApproval;

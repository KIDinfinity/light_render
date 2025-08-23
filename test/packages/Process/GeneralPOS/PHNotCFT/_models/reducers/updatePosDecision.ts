import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { PosDecesionType } from '../../Enum';

const updatePosDecision = (state: any, action: any) => {
  const { changedFields } = action.payload;

  const fields = formUtils.cleanValidateData(changedFields);
  let result = { ...changedFields };
  if (
    lodash.has(fields, 'decision') &&
    lodash.get(fields, 'decision') === PosDecesionType.Accepted
  ) {
    result = {
      ...changedFields,
      declineReason: '',
    };
  }

  const nextState = produce(state, (draftState: any) => {
    // eslint-disable-next-line no-param-reassign
    draftState.claimProcessData.businessData.transactionTypes[0] = {
      ...draftState.claimProcessData.businessData.transactionTypes[0],
      ...result,
    };
  });

  return { ...nextState };
};

export default updatePosDecision;

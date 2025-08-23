import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { calculationIssuanceDPolicyChargeFee } from '../functions/calculatAmount';
import { RequestTypeCode } from '../../Enum/IssuanceDuplicatePolicy';

const updateIssuanceDuplicatePolicy = (state: any, action: any) => {
  const { changedFields } = action.payload;
  const fields = formUtils.cleanValidateData(changedFields);

  let result = { ...changedFields };

  const nextState = produce(state, (draftState: any) => {
    const { freeOfChange, timeOfReplacement, regenerateContract } =
      draftState.claimProcessData?.posDataDetail?.requestForIssuanceOfDuplicatePolicy || {};

    if (lodash.has(fields, 'freeOfChange')) {
      result = {
        ...result,
        chargeFee: calculationIssuanceDPolicyChargeFee(
          Boolean(fields.freeOfChange),
          Number(formUtils.queryValue(timeOfReplacement))
        ),
      };
    }
    if (lodash.has(fields, 'timeOfReplacement')) {
      const times = Number(fields.timeOfReplacement);
      const extraData =
        !times || times === 1
          ? {
              freeOfChange: null,
            }
          : {};
      result = {
        ...result,
        chargeFee: calculationIssuanceDPolicyChargeFee(Boolean(formUtils.queryValue(freeOfChange)), times),
        ...extraData,
      };
    }

    if (lodash.has(fields, 'requestType')) {
      const {requestType} = fields;
      if (requestType === RequestTypeCode.OriginalPolicy && formUtils.queryValue(regenerateContract)) {
        result = {
          ...result,
          regenerateContract: null,
        };
      }
    }

    if (lodash.has(fields, 'sendTo')) {
      const {
        branchCode,
      } = draftState.claimProcessData.posDataDetail.requestForIssuanceOfDuplicatePolicy;
      const value = formUtils.queryValue(changedFields.sendTo);
      if (value !== 'B' && lodash.isPlainObject(branchCode))
        result = { ...changedFields, branchCode: '' };
    }
    // eslint-disable-next-line no-param-reassign
    draftState.claimProcessData.posDataDetail.requestForIssuanceOfDuplicatePolicy = {
      ...draftState.claimProcessData.posDataDetail.requestForIssuanceOfDuplicatePolicy,
      ...result,
    };
  });

  return { ...nextState };
};

export default updateIssuanceDuplicatePolicy;

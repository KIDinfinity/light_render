/* eslint-disable no-param-reassign */

/**
 * PopUpPable - 更新 - base
 */
import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { splitBenefitTypeCode } from 'basic/utils/PolicyUtils';
const popUpPableUpdateBase = (state: any, { payload }: any) => {
  const { changedFields } = payload;

  const nextState = produce(state, (draftState: any) => {
    let extra = {};

    if (lodash.size(changedFields) === 1) {
      if (lodash.has(changedFields, 'claimDecision')) {
        extra = {
          policyNo: '',
          benefitTypeCode: '',
          productCode: '',
        };
      }
      if (lodash.has(changedFields, 'claimDecision')) {
        extra = {
          benefitTypeCode: '',
        };
      }

      if (lodash.has(changedFields, 'policyNo')) {
        extra = {
          productCode: '',
          oldBenefitTypeCode: '',
        };
      }

      if (lodash.has(changedFields, 'productCode')) {
        extra = {
          oldBenefitTypeCode: '',
        };
      }

      if (lodash.has(changedFields, 'oldBenefitTypeCode')) {
        const value = formUtils.queryValue(changedFields.oldBenefitTypeCode);
        extra = {
          ...splitBenefitTypeCode(value),
        };
      }
    }

    draftState.popUpPayable.basic = {
      ...draftState.popUpPayable.basic,
      ...changedFields,
      ...extra,
    };
    draftState.popUpPayable.benefitListMap = {};
  });

  return { ...nextState };
};

export default popUpPableUpdateBase;

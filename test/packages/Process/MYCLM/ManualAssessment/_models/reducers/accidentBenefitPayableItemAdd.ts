import { produce } from 'immer';
import lodash from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { ACCIDENT_BENEFIT_PAYABLE_ITEM } from '@/utils/claimConstant';

const accidentBenefitPayableItemAdd = (state: any, action: any) => {
  const nextState = produce(state, (draftState: any) => {
    const { treatmentPayableId } = action.payload;
    const treatmentPayableItem =
      draftState?.claimEntities?.treatmentPayableListMap?.[treatmentPayableId];
    const {
      policyNo,
      productCode,
      benefitTypeCode,
      incidentId,
      treatmentId,
      payableId,
      id,
      claimNo,
    } = treatmentPayableItem;
    const accidentBenefitItemId = uuidv4();
    const accidentBenefitPayableItem = {
      ...ACCIDENT_BENEFIT_PAYABLE_ITEM,
      treatmentId,
      treatmentPayableId: id,
      payableId,
      incidentId,
      policyNo,
      productCode,
      benefitTypeCode,
      isAdd: true,
      manualAdd: 'Y',
      claimNo,
      id: accidentBenefitItemId,
    };
    treatmentPayableItem.accidentBenefitPayableList = [
      ...lodash.compact(lodash.get(treatmentPayableItem, 'accidentBenefitPayableList')),
      accidentBenefitItemId,
    ];
    draftState.claimEntities.accidentBenefitPayableListMap[
      accidentBenefitItemId
    ] = accidentBenefitPayableItem;
  });
  return { ...nextState };
};

export default accidentBenefitPayableItemAdd;

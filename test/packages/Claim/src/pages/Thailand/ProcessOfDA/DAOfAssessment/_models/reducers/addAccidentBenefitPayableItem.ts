import { produce } from 'immer';
import lodash from 'lodash';
import{ v4 as  uuidv4 } from 'uuid';
import Ienum from 'claim/enum';
import { ACCIDENT_BENEFIT_PAYABLE_ITEM } from '@/utils/claimConstant';

const addAccidentBenefitPayableItem = (state: any, action: any) => {
  const { idAssemble } = action.payload;
  const accidentBenefitPayableItem = {
    ...ACCIDENT_BENEFIT_PAYABLE_ITEM,
    ...idAssemble,
    isAdd: true,
    manualAdd: 'Y',
    id: uuidv4(),
    operation: Ienum.Operation.A,
  };

  const nextState = produce(state, (draftState: any) => {
    const { treatmentPayableId, id } = accidentBenefitPayableItem;

    const treatmentPayable = lodash.get(
      draftState,
      `claimEntities.treatmentPayableListMap.${treatmentPayableId}`
    );
    treatmentPayable.accidentBenefitPayableList = [
      ...lodash.compact(lodash.get(treatmentPayable, 'accidentBenefitPayableList')),

      id,
    ];
    draftState.claimEntities.accidentBenefitPayableListMap[id] = {
      ...accidentBenefitPayableItem,
      productPlan: treatmentPayable?.productPlan,
    };
  });
  return { ...nextState };
};

export default addAccidentBenefitPayableItem;

import { produce } from 'immer';
import lodash from 'lodash';
import{ v4 as  uuidv4 } from 'uuid';
import { ACCIDENT_BENEFIT_PAYABLE_ITEM } from '@/utils/claimConstant';
import { SwitchEnum } from 'claim/pages/utils/claim';

const addAccidentBenefitPayableItem = (state: any, action: any) => {
  const { idAssemble } = action.payload;
  const accidentBenefitPayableItem = {
    ...ACCIDENT_BENEFIT_PAYABLE_ITEM,
    ...idAssemble,
    id: uuidv4(),
    manualAdd: SwitchEnum.YES,
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
    draftState.claimEntities.accidentBenefitPayableListMap[id] = accidentBenefitPayableItem;
  });
  return { ...nextState };
};

export default addAccidentBenefitPayableItem;

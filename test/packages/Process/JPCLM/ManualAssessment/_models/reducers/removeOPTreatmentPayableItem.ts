import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { add } from '@/utils/precisionUtils';

const updataPayableAmount = ({ draft, treatmentPayableId }) => {
  const opTreatmentPayableList = lodash.filter(
    draft.claimEntities.opTreatmentPayableListMap,
    (item: any) => item.treatmentPayableId === treatmentPayableId
  );

  const changePayable = {
    payableAmount: 0,
    systemCalculationAmount: 0,
  };

  lodash.forEach(opTreatmentPayableList, (item: any) => {
    changePayable.payableAmount = add(
      formUtils.queryValue(item?.payableAmount),
      changePayable.payableAmount
    );
    changePayable.systemCalculationAmount = add(
      formUtils.queryValue(item?.systemCalculationAmount),
      changePayable.systemCalculationAmount
    );
  });

  draft.claimEntities.treatmentPayableListMap[treatmentPayableId] = {
    ...draft.claimEntities.treatmentPayableListMap[treatmentPayableId],
    ...changePayable,
  };
};

const updataPayableDays = ({ draft, treatmentPayableId }) => {
  const opTreatmentPayableList = lodash.filter(
    draft.claimEntities.opTreatmentPayableListMap,
    (item: any) => item.treatmentPayableId === treatmentPayableId
  );

  let newPayableDays = 0;
  lodash.forEach(opTreatmentPayableList, (item: any) => {
    newPayableDays = add(formUtils.queryValue(item?.payableDays), newPayableDays);
  });

  draft.claimEntities.treatmentPayableListMap[treatmentPayableId].payableDays = newPayableDays;
};

const removeOPTreatmentPayableItem = (state: any, action: any) => {
  const { treatmentPayableId, opTreatmentPayableId } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    const draft = draftState;

    draft.claimEntities.treatmentPayableListMap[
      treatmentPayableId
    ].opTreatmentPayableList = lodash.filter(
      draft.claimEntities?.treatmentPayableListMap?.[treatmentPayableId]?.opTreatmentPayableList ||
        [],
      (item) => item !== opTreatmentPayableId
    );

    delete draft.claimEntities.opTreatmentPayableListMap[opTreatmentPayableId];
    updataPayableAmount({ draft, treatmentPayableId });
    updataPayableDays({ draft, treatmentPayableId });
  });

  return { ...nextState };
};

export default removeOPTreatmentPayableItem;

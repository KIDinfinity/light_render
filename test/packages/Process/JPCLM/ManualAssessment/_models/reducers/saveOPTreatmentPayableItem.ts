import { produce }  from 'immer';
import lodash from 'lodash';
import moment from 'moment';
import { formUtils } from 'basic/components/Form';
import { add, multiply } from '@/utils/precisionUtils';
import { ClaimDecision } from 'claim/pages/utils/claim';
const updataPayableAmount = ({
  draft,
  treatmentPayableId,
  changedFields,
  opTreatmentPayableId,
}) => {
  const opTreatmentPayableList = lodash.filter(
    draft.claimEntities.opTreatmentPayableListMap,
    (item: any) => item.treatmentPayableId === treatmentPayableId
  );
  let newPayableAmount = lodash.isNil(formUtils.queryValue(changedFields?.assessorOverrideAmount))
    ? formUtils.queryValue(opTreatmentPayableList?.[opTreatmentPayableId]?.payableAmount)
    : formUtils.queryValue(changedFields?.assessorOverrideAmount);

  lodash.forEach(opTreatmentPayableList, (item: any) => {
    if (opTreatmentPayableId !== item.id) {
      newPayableAmount = add(formUtils.queryValue(item?.payableAmount), newPayableAmount);
    }
  });

  draft.claimEntities.treatmentPayableListMap[treatmentPayableId].payableAmount = newPayableAmount;
  draft.claimEntities.treatmentPayableListMap[
    treatmentPayableId
  ].assessorOverrideAmount = newPayableAmount;
};

const updataPayableDays = ({ draft, treatmentPayableId, changedFields, opTreatmentPayableId }) => {
  const opTreatmentPayableList = lodash.filter(
    draft.claimEntities.opTreatmentPayableListMap,
    (item: any) => item.treatmentPayableId === treatmentPayableId
  );

  let newPayableDays = lodash.isNil(formUtils.queryValue(changedFields?.assessorOverrideDays))
    ? formUtils.queryValue(opTreatmentPayableList?.[opTreatmentPayableId]?.payableDays)
    : formUtils.queryValue(changedFields?.assessorOverrideDays);

  lodash.forEach(opTreatmentPayableList, (item: any) => {
    if (opTreatmentPayableId !== item.id) {
      newPayableDays = add(formUtils.queryValue(item?.payableDays), newPayableDays);
    }
  });

  draft.claimEntities.treatmentPayableListMap[treatmentPayableId].payableDays = newPayableDays;
};

const saveOPTreatmentPayableItem = (state: any, action: any) => {
  const { changedFields, opTreatmentPayableId, treatmentPayableId, treatmentId } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    const draft = draftState;

    if (lodash.size(changedFields) === 1) {
      if (lodash.has(changedFields, 'assessorOverrideDays')) {
        changedFields.payableDays = formUtils.queryValue(changedFields?.assessorOverrideDays);
        updataPayableDays({ draft, treatmentPayableId, changedFields, opTreatmentPayableId });

        const claimDecisionMap = {
          [1]: ClaimDecision.approve,
          [-1]: ClaimDecision.deny,
          [0]: ClaimDecision.deny,
        };
        changedFields.claimDecision = claimDecisionMap[changedFields.payableDays];
      }
      if (lodash.has(changedFields, 'assessorOverrideAmount')) {
        changedFields.payableAmount = formUtils.queryValue(changedFields?.assessorOverrideAmount);
        updataPayableAmount({ draft, treatmentPayableId, changedFields, opTreatmentPayableId });
      }
      if (lodash.has(changedFields, 'payableDays')) {
        const listPolicy = draft.listPolicy;
        const { policyNo, productCode } = lodash.pick(
          draft.claimEntities.treatmentPayableListMap[treatmentPayableId],
          ['policyNo', 'productCode']
        );
        const sumAssured = lodash.find(listPolicy, {
          coreProductCode: formUtils.queryValue(productCode),
          policyNo: formUtils.queryValue(policyNo),
        })?.sumAssured;

        changedFields.assessorOverrideAmount = multiply(
          formUtils.queryValue(changedFields.payableDays),
          sumAssured
        );
        changedFields.payableAmount = multiply(
          formUtils.queryValue(changedFields.payableDays),
          sumAssured
        );
        updataPayableAmount({ draft, treatmentPayableId, changedFields, opTreatmentPayableId });
      }

      if (lodash.has(changedFields, 'dateOfConsultation')) {
        const opTreatmentItem = lodash
          .chain(draft.claimEntities?.treatmentListMap?.[treatmentId]?.opTreatmentList)
          .map((item) => ({
            ...item,
            outpatientTreatmentDate: moment(item.outpatientTreatmentDate).valueOf(),
          }))
          .find({
            outpatientTreatmentDate: moment(
              formUtils.queryValue(changedFields?.dateOfConsultation)
            ).valueOf(),
          })
          .value();
        changedFields.opTreatmentId = opTreatmentItem?.id;
      }
    }

    draft.claimEntities.opTreatmentPayableListMap[opTreatmentPayableId] = {
      ...(draft.claimEntities?.opTreatmentPayableListMap?.[opTreatmentPayableId] || {}),
      ...changedFields,
    };
  });

  return { ...nextState };
};

export default saveOPTreatmentPayableItem;

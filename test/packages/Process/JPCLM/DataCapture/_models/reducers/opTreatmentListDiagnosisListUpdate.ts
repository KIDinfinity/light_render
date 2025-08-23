import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

const opTreatmentListDiagnosisNameListUpdate = (state: any, action: any) => {
  const { changedFields, oldDiagnosisName, treatmentId, group } = action.payload;

  const nextState = produce(state, (draftState) => {
    const draft = draftState;
    const opTreatmentList = lodash.cloneDeep(
      draft.claimEntities?.treatmentListMap?.[treatmentId]?.opTreatmentList
    );

    draft.claimEntities.treatmentListMap[treatmentId].opTreatmentList = lodash
      .chain(opTreatmentList)
      .map((outpatientItem: any) => {
        return outpatientItem.group === group
          ? {
              ...outpatientItem,
              diagnosisIdList: lodash.map(
                outpatientItem.diagnosisIdList,
                (diagnosisName: string) => {
                  return diagnosisName === oldDiagnosisName
                    ? formUtils.queryValue(changedFields.diagnosisName)
                    : diagnosisName;
                }
              ),
            }
          : outpatientItem;
      })
      .value();
  });

  return { ...nextState };
};

export default opTreatmentListDiagnosisNameListUpdate;

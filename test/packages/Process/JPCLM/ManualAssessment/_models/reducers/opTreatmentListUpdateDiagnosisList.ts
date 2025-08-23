import { produce }  from 'immer';
import lodash from 'lodash';

const opTreatmentListUpdateDiagnosisList = (state: any, action: any) => {
  const { diagnosisId } = action.payload;

  const nextState = produce(state, (draftState) => {
    const draft = draftState;
    const treatmentListMap = lodash.cloneDeep(draft.claimEntities?.treatmentListMap);

    lodash.forEach(treatmentListMap, (element) => {
      element.opTreatmentList = lodash.map(element.opTreatmentList, (opTreatment) => {
        return {
          ...opTreatment,
          diagnosisIdList: lodash.filter(
            opTreatment?.diagnosisIdList || [],
            (id: any) => id !== diagnosisId
          ),
        };
      });
      element.opTreatmentList = lodash.filter(
        element.opTreatmentList,
        (opTreatment) => opTreatment.diagnosisIdList.length > 0
      );
    });

    draft.claimEntities.treatmentListMap = treatmentListMap || {};
  });

  return { ...nextState };
};

export default opTreatmentListUpdateDiagnosisList;

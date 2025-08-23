import { produce }  from 'immer';
import moment from 'moment';
import lodash from 'lodash';
import {v4 as uuidv4 } from 'uuid';
import { formUtils } from 'basic/components/Form';
import { DiagnosisType } from 'basic/enum';

const opTreatmentListAdd = (state: any, action: any) => {
  const { treatmentId, opTreatmentList, groupId, incidentId } = action.payload;
  const nextState = produce(state, (draftState) => {
    const group = groupId || uuidv4();

    const incidentDiagnosisIdList =
      draftState.claimEntities.incidentListMap?.[incidentId]?.diagnosisList || [];

    const diagnosisListMap = lodash.filter(
      draftState.claimEntities?.diagnosisListMap,
      (diagnosis) => lodash.some(incidentDiagnosisIdList, (id) => id === diagnosis.id)
    );

    const diagnosisListMapFilter = (dictionasis) =>
      formUtils.queryValue(dictionasis?.diagnosisType) === DiagnosisType.Primary;

    const diagnosisIdList = [
      lodash.size(lodash.filter(diagnosisListMap, diagnosisListMapFilter)) > 0
        ? lodash
            .chain(diagnosisListMap)
            .filter(
              (dictionasis) =>
                formUtils.queryValue(dictionasis?.diagnosisType) === DiagnosisType.Primary
            )
            .values()
            .head()
            .value().id
        : lodash.chain(diagnosisListMap).values().head().value().id,
    ];

    const opTreatmentListObj = lodash
      .chain(opTreatmentList)
      .map((outpatientTreatmentDate) => {
        return {
          claimNo: draftState?.claimProcessData?.claimNo,
          treatmentId,
          outpatientTreatmentDate,
          diagnosisIdList,
          group,
          id: uuidv4(),
        };
      })
      .orderBy((item) => moment(item.outpatientTreatmentDate).valueOf(), ['asc'])
      .value();

    draftState.claimEntities.treatmentListMap[treatmentId].opTreatmentList = [
      ...(draftState.claimEntities?.treatmentListMap?.[treatmentId]?.opTreatmentList || ''),
      ...(opTreatmentListObj || ''),
    ];
  });

  return { ...nextState };
};

export default opTreatmentListAdd;

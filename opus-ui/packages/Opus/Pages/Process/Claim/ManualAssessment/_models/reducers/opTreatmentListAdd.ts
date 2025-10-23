import { produce } from 'immer';
import lodash from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { formUtils } from 'basic/components/Form';
import { deleteOpTreatmentPayable } from '../functions';
import { DiagnosisType } from 'basic/enum';

const opTreatmentListAdd = (state: any, action: any) => {
  const { treatmentId, groupId, dateList, incidentId, procedureType } = action.payload;
  const nextState = produce(state, (draftState) => {
    const group = groupId || uuidv4();

    const opTreatment = draftState.claimEntities?.treatmentListMap?.[treatmentId]?.opTreatmentList;

    const groupItem = lodash
      .chain(opTreatment)
      .find((el: any) => el.group === groupId)
      .value();

    let diagnosisIdList: any = [];
    if (!lodash.isEmpty(groupItem)) {
      // 使用已有diagnosisIdList
      diagnosisIdList = groupItem.diagnosisIdList;
    } else {
      // 重新获取diagnosisIdList
      const incidentDiagnosisIdList =
        draftState.claimEntities.incidentListMap?.[incidentId]?.diagnosisList || [];

      const diagnosisListMap = lodash.filter(
        draftState.claimEntities?.diagnosisListMap,
        (diagnosis) => diagnosis.diagnosisName && lodash.some(incidentDiagnosisIdList, (id) => id === diagnosis.id)
      );

      const diagnosisListMapFilter = (dictionasis) =>
        formUtils.queryValue(dictionasis?.diagnosisType) === DiagnosisType.Primary;

      diagnosisIdList =
        lodash.size(diagnosisListMap) > 0
          ? [
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
            ]
          : [];
    }

    const existingDateList = lodash.filter(
      opTreatment,
      (el: any) => el.group === groupId && lodash.includes(dateList, el.outpatientTreatmentDate)
    );

    const deletedDateList = lodash.filter(
      opTreatment,
      (el: any) => el.group === groupId && !lodash.includes(dateList, el.outpatientTreatmentDate)
    );
    lodash.forEach(deletedDateList, (el) => {
      deleteOpTreatmentPayable({
        draftState,
        treatmentId,
        outpatientTreatmentDate: el.outpatientTreatmentDate,
      });
    });

    const newDateList = lodash
      .chain(dateList)
      .difference(existingDateList.map((el: any) => el.outpatientTreatmentDate))
      .map((outpatientTreatmentDate) => ({
        outpatientTreatmentDate,
        claimNo: draftState?.claimProcessData?.claimNo,
        treatmentId,
        diagnosisIdList,
        group,
        id: uuidv4(),
        procedureType,
      }))
      .value();

    draftState.claimEntities.treatmentListMap[treatmentId].opTreatmentList = [
      ...(draftState.claimEntities?.treatmentListMap?.[treatmentId]?.opTreatmentList?.filter(
        ({ group }) => group !== groupId
      ) || ''),
      ...existingDateList,
      ...newDateList,
    ];
  });

  return { ...nextState };
};

export default opTreatmentListAdd;

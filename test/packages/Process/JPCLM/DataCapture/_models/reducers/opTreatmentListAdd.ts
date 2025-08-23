import { produce }  from 'immer';
import moment from 'moment';
import lodash from 'lodash';
import {v4 as uuidv4 } from 'uuid';
import { formUtils } from 'basic/components/Form';
import { DiagnosisType } from 'basic/enum';

const opTreatmentListAdd = (state: any, action: any) => {
  const { treatmentId, groupId,opTreatmentList, incidentId } = action.payload;
  const nextState = produce(state, (draftState) => {
    const group = groupId || uuidv4();

    const opTreatment =
      draftState.claimEntities?.treatmentListMap?.[treatmentId]?.opTreatmentList;

    const groupItem =
      lodash
        .chain(opTreatment)
        .find((el: any) => el.group === groupId)
        .value() || {};

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
        (diagnosis) => lodash.some(incidentDiagnosisIdList, (id) => id === diagnosis.id)
      );

      const diagnosisListMapFilter = (dictionasis) =>
        formUtils.queryValue(dictionasis?.diagnosisType) === DiagnosisType.Primary;

      diagnosisIdList = [
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
    }

    draftState.claimEntities.treatmentListMap[treatmentId].opTreatmentList = [
      ...(draftState.claimEntities?.treatmentListMap?.[treatmentId]?.opTreatmentList || ''),
      ...(lodash
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
        .value() || ''),
    ];
  });

  return { ...nextState };
};

export default opTreatmentListAdd;

import { DiagnosisType } from 'basic/enum';
import { produce } from 'immer';
import lodash from 'lodash';

const DIAGNOSIS_FIELDS = [
  'diagnosisName',
  'diagnosisCode',
  'diagnosisNo',
  'relationshipCode',
  'diagnosisKey',
  'specificWomenDisease',
  'specificInfectiousDisease',
  'specificThreeMajorDisease',
  'wop2Flag',
  'nnmSpecificInjuryFlag',
  'adultDiseases',
];

const saveClaimDecision = (state: any, action: any) => {
  const { changedFields } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    if (!draftState.businessData.incidentList) {
      draftState.businessData.incidentList = [
        {
          klipCaseInfoList: [{}],
          diagnosisList: [{}],
        },
      ];
    }

    // TODO:这里只是存储的位置不一样，应该后端改
    if (lodash.size(changedFields) === 1) {
      if (lodash.has(changedFields, 'claimTypeArray')) {
        if (!draftState.businessData.incidentList?.length) {
          draftState.businessData.incidentList = [{}];
        }
        draftState.businessData.incidentList[0].claimTypeArray = changedFields.claimTypeArray;
      }
      if (lodash.has(changedFields, 'firstMcReceiveDate')) {
        draftState.businessData.firstMcReceiveDate = changedFields.firstMcReceiveDate;
      }
    }

    if (lodash.has(changedFields, 'diagnosisName')) {
      const diagnosisItem = lodash.pick(changedFields, DIAGNOSIS_FIELDS);
      lodash.set(draftState, 'businessData.incidentList[0].diagnosisList[0]', {
        ...diagnosisItem,
        incidentId: lodash.get(draftState, 'businessData.incidentList[0].id'),
        diagnosisType: DiagnosisType.Primary,
      });
    }

    draftState.businessData.incidentList[0].klipCaseInfoList = [
      {
        ...(draftState.businessData.incidentList[0].klipCaseInfoList?.[0] || {}),
        ...lodash.omit(changedFields, DIAGNOSIS_FIELDS),
        medicalCertificateArrivalDate: draftState?.businessData?.firstMcReceiveDate?.value,
      },
    ];
  });

  return { ...nextState };
};

export default saveClaimDecision;

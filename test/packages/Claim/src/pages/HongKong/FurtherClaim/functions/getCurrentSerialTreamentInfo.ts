import lodash from 'lodash';
import moment from 'moment';
import { formUtils } from 'basic/components/Form';

export const getCurrentSerialTreamentInfo = (claimData: any, taskDetail: any) => {
  if (lodash.isEmpty(claimData)) return;

  const { incidentListMap, treatmentListMap, diagnosisListMap, procedureListMap } =
    formUtils.cleanValidateData(claimData?.claimEntities) || {};

  const { inquiryBusinessNo: inquiryClaimNo, businessNo: claimNo } = taskDetail || {};

  return lodash
    .chain(incidentListMap)
    .map((incident: any) => {
      const { treatmentList, diagnosisList, incidentDate, claimTypeArray, causeOfIncident }: any =
        lodash.pick(incident, [
          'treatmentList',
          'diagnosisList',
          'incidentDate',
          'claimType',
          'claimTypeArray',
          'causeOfIncident',
        ]) || {};

      const primaryDiagnosisId = lodash
        .chain(diagnosisList)
        .filter((diagnosisId: string) => {
          const diagnosisType = lodash.get(diagnosisListMap, `${diagnosisId}.diagnosisType`);

          return formUtils.queryValue(diagnosisType) === 'P';
        })
        .first()
        .value();

      return lodash.map(treatmentList, (treatmentId: string) => {
        const treatment = lodash.get(treatmentListMap, treatmentId) || {};
        const { procedureList } = treatment;

        const operationDate = lodash
          .chain(procedureList)
          .map((procedureId: string) =>
            moment(lodash.get(procedureListMap, `${procedureId}.operationDate`)).format('L')
          )
          .sort()
          .join(',')
          .value();

        const treatmentPick = lodash.pick(treatment, [
          'dateOfAdmission',
          'dateOfDischarge',
          'dateOfConsultation',
          'id',
        ]);

        return {
          ...treatmentPick,
          treatmentId: treatmentPick.id,
          incidentDate,
          claimTypeArray,
          causeOfIncident,
          claimNo,
          inquiryClaimNo,
          operationDate,
          claimStatus: 'inProgress',
          primaryDiagnosisCode: lodash.get(diagnosisListMap, `${primaryDiagnosisId}.diagnosisCode`),
        };
      });
    })
    .flatten()
    .compact()
    .value();
};

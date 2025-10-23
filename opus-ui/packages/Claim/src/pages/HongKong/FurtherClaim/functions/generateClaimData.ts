import lodash from 'lodash';
import moment from 'moment';
import { formUtils } from 'basic/components/Form';
import { formatPerioDate } from '.';
import { tenant } from '@/components/Tenant';

export const generateClaimData = (claimData: any) => {
  const { incidentListMap, treatmentListMap, diagnosisListMap, procedureListMap } =
    formUtils.cleanValidateData(claimData?.claimEntities) || {};
  return lodash.map(incidentListMap, (incident: any) => {
    const { treatmentList, diagnosisList } = incident || {};

    const primaryDiagnosisId = lodash
      .chain(diagnosisList)
      .filter((diagnosisId: string) => {
        const diagnosisType = lodash.get(diagnosisListMap, `${diagnosisId}.diagnosisType`);

        return formUtils.queryValue(diagnosisType) === 'P';
      })
      .first()
      .value();

    const treatments = lodash.map(treatmentList, (treatmentId: string) => {
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
        'medicalProvider',
        'treatmentType',
        'treatmentNo',
        'id',
        'opTreatmentList',
      ]);

      if (tenant.isJP()) {
        treatmentPick.dateOfConsultation = lodash
          .map(treatmentPick.opTreatmentList, (item) => {
            return moment(item?.outpatientTreatmentDate).format('L');
          })
          .join(',');
      } else {
        treatmentPick.dateOfConsultation = moment(treatmentPick.dateOfConsultation).format('L');
      }

      return {
        ...treatmentPick,
        operationDate,
        admissionPeriod: formatPerioDate(treatmentPick),
      };
    });

    const incidentPick = lodash.pick(incident, ['incidentDate', 'causeOfIncident', 'id']);

    return {
      ...incidentPick,
      diagnosisCode: lodash.get(diagnosisListMap, `${primaryDiagnosisId}.diagnosisCode`),
      treatmentList: tenant.isJP()
        ? lodash.filter(treatments, { id: claimData?.saveFurtherClaimRelationshipId?.treatmentId })
        : treatments,
    };
  });
};

import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';

export const existList = (map: any, keyCode: any, message: string) => {
  const errors: string[] = [];
  lodash.forEach(map, (item) => {
    if (lodash.isEmpty(item[keyCode])) {
      errors.push(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000011' }, message));
    }
  });
  return errors;
};

export const existMainBenefit = (claimEntities: any) => {
  const treatmentListMap = lodash.get(claimEntities, 'treatmentListMap', []);
  return existList(treatmentListMap, 'mainBenefitList', 'MainBenefit item');
};

export const existDiagnosis = (claimEntities: any) => {
  const incidentListMap = lodash.get(claimEntities, 'incidentListMap', []);
  return existList(incidentListMap, 'diagnosisList', 'Diagnosis item');
};

/**
 *
 * @param claimEntities
 * Mandantory section has no record when submit
 */
export const VLD_000006 = (claimEntities: any, section?: string) => {
  let result: string[] = [];
  switch (section) {
    case 'mainBenefit':
      result = existMainBenefit(claimEntities);
      break;
    default:
      result = existDiagnosis(claimEntities);
      break;
  }
  return result;
};

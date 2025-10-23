import lodash from 'lodash';
import { getSelectionTreatmentUnormalized, formatSelectionTreatment } from '../functions';

/**
 * System has identified some potential serial treatments but user does not select any one of them, i.e. no selection at all
 */
/**
 *
 * @param claimData
 * @param oldClaimData
 * @returns
 */
export const VLD_000573 = (claimData: any, oldClaimData: any) => {
  const selectTreatments: any = getSelectionTreatmentUnormalized(claimData);
  const selectTreatmentsO: any = getSelectionTreatmentUnormalized(oldClaimData);

  const fromatTreatments = formatSelectionTreatment(selectTreatments);
  const fromatTreatmentsO = formatSelectionTreatment(selectTreatmentsO);

  const sameSize = lodash.size(selectTreatmentsO) === lodash.size(selectTreatments);

  return sameSize && lodash.isEqual(fromatTreatments, fromatTreatmentsO);
};

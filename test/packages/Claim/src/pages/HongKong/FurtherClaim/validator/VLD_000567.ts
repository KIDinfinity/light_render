import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { getSelectionTreatment } from '../functions';
import { EFollowUp } from '../enum';

/**
 * User does not select any serial treatments for one of the treatments of current claim
 * @param claimData
 * @param treatmentId
 * @returns
 */
export const VLD_000567 = (claimData: any, treatmentId: string) => {
  const selectTreatments = getSelectionTreatment(claimData, treatmentId);

  return (
    !lodash.isEmpty(selectTreatments) &&
    !lodash
      .chain(selectTreatments)
      .filter(
        (selectTreatment: any) => formUtils.queryValue(selectTreatment.followUp) === EFollowUp.Yes
      )
      .size()
      .value()
  );
};

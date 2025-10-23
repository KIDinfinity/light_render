import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { getSelectionTreatmentUnormalized } from '../functions';
import { EFollowUp } from '../enum';

/**
 * System has identified some potential serial treatments but user does not select any one of them, i.e. no selection at all
 */

export const VLD_000569 = (claimData: any) => {
  const selectTreatments = getSelectionTreatmentUnormalized(claimData);

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

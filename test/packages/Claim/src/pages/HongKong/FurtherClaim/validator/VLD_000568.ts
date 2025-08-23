import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { getSelectionTreatment } from '../functions';
import { EFollowUp } from '../enum';

/**
 * System has identified some potential serial treatments but user does not select any one of them, i.e. no selection at all
 */

export const VLD_000568 = (claimData: any) => {
  const selectTreatments = getSelectionTreatment(claimData);

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

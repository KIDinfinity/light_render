import {v4 as uuidv4 } from 'uuid';
import { NAMESPACE } from '../../activity.config';

import { formUtils } from 'basic/components/Form';
import { TherapiesType as TherapiesTypeEnum } from 'claim/pages/Enum';

export function addTherapiesItem({ dispatch, claimNo, changedValues, treatmentId }: any) {
  const therapiesType = formUtils.queryValue(changedValues?.therapiesType);

  if (therapiesType === TherapiesTypeEnum.ICU) {
    dispatch({
      type: `${NAMESPACE}/saveTreatmentItem`,
      payload: {
        changedFields: changedValues,
        treatmentId,
      },
    });
  }
  if (therapiesType === TherapiesTypeEnum.Surgery) {
    const procedureId = uuidv4();

    dispatch({
      type: `${NAMESPACE}/addProcedureItem`,
      payload: {
        treatmentId,
        procedureId,
        claimNo,
        changedValues,
      },
    });
    dispatch({
      type: `${NAMESPACE}/getCategoryByProcedureCode`,
      payload: {
        procedureId,
      },
    });
  }
  if (therapiesType === TherapiesTypeEnum.MainBenefit) {
    dispatch({
      type: `${NAMESPACE}/addMainBenefitItem`,
      payload: {
        treatmentId,
      },
    });
  }
}

export default addTherapiesItem;

import { formUtils } from 'basic/components/Form';
import { TherapiesType as TherapiesTypeEnum } from 'claim/pages/Enum';
import { NAMESPACE } from '../../activity.config';
import { addProcedureItemInfo } from './addProcedureItemInfo';
import { saveTreatmentItem } from './saveTreatmentItem';

export function addTherapiesItem(dispatch: any, changedValues: any, treatmentId: any) {
  const therapiesType = formUtils.queryValue(changedValues?.therapiesType);

  if (therapiesType === TherapiesTypeEnum.ICU) {
    saveTreatmentItem(dispatch, treatmentId, changedValues);
  }
  if (therapiesType === TherapiesTypeEnum.Surgery) {
    addProcedureItemInfo(dispatch, treatmentId, changedValues);
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

import { NAMESPACE } from '../../activity.config';

export function saveTreatmentItem(dispatch: any, treatmentId: any, changedFields: any) {
  dispatch({
    type: `${NAMESPACE}/saveTreatmentItem`,
    payload: {
      changedFields,
      treatmentId,
    },
  });
}

export default saveTreatmentItem;

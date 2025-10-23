import { NAMESPACE } from '../../activity.config';

export function removeMainBenefitItem(dispatch: any, treatmentId: any, mainBenefitId: any) {
  dispatch({
    type: `${NAMESPACE}/removeMainBenefitItem`,
    payload: {
      treatmentId,
      mainBenefitId,
    },
  });
}

export default removeMainBenefitItem;

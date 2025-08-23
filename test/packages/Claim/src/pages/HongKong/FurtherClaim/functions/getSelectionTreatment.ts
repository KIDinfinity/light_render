import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

export const getSelectionTreatment = (claimData: any, currentTreatmentId?: string) => {
  if (lodash.isEmpty(claimData)) return;

  const { treatmentListMap } = formUtils.cleanValidateData(claimData?.claimEntities) || {};
  const { claimRelation } = formUtils.cleanValidateData(claimData?.claimProcessData) || {};
  const { treatmentRelationshipSelectionList } = claimRelation || {};

  const currentTreatments =
    lodash.isString(currentTreatmentId) && currentTreatmentId
      ? [currentTreatmentId]
      : lodash.keys(treatmentListMap);

  return lodash
    .chain(treatmentRelationshipSelectionList)
    .filter((treatmentRelation: any) =>
      lodash.includes(currentTreatments, treatmentRelation.treatmentId)
    )
    .uniqWith(
      (prev: any, next: any) =>
        prev.treatmentId === next.treatmentId && prev.relaTreatmentId === next.relaTreatmentId
    )
    .compact()
    .value();
};

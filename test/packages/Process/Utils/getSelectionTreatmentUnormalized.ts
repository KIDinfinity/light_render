import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

export default (claimData: any) => {
  if (lodash.isEmpty(claimData)) return;

  const { claimRelation, incidentList } = claimData || {};
  const { treatmentRelationshipSelectionList } = claimRelation || {};

  const currentTreatments = lodash
    .chain(incidentList)
    .map((incident: any) => {
      const { treatmentList } = incident;

      return lodash.map(treatmentList, (treatment: any) => treatment.id);
    })
    .flatten()
    .compact()
    .value();
  const selectTreatments = lodash
    .chain(treatmentRelationshipSelectionList)
    .filter((treatmentRelation: any) =>
      lodash.includes(currentTreatments, treatmentRelation.treatmentId)
    )
    .compact()
    .value();

  return (
    !lodash.isEmpty(selectTreatments) &&
    !lodash
      .chain(selectTreatments)
      .filter((selectTreatment: any) => formUtils.queryValue(selectTreatment.followUp) === 'Y')
      .size()
      .value()
  );
};

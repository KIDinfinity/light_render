import lodash from 'lodash';

export const getSelectionTreatmentUnormalized = (claimData: any) => {
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

  return lodash
    .chain(treatmentRelationshipSelectionList)
    .filter((treatmentRelation: any) =>
      lodash.includes(currentTreatments, treatmentRelation.treatmentId)
    )
    .compact()
    .value();
};

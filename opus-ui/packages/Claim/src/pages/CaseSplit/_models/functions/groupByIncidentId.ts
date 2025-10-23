import { isEmpty, chain, get } from 'lodash';

export default (payableData: any, incidentListMap: any) => {
  if (isEmpty(payableData)) return [];
  return chain(payableData)
    .groupBy('incidentId')
    .map((treatmentPayables: any, incidentId: string) => {
      const incident = incidentListMap[incidentId] || {};

      return {
        treatmentPayables,
        incidentNo: get(incident, 'incidentNo'),
        incident,
        incidentId,
      };
    })
    .value();
};

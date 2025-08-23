import { isEmpty, forEach } from 'lodash';

export default (claimData: any = {}) => {
  let assessOperation = '';
  forEach(claimData.incidentList, (incidentItem) => {
    forEach(incidentItem.treatmentList, (treatmentItem) => {
      if (isEmpty(treatmentItem.invoiceList)) {
        assessOperation = 'only_assess';
      }
    });
  });

  return assessOperation;
};

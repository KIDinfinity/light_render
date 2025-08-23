import moment from 'moment';

/**
 * 获取selection treatment关键信息
 * @param selectionTreatments
 * @returns
 */
export const formatPerioDate = (dateContainer: any) => {
  const dateOfAdmission = dateContainer?.dateOfAdmission
    ? `${moment(dateContainer?.dateOfAdmission).format('L')}`
    : '';
  const dateOfDischarge = dateContainer?.dateOfDischarge
    ? `${moment(dateContainer?.dateOfDischarge).format('L')}`
    : '';

  return dateOfAdmission || dateOfDischarge ? `${dateOfAdmission}~${dateOfDischarge}` : '';
};

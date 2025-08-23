import moment from 'moment';

export function calculateDate(target: string, birthDate: string) {
  if (!target || !birthDate) return '';
  const subYear = moment(target).diff(moment(birthDate), 'years');
  return subYear < 0 ? 0 : subYear;
}
export default calculateDate;

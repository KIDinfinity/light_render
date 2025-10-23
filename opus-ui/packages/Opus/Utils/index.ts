import { Region, tenant } from '@/components/Tenant';
import getFirstLetters from './getFirstLetters';
import getRandomColor from './getRandomColor';
import getActivityList from './getActivityList';
import openTitleFrame from './customWindow';

const DATE_FORMAT_LONG = tenant.region({
  [Region.TH]: () => 'DD/MM/YYYY',
  [Region.JP]: () => 'YYYY/MM/DD',
});
const DATE_FORMAT_SHORT = tenant.region({
  [Region.TH]: () => 'DD/MM/YY',
  [Region.JP]: () => 'YY/MM/DD',
});

export {
  getFirstLetters,
  getRandomColor,
  DATE_FORMAT_LONG,
  DATE_FORMAT_SHORT,
  getActivityList,
  openTitleFrame,
};

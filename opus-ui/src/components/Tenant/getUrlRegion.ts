import { Region } from './constants';

const REGION_LIST = [Region.HK, Region.JP, Region.TH, Region.PH];

export const checkRegion = (region: string) => {
  if (region && REGION_LIST.includes(region.toUpperCase() as Region)) {
    return region.toUpperCase();
  }
  return '';
}

export default () => {
  const urlRegion = window.location.pathname.split('/')[1];
  return checkRegion(urlRegion);
};

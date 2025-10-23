import lodash from 'lodash';
import { queryRegionCurrency } from '@/services/miscRegionCurrencyConfigControllerService';

export default async () => {
  const response = await queryRegionCurrency();

  if (lodash.isPlainObject(response) && response.success && lodash.isArray(response.resultData)) {
    return response.resultData;
  }

  return [];
};

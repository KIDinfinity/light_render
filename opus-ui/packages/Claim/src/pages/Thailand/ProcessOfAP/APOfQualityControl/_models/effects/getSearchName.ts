import lodash from 'lodash';
import { searchNameByRegionCode as searchName } from '@/services/claimServiceItemInformationControllerService';
import { tenant } from '@/components/Tenant';

export default function* getSearchName({ payload }: any, { call }: any) {
  const { searchCodes } = payload;
  const response = yield call(searchName,  { codes: searchCodes, regionCode: tenant.region() });
  if (lodash.get(response, 'success') && lodash.isArray(response.resultData)) {
    return response.resultData;
  }
  return [];
}

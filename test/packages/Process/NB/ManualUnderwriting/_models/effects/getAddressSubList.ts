import { getAddressSubListV3 } from '@/services/miscCfgInquiryControllerService';

export default function* ({ payload }: any, { call }: any) {
  const parentCode = payload?.parentCode || '';
  const addressSubList = yield call(getAddressSubListV3, { parentCode });
  return addressSubList;
}

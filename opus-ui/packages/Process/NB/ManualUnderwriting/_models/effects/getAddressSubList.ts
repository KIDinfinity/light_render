import { getAddressSubListV2 } from '@/services/miscCfgInquiryControllerService';

export default function* ({ payload }: any, { call }: any) {
  const parentCode = payload?.parentCode || '';
  const addressSubList = yield call(getAddressSubListV2, { parentCode });
  return addressSubList;
}

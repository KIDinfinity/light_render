import lodash from 'lodash';

import { getAddressSubListV3 } from '@/services/miscCfgInquiryControllerService';
import { AddressMapping } from 'process/NewBusiness/ManualUnderwriting/Pages/Plan/_utils';

import { NAMESPACE } from '../../activity.config';

export default function* (
  { payload }: any,
  { call, put, select }: any
): Generator<any, any[], any> {
  const { parentCode, fieldName } = lodash.pick(payload, ['parentCode', 'fieldName']);
  const path = parentCode
    ? `addressDict.${fieldName}.${parentCode}`
    : `addressDict.${fieldName}.dict`;
  const targetAddress = yield select(({ [NAMESPACE]: modelnamepsace }: any) =>
    lodash.get(modelnamepsace, path, [])
  );

  if (lodash.size(targetAddress) > 0) {
    return targetAddress;
  }
  const response = yield call(getAddressSubListV3, { parentCode });
  if (lodash.isArray(response) && lodash.size(response) > 0) {
    const target = lodash.head(response) as { subFieldName: string; parentFieldName: string };
    const parentFieldName = target?.parentFieldName;
    const subFieldName = target?.subFieldName;

    yield put({
      type: 'setAddressDict',
      payload: {
        parentCode,
        fieldName: subFieldName,
        addressList: response,
        parentFieldName,
      },
    });
    yield put({
      type: `saveParentCodeAddress`,
      payload: {
        parentCode: parentCode,
        addressLevel: AddressMapping()[subFieldName],
        list: response,
      },
    });
    return response;
  }

  return [];
}

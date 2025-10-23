import lodash from 'lodash';
import { NAMESPACE } from '../../activity.config';

import { formUtils } from 'basic/components/Form';
import claimServiceItemInformationControllerService from '@/services/claimServiceItemInformationControllerService';
import { tenant } from '@/components/Tenant';

export default function* getRepeatableByServiceCode({ payload }: any, { select, call, put }: any) {
  const repeatableServiceItemList = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.repeatableServiceItemList
  );
  const serviceItemListMap = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimEntities.serviceItemListMap
  );

  const { codes, invoiceId } = payload;
  const newServiceCodeObj = { invoiceId, serviceItemCode: lodash.first(codes), repeatable: '' };
  const serviceItemCodes = lodash.map(serviceItemListMap, (serviceItem: any) =>
    formUtils.queryValue(serviceItem.serviceItem)
  );
  const codeList = lodash.chain(serviceItemCodes).concat(codes).compact().uniq().value();

  let response = {
    success: true,
    resultData: [],
  };

  if (lodash.size(codeList)) {
    response = yield call(
      claimServiceItemInformationControllerService.searchRepeatableByRegionCode,
      {
        codes: codeList,
        regionCode: tenant.remoteRegion(),
      }
    );
  }

  if (lodash.isPlainObject(response) && response.success && lodash.isArray(response.resultData)) {
    let groupServiceItemCodes: any = null;
    groupServiceItemCodes = lodash
      .chain(serviceItemListMap)
      .map((serviceItem: any) => {
        return { serviceItemCode: serviceItem.serviceItem, invoiceId: serviceItem.invoiceId };
      })
      .value();

    if (invoiceId) {
      groupServiceItemCodes = [...groupServiceItemCodes, newServiceCodeObj];
    }
    groupServiceItemCodes = lodash.forEach(groupServiceItemCodes, (serviceItem: any) => {
      lodash.forEach(response.resultData, (res: any) => {
        if (res.serviceItemCode === serviceItem.serviceItemCode) {
          serviceItem.repeatable = res.repeatable || '';
        }
      });
    });
    // 保存不可以重复选择的serviceCode
    const newReatableList = lodash
      .chain(groupServiceItemCodes)
      .filter((item: any) => item.repeatable !== 'Y')
      .concat(repeatableServiceItemList)
      .compact()
      .uniq()
      .value();

    yield put({
      type: 'savePartyListInfo',
      payload: { repeatableServiceItemList: newReatableList },
    });
  }
}

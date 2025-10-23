import lodash from 'lodash';
import { NAMESPACE } from '../../activity.config';

import { formUtils } from 'basic/components/Form';
import claimServiceItemInformationControllerService from '@/services/claimServiceItemInformationControllerService';
import { tenant } from '@/components/Tenant';

export default function* getServiceItemFeesListMap({ payload }: any, { select, call, put }: any) {
  const { codes, serviceItemList, incidentId } = payload;

  const incidentItem = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.incidentListMap?.[incidentId]
  );

  const serviceItemCodes = lodash.map(serviceItemList, (serviceItem: any) =>
    formUtils.queryValue(serviceItem.serviceItem)
  );
  const codeList = lodash.chain(serviceItemCodes).concat(codes).compact().uniq().value();

  let response = {
    success: true,
    resultData: [],
  };

  if (
    lodash.size(codeList) &&
    !lodash.isEmpty(formUtils.queryValue(incidentItem?.claimTypeArray))
  ) {
    response = yield call(
      claimServiceItemInformationControllerService.searchRepeatableByRegionCode,
      {
        claimTypeList: formUtils.queryValue(incidentItem?.claimTypeArray),
        codes: codeList,
        regionCode: tenant.remoteRegion(),
      }
    );
  }

  if (lodash.isPlainObject(response) && response.success && lodash.isArray(response.resultData)) {
    yield put({
      type: 'saveServiceItemFeesListMap',
      payload: { serviceItemFeesListMap: response.resultData, incidentId },
    });
  }
}

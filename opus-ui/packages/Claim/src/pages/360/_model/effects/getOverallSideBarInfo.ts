import c360SideBarControllerService from '@/services/c360SideBarControllerService';
import docViewControllerService from '@/services/docViewControllerService';
import lodash from 'lodash';
import { tenant } from '@/components/Tenant';
import { mapToCustomer } from 'claim/pages/360/mapToCustomer';

export default function* getOverallSideBarInfo(_: any, { call, put, select }: any) {
  const insuredId = yield select((state: any) => state?.insured360?.insuredId);
  const caseCategory = yield select((state: any) => state?.insured360?.caseCategory);
  const customerType = yield select((state: any) => state?.insured360?.customerType);

  const commonParams = {
    regionCode: tenant.remoteRegion(),
    keyClientId: insuredId,
    customerType: customerType || mapToCustomer?.[caseCategory],
  };

  const response = yield call(c360SideBarControllerService.getOverallSideBarInfo, commonParams);

  if (response.success) {
    const {
      claimHistoryList,
      policyInfoList,
      posHistoryList,
      clientInfo,
    } = lodash.pick(response?.resultData, [
      'claimHistoryList',
      'policyInfoList',
      'posHistoryList',
      'clientInfo',
    ]);

    const businessNoList = lodash.map(claimHistoryList, (item) => {
      return item?.claimNo;
    });

    const existDocResponse = yield call(docViewControllerService.checkExistDoc, businessNoList);

    if (existDocResponse?.success) {
      const existDocList = existDocResponse?.resultData;
      yield put({
        type: 'saveExistDocList',
        payload: {
          existDocList,
        },
      });
    }

    yield put({
      type: 'saveinsured360',
      payload: {
        claimHistoryList,
        policyInfoList,
        posHistoryList,
        clientInfo,
      },
    });
  }
}

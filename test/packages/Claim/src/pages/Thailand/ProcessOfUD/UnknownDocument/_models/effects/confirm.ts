import lodash from 'lodash';
import { searchHistoryClaimCase } from '@/services/claimUnknownDocControllerService';
import { batchQueryCaseNo } from '@/services/navigatorCaseManagementControllerService';

export default function* ({}: any, { call, select, put }: any) {
  const { confirmData, decision } = yield select((state: any) => {
    const selectedRowKeys = lodash.get(state, 'UnknownDocumentController.searchResultRowKeys', []);
    return {
      confirmData: (lodash.chain(state) as any)
        .get('UnknownDocumentController.searchResult')
        .filter((item: any) => lodash.includes(selectedRowKeys, item.id))
        .head()
        .pick(['identityId', 'identityType'])
        .value(),
      decision: lodash.get(state, 'UnknownDocumentController.claimProcessData.decision', ''),
    };
  });

  if (!confirmData.identityId) {
    return;
  }

  const response = yield call(searchHistoryClaimCase, {
    identityNo: confirmData.identityId,
    identityType: confirmData.identityType,
  });

  let caseNoList = [];

  if (response && response.success && response.resultData.length) {
    const params = lodash.map(response?.resultData, (item: any) => ({
      businessNo: item.claimNo,
      businessType: 'claim',
    }));
    const caseRes = yield call(batchQueryCaseNo, params);
    if (caseRes && caseRes.success) {
      caseNoList = caseRes.resultData;
    }

    yield put({
      type: 'saveClaimHistorySearchResult',
      payload: {
        claimHistorySearchResult: response.resultData,
        decision,
        caseNoList,
      },
    });
  }
}

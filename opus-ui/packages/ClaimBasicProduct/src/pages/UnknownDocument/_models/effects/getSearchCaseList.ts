import lodash from 'lodash';
// import { listUDRelationTasks } from '@/services/bpmUnknownDocumentQueryRelationTaskService';
import { advUnknownDocCaseSearch } from '@/services/dcCaseInquiryControllerService';

export default function* (action: any, { call, put, select }: any) {
  const { searchParams } = action.payload;
  const { attachList = [], searchCaseList = [] } = yield select(
    (state: any) => state.UnknownDocumentBaseController
  );

  const response = yield call(advUnknownDocCaseSearch, {
    defaultSortName: 'inquiryBusinessNo',
    sortName: 'inquiryBusinessNo',
    sortOrder: 'desc',
    pageSize: 3000,
    // currentPage: page || 1,
    params: {
      inquiryBusinessNo: searchParams.claimNos,
      processInstanceId: searchParams.processInstanceId,
      policyNo: searchParams.policies,
      clientName: searchParams.insuredNames,
    },
  });

  if (response?.success) {
    // let ListTask = lodash.get(taskResponse, 'resultData.rows', []);
    const attachCaseList = searchCaseList?.filter(
      (caseItem) =>
        attachList.findIndex(
          (attachItem) => attachItem?.relatedCaseNo === caseItem.selectedCaseNo
        ) > -1
    );

    yield put({
      type: 'saveSearchCaseList',
      payload: {
        searchCaseList: lodash.uniqBy(
          [...attachCaseList, ...response?.resultData?.rows],
          'selectedCaseNo'
        ),
      },
    });
  }
}

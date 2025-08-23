import lodash from 'lodash';
// import { serialize as objectToFormData } from 'object-to-formdata';
import { findBizProcess } from '@/services/bpmBusinessProcessService';
import { tenant } from '@/components/Tenant';

/**
 * 从task detail中获取case information
 */
export default function* getCaseDetails({ payload }: any, { call, put }: any) {
  const { processInstanceId } = payload;
  if (!processInstanceId) return;
  const response = yield call(findBizProcess, { processInstanceId });
  const { success, resultData } = lodash.pick(response, ['success', 'resultData']);
  if (success && resultData) {
    const data = ['BP_PAPER_CTG001', 'BP_POS_CTG001', 'BP_POS_CTG002', 'BP_POS_CTG003'];
    // th data capture 过来默认显示by case no
    if ('BP_PAPER_CTG001' === resultData.caseCategory && tenant.isTH()) {
    } else if (data.includes(resultData.caseCategory)) {
      yield put({
        type: 'documentManagement/saveState',
        payload: {
          showType: 'businessNo',
          fileObject: {},
          selectedDocId: '',
        },
      });
    }

    yield put({
      type: 'saveCaseDetails',
      payload: {
        caseInfo: resultData || {},
      },
    });
  }
}

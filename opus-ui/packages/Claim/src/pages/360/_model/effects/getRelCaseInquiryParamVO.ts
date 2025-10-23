import lodash from 'lodash';
import { getRelCaseInquiryParamVO } from '@/services/posSrvCaseInquiryControllerService';
import { history } from 'umi';

export default function* ({ payload }: any, { call }: any) {
  const response = yield call(getRelCaseInquiryParamVO, payload);
  if (response && response.success) {
    const {
      businessNo,
      taskId,
      caseNo,
      caseCategory,
      jumpResult,
    } = lodash.pick(response.resultData, [
      'businessNo',
      'caseNo',
      'taskId',
      'caseCategory',
      'jumpResult',
    ]);
    const map = {
      history: `/servicing/history/${caseCategory}/${businessNo}`,
      case: `/navigator/case/detail/${caseNo}`,
      task: `/process/task/detail/${taskId}`,
    };
    if (!!map[jumpResult]) {
      history.push(map[jumpResult]);
    }
  }
}

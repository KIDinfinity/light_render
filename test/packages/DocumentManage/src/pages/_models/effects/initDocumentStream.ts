import lodash from 'lodash';
import { serialize as objectToFormData } from 'object-to-formdata';
import { findBizProcess } from '@/services/bpmBusinessProcessService';
import { byCaseNo, ByBusinessNo } from '@/services/docViewControllerService';
import { inquiryUserBizObjReadHistory } from '@/services/bpmReadCordService';
import { ESubjectType } from '@/components/SolutionRead/Enums';
import { LS, LSKey } from '@/utils/cache';
/**
 * 从task detail中获取case information
 */
export default function* initDocumentStream({ payload }: any, { call, put }: any) {
  const { caseNo, id, inquiryBusinessNo } = payload;
  if (!caseNo) return;
  const response = yield call(findBizProcess, { processInstanceId: caseNo });
  const { success, resultData } = lodash.pick(response, ['success', 'resultData']);
  if (success && resultData) {
    yield put({
      type: 'saveCaseDetails',
      payload: {
        caseInfo: resultData || {},
      },
    });

    window.history.replaceState(resultData, '');

    yield put({
      type: 'solutionRead/saveUseId',
    });
    yield put({
      type: 'solutionRead/getTaskDetail',
      payload: {
        taskId: resultData?.currentTaskId,
      },
    });

    const data = ['BP_PAPER_CTG001', 'BP_POS_CTG001', 'BP_POS_CTG002', 'BP_POS_CTG003'];
    const url = data.includes(resultData.caseCategory) ? ByBusinessNo : byCaseNo;
    const params = data.includes(resultData.caseCategory)
      ? { inquiryBusinessNo: resultData?.inquiryBusinessNo }
      : { caseNo: caseNo };
    const documentListRep = yield call(url, objectToFormData(params));
    const docViewVOList = documentListRep.success ? documentListRep.resultData.docViewVOList : [];
    const item = lodash.find(docViewVOList, { id: id });

    if (item?.mustRead) {
      const readRep = yield call(inquiryUserBizObjReadHistory, {
        readUserId: LS.getItem(LSKey.CURRENTUSER)?.userId,
        subjectType: ESubjectType.DOC,
        caseNo,
        inquiryBusinessNo,
      });
      const readData = readRep.success ? readRep.resultData?.subjectIdList : [];
      const readItem = {
        docId: item?.docId,
        subjectType: ESubjectType.DOC,
        mustRead: item?.mustRead,
        unRead: !lodash.includes(readData, item.docId),
        name: item?.name,
      };
      yield put({
        type: 'saveReadItem',
        payload: { readItem },
      });
    }
  }
}

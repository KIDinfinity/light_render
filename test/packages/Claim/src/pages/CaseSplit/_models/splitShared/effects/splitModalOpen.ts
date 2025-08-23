import { compact, isPlainObject } from 'lodash';
import { updateIniteData } from '../../functions';

export default function* ({ payload }: any, { put, select }: any) {
  const { claimData, wholeEntities } = payload;
  const {
    inquiryBusinessNo,
    processInstanceId,
    caseCategory,
    businessNo,
    caseNo,
    taskId,
  } = yield select(({ processTask }: any) => processTask.getTask);

  claimData.inquiryBusinessNo = claimData.inquiryBusinessNo || inquiryBusinessNo;
  claimData.processInstanceId = claimData.processInstanceId || processInstanceId;
  claimData.caseCategory = claimData.caseCategory || caseCategory;
  claimData.businessNo = claimData.businessNo || businessNo;
  claimData.caseNo = claimData.caseNo || caseNo;
  claimData.taskId = claimData.taskId || taskId;

  if (isPlainObject(claimData)) {
    const { incidentList, claimPayableList, applicationList } = updateIniteData(claimData);

    const enableIncident = compact(incidentList).length > 0;
    const enableClaimPayable = compact(claimPayableList).length > 1;
    const enableDocument = compact(applicationList).length > 0;
    yield put({
      type: 'caseSplitCaseController/initClaimData',
      payload: {
        claimData,
        wholeEntities,
      },
    });
    if (enableIncident) {
      yield put({
        type: 'caseSplitIncidentController/initClaimData',
        payload: {
          claimData,
          wholeEntities,
        },
      });
    }
    if (enableClaimPayable) {
      yield put({
        type: 'caseSplitPolicyController/initClaimData',
        payload: {
          claimData,
          wholeEntities,
        },
      });
    }
    if (enableDocument) {
      yield put({
        type: 'caseSplitDocumentController/initData',
        payload: { claimData },
      });
    }
    // 保存未拆分之前的case数据
    yield put({
      type: 'saveClaimData',
      payload: {
        claimDatas: claimData,
      },
    });
    yield put({
      type: 'toggleModal',
    });
    yield put({
      type: 'saveWholeEntities',
      payload: { wholeEntities },
    });
  }
}

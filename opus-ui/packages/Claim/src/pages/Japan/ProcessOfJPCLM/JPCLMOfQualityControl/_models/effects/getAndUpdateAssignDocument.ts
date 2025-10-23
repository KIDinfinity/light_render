import { getAssignDocument, updateAssignDocument } from '@/services/claimQcControllerService';
import { getClaimProcessData, updateAssignDocumentUtil } from '../../Utils';
import lodash from 'lodash';
import { serialize as objectToFormData } from 'object-to-formdata';
import { getDenormalizeClaimData } from '../../Utils/normalize';

const isComplete = (taskStatus: string) => lodash.toLower(taskStatus) === 'completed';

export default function* ({ payload }: any, { call, select, put }: any) {
  const { taskStatus, parentClaimNo } = payload;
  const { claimDatas, claimEntities } = yield select(
    (state: any) => state.JPCLMOfQualityController.claimProcessData
  );
  const { claimNo } = claimDatas;

  const response = yield call(getAssignDocument, objectToFormData({ claimNo }));
  if (response && response.success) {
    const snapShotData = {};
    const isEmptySnapShot = true;
    const isCompleteTask = isComplete(taskStatus);
    const claimData = getDenormalizeClaimData({ claimDatas, claimEntities });
    const { claimApplicationDocList, bpoFormDataList } = updateAssignDocumentUtil(
      claimData,
      response
    );
    lodash.set(claimData, 'claimApplicationDocList', claimApplicationDocList);
    lodash.set(claimData, 'bpoBatchDataVO.bpoDocumentDataList[0].bpoFormDataList', bpoFormDataList);

    const claimProcessData = getClaimProcessData({
      snapShotData,
      claimData,
      isCompleteTask,
      isEmptySnapShot,
      parentClaimNo,
    });
    const documentIdSet = lodash.get(response, 'resultData.documentIdSet');
    yield call(updateAssignDocument, {
      claimNo,
      documentIdSet,
    });
    yield put({
      type: 'saveClaimProcessData',
      payload: claimProcessData,
    });
    yield put({ type: 'saveSnapshot' });
  }
}

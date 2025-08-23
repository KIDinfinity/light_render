import lodash from 'lodash';
import { getClaimProcessData } from '../../Utils';
import { getDenormalizeClaimData } from '../../Utils/normalize';

const isComplete = (taskStatus: string) => lodash.toLower(taskStatus) === 'completed';

export default function* ({ payload }: any, { put, select }: any) {
  const {
    originalCase: { applicationFormDataList, claimDocRelationList },
    taskStatus,
    parentClaimNo,
    fnShowLoading,
  } = payload;
  const snapShotData = {};
  const isEmptySnapShot = true;
  const isCompleteTask = isComplete(taskStatus);
  const { claimDatas, claimEntities } = yield select(
    (state: any) => state.JPCLMOfQualityController.claimProcessData
  );
  const claimData: any = getDenormalizeClaimData({ claimDatas, claimEntities });
  const applicationNos = lodash.map(
    applicationFormDataList,
    (applicationFormData: any) => applicationFormData.applicationNo
  );
  const documentIds = lodash.map(
    claimDocRelationList,
    (claimDocRelation: any) => claimDocRelation.documentId
  );
  const claimApplicationDocList = lodash.filter(claimData.claimApplicationDocList, (item) =>
    lodash.includes(applicationNos, item.applicationNo)
  );
  lodash.set(claimData, 'claimApplicationDocList', claimApplicationDocList);
  const bpoFormDataList = lodash
    .chain(claimData)
    .get('bpoBatchDataVO.bpoDocumentDataList[0].bpoFormDataList', [])
    .filter((item: any) => lodash.includes(documentIds, item.documentId))
    .map((item: any) => {
      const formData = lodash.find(claimDocRelationList, (el) => el.documentId === item.documentId);
      return {
        ...item,
        formData,
      };
    })
    .value();
  lodash.set(claimData, 'bpoBatchDataVO.bpoDocumentDataList[0].bpoFormDataList', bpoFormDataList);

  const claimProcessData = getClaimProcessData({
    snapShotData,
    claimData,
    isCompleteTask,
    isEmptySnapShot,
    parentClaimNo,
  });
  fnShowLoading(false);
  yield put({
    type: 'saveClaimProcessData',
    payload: claimProcessData,
  });
}

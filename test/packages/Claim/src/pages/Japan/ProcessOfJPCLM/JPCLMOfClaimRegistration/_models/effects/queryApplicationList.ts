import lodash from 'lodash';
import{ v4 as  uuidv4 } from 'uuid';
import { formUtils } from 'basic/components/Form';
import { apply, getDocuments, save } from '@/services/claimJpclmClaimControllerService';
import { denormalizeClaimData } from '../../Utils/normalizrUtils';
import { APPLICATION } from '../../Utils/constant';

export default function* queryApplicationList(_: any, { call, put, select }: any) {
  const { taskDetail, claimProcessData, claimEntities } = yield select((state: any) => ({
    taskDetail: state.processTask.getTask,
    claimEntities: state.JPCLMOfClaimRegistrationController.claimEntities,
    claimProcessData: state.JPCLMOfClaimRegistrationController.claimProcessData,
  }));

  const denormalizedData = denormalizeClaimData(claimProcessData, claimEntities);
  const { processInstanceId, taskDefKey, taskId } = taskDetail;
  const claimData: any = formUtils.formatFlattenValue(
    formUtils.cleanValidateData(denormalizedData)
  );
  const dataForApply = {
    ...claimData,
    processInstanceId,
  };
  const newApplicationList: any[] = [];
  // 该当，生成parentClaimNo
  const responseForApply = yield call(apply, dataForApply);
  let lastResponse = responseForApply;
  if (responseForApply.success && responseForApply.resultData) {
    const applyData = responseForApply.resultData;

    const { policyList } = applyData;
    const policyPullAt = lodash.filter(policyList, (policy) => policy.confirmed === 1);
    const dataForDocument = {
      ...applyData,
      activityKey: taskDefKey,
      policyList: policyPullAt,
    };
    // 获取documents
    const responseOfDocument = yield call(getDocuments, dataForDocument);
    lastResponse = responseOfDocument;
    if (responseOfDocument.success && responseOfDocument.resultData) {
      const { recipientAddress, recipientName, recipientPostCode } = claimData;
      const documents = responseOfDocument.resultData;
      // 根据返回的document生成请求书
      lodash.forEach(documents, (documentValue, documentKey) => {
        const applicationItem = {
          ...APPLICATION,
          applicationNo: (documentKey + 1).toString().padStart(3, '0'),
          id: uuidv4(),
          documentTypeArray: documentValue.documentList,
          reminderRecipientName: lodash.get(documentValue, 'reminderRecipient.name'),
          reminderRecipientRole: lodash.get(documentValue, 'reminderRecipient.role'),
          policyNoArray: [documentValue.policyId],
          recipientAddress,
          recipientName,
          recipientPostCode,
        };
        newApplicationList.push(applicationItem);
      });
    }
    const dataForSave = {
      ...applyData,
      applicationList: newApplicationList,
    };
    yield call(save, dataForSave);

    yield put({
      type: 'saveSnapshot',
      payload: {
        processInstanceId,
        taskId,
        claimProcessData: dataForSave,
      },
    });

    yield put({
      type: 'saveClaimProcessData',
      payload: dataForSave,
    });
  }
  return lastResponse;
}

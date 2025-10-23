import { batchCreateCaseSubmit } from '@/services/owbRegistrationSubmissionControllerService';
import { NAMESPACE } from 'packages/Opus/Pages/Process/Claim/BatchCaseCreation/activity.config';

export default function* getBatchCreateCaseSubmit({ payload }: any, { put, call, select }: any) {
  const { uploadFiles } = yield select(({ [NAMESPACE]: modelnamespace }: any) => ({
    uploadFiles: modelnamespace?.uploadDocumentsModal?.uploadFiles,
  }));
  const docId = uploadFiles?.[0]?.docId || '';
  if (!docId) return {};

  const response = yield call(batchCreateCaseSubmit, {
    docId,
    keepErrorHandle: !!payload?.keepErrorHandle,
  });
  if (response && response.success) {
    yield put({
      type: 'setBatchCreateCaseSubmit',
      payload: response?.resultData,
    });

    return response?.resultData || {};
  }
  return {};
}

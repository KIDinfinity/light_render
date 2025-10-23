import { updateDocScanningCase } from '@/services/owbRegistrationSubmissionControllerService';
import { getSubmitData } from '@/utils/modelUtils/claimUtils';
import { eOperationType } from '@/enum/eOperationType';

export default function* ({ payload }: any, { select, put, call }: any): Generator<any, any, any> {
  const { dataForSubmit } = payload;
  const taskDetail = yield select((state: any) => state.processTask.getTask);

  yield call(
    updateDocScanningCase,
    getSubmitData({
      taskDetail,
      dataForSubmit,
      operationType: eOperationType.updateDocScanningCase,
    })
  );
}

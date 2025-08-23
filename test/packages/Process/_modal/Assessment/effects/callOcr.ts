import lodash from 'lodash';
import { denormalizeClaimData } from '@/utils/claimUtils';
import { formUtils } from 'basic/components/Form';
import { notification } from 'antd';
import { triggerOCR } from '@/services/documentOcrControllerService';
import { OperationType } from '../enum';

export default function* callOcr(action: any, { put, select }: any) {
  const { nameSpace, incidentId } = action?.payload;

  // @ts-ignore
  const claimProcessData = yield select(
    ({ [nameSpace]: modelnamepsace }: any) => modelnamepsace.claimProcessData
  );
  // @ts-ignore
  const claimEntities = yield select(
    ({ [nameSpace]: modelnamepsace }: any) => modelnamepsace.claimEntities
  );
  // @ts-ignore
  const taskDetail: any = yield select(({ processTask }: any) => processTask.getTask);

  const getParams = () => {
    const denormalizedData = denormalizeClaimData(claimProcessData, claimEntities);

    const { processInstanceId, taskId, caseCategory, businessNo, assignee } = lodash.pick(
      taskDetail,
      ['taskId', 'processInstanceId', 'taskDefKey', 'caseCategory', 'businessNo', 'assignee']
    );

    return {
      caseNo: processInstanceId,
      caseCategory,
      businessNo,
      taskId,
      assignee,
      activityKey: taskDetail?.taskDefKey,
      operationType: OperationType.ReAssess,
      businessData: {
        ...formUtils.formatFlattenValue(formUtils.cleanValidateData(denormalizedData)),
      },
      incidentId,
    };
  };

  // @ts-ignore
  const response: any = yield triggerOCR({ ...getParams() });

  yield put({
    type: 'claimEditable/setTaskNotEditable',
    payload: {
      taskNotEditable: true,
    },
  });

  if (lodash.isPlainObject(response) && response.success) {
    notification.success({
      message: 'OCR request has already been triggered, please wait for it done.',
    });
  } else {
    yield put({
      type: 'claimEditable/setTaskNotEditable',
      payload: {
        taskNotEditable: false,
      },
    });
  }

  return [];
}

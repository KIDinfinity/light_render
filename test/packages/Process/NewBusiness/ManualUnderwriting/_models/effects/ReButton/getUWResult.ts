import { NAMESPACE } from '../../../activity.config';
import { notification } from 'antd';
import lodash from 'lodash';
import { EOptionType } from 'basic/enum/EOptionType';

import { formatMessageApi } from '@/utils/dictFormatMessage';
import { handleErrorMessageIgnoreXErrorNotice } from '@/utils/commonMessage';
import { deleteData } from '@/services/dcSnapshotService';
import { updateOperationDate } from '@/services/bpmBusinessProcessControllerV2Service';

export default function* ({ payload }: any, { call, select, put }: any): Generator<any, any, any> {
  const taskDetail = yield select(({ processTask }: any) => processTask.getTask) || {};

  const { businessNo, taskId, caseNo, caseCategory, taskDefKey } = taskDetail;

  yield put({
    type: 'auditLogController/logTask',
    payload: {
      action: payload.type,
    },
  });

  const processData = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData
  ) || {};
  const entities = yield select(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.entities);

  const BEDatas: any = yield put.resolve({
    type: 'getFEToBE',
    payload: {
      processData,
      entities,
    },
  });
  if (!lodash.isEmpty(BEDatas)) {
    const businessData: any = yield put.resolve({
      type: 'getBusinessData',
      payload: {
        businessData: BEDatas,
        ...payload,
      },
    });
    if (!!businessData && !lodash.isEmpty(businessData)) {
      yield deleteData({
        businessNo,
        dataType: 'mainPage',
        taskId,
      });

      yield put({
        type: 'getBEToFE',
        payload: {
          businessData,
        },
      });

      yield put({
        type: 'claimCaseController/saveSnapshot',
        payload: {
          postData: businessData,
          optionType: EOptionType.Save,
        },
      });

      if (businessData.failCloseEnquiry === 'N') {
        notification.success({
          message: formatMessageApi({
            Label_COM_WarningMessage: 'venus_bpm.message.retry.success',
          }),
        });
      } else {
        handleErrorMessageIgnoreXErrorNotice({
          promptMessages: [
            {
              code: 'MSG_000689',
              content: formatMessageApi({ Label_COM_WarningMessage: 'MSG_000689' }),
            },
          ],
        });
      }
      yield call(updateOperationDate, {
        processInstanceId: businessData?.caseNo,
      });
      if (businessNo && caseNo && caseCategory) {
        yield put({
          type: 'integration/getIntegrationChecklist',
          payload: {
            businessNo,
            caseNo,
            caseCategory,
            taskDefKey,
          },
        });
      }

      return true;
    }
  }
}

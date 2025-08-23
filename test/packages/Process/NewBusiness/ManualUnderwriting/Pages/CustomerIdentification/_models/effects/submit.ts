import lodash from 'lodash';
import { getSubmitData } from '@/utils/modelUtils/nbUtils';

import { OptionType } from 'process/NewBusiness/ManualUnderwriting/_enum';
import { NAMESPACE as NBNAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

import { getTouchResult } from '@/services/navigatorCaseTouchOperationControllerService';
import MessageModal from 'process/NewBusiness/ManualUnderwriting/_models/effects/DataHandle/MessageModal';

import { NAMESPACE } from '../../activity.config';
import { formUtils } from 'basic/components/Form';
import { Action, ProcActivityKey } from '@/components/AuditLog/Enum';

const delay = (timeout: number) => new Promise((resolve) => setTimeout(resolve, timeout));
export default function* (
  { payload }: any,
  { put, call, select }: any
): Generator<any, boolean, any> {
  let businessData = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimProcessData
  );
  businessData = formUtils.formatFlattenValue(formUtils.cleanValidateData(businessData));

  const taskDetail = yield select(({ processTask }: any) => processTask.getTask);
  const checkDuplicating = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.checkDuplicating
  );

  const params = getSubmitData({
    taskDetail,
    dataForSubmit: { businessData },
    operationType: checkDuplicating ? OptionType.duplicateConfirm : OptionType.updateClient,
  });

  // 4.请求数据

  const touchId: any = yield put.resolve({
    type: `${NBNAMESPACE}/getTouchId`,
    payload: {
      params,
      option: {},
    },
  });

  if (!!touchId) {
    while (true) {
      const response = yield getTouchResult({ touchId });

      MessageModal(response);

      const newBusinessData = response?.resultData?.businessData || {};

      const progressData = yield put.resolve({
        type: `${NBNAMESPACE}/getProgressData`,
        payload: {
          touchId,
          params,
          hasBusinessData: !lodash.isEmpty(newBusinessData),
        },
      });

      if (!lodash.isEmpty(progressData) || !lodash.isEmpty(newBusinessData)) {
        yield put.resolve({
          type: 'auditLogController/logButton',
          payload: {
            action: Action.Confirm,
            activityKey: ProcActivityKey.ProposalChange,
            newProcessData: businessData,
            isTitleSection: true,
          },
        });

        yield put({
          type: 'saveShow',
          payload: {
            show: false,
          },
        });
      }

      if (!response?.success) {
        const code = lodash.get(response, 'promptMessages[0].code');
        if (['connection.with.ccr.failed.', 'need.update.ccr.client.info'].includes(code)) {
          yield put.resolve({
            type: `updateCustomerIndentification`,
            payload: {
              businessData: newBusinessData,
            },
          });
        }
      }

      if (!lodash.isEmpty(newBusinessData)) {
        yield put.resolve({
          type: `updateClientInfo`,
          payload: {
            businessData: newBusinessData,
            checkDuplicating,
          },
        });
        yield put({
          type: `${NBNAMESPACE}/saveBizDataV2`,
          payload: {
            businessData: newBusinessData,
          },
        });
        yield put({
          type: `${NBNAMESPACE}/getRiskIndicator`,
          payload: { applicationNo: taskDetail.businessNo },
        });
      }

      if (!response?.success || !lodash.isEmpty(newBusinessData)) {
        yield put({
          type: `${NBNAMESPACE}/getProgressStatus`,
          payload: {
            response,
            progressData,
          },
        });

        break;
      }

      yield call(delay, 2000);
    }
  }
}

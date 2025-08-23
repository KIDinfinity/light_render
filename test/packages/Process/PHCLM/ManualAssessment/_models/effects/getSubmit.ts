import lodash from 'lodash';
import { notification } from 'antd';

import { registerClaimCase } from '@/services/claimRegisterControllerService';
import { retrieveFundValuesV2 } from '@/services/claimMajoControllerService';

import { safeParseUtil } from '@/utils/utils';
import { handleMessageModal } from '@/utils/commonMessage';
import { getSubmitData } from '@/utils/modelUtils/claimUtils';
import { Action } from '@/components/AuditLog/Enum';

import { NAMESPACE } from '../../activity.config';

import { VLD_000365 } from '../../validators';

export default function* getCategoryByProcedureCode(
  { payload = {} }: any,
  { call, select, put }: any
): Generator<any, any, any> {
  const { buttonList = [], type }: any = payload;

  const claimEntities = yield select(
    ({ [NAMESPACE]: modelNamespace }: any) => modelNamespace?.claimEntities
  ) || {};

  const taskDetail: any = yield select(({ processTask }: any) => processTask?.getTask) || {};
  const { inquiryBusinessNo, processInstanceId, taskId } = taskDetail || {};

  const activityButtonList = buttonList?.[0]?.activityButtonServiceList;
  const { activityVariables = {} } = lodash.pick(
    safeParseUtil(activityButtonList?.[1]?.buttonParams),
    ['activityVariables']
  );

  const dataForSubmit: any = yield put.resolve({
    type: 'getDataForSubmit',
  });

  const submitData = yield getSubmitData({
    taskDetail,
    dataForSubmit,
    variables: activityVariables,
  });

  const config = {
    register: {
      api: registerClaimCase,
      auditLogKey: Action.ClaimRegister,
      message: 'Claim Register successfully!',
      extraAction: async () => {
        await put({
          type: 'setRegisterAlert',
          payload: {
            showRegisterAlert: false,
          },
        });
      },
    },
    retrieve: {
      beforApi: () => {
        const payableError = VLD_000365(claimEntities);
        !!payableError &&
          handleMessageModal([
            {
              content: payableError,
            },
          ]);

        return payableError;
      },
      api: retrieveFundValuesV2,
      auditLogKey: Action.RetrievePolicyValue,
      message: 'Retrieve Policy Value successfully!',
    },
  };

  if (lodash.isFunction(config?.[type]?.beforApi) && !!config?.[type]?.beforApi()) {
    return false;
  }

  const response = yield call(config[type].api, {
    ...submitData,
    inquiryBusinessNo,
  });

  yield put({
    type: 'auditLogController/logButton',
    payload: {
      action: config?.[type]?.auditLogKey,
    },
  });

  if (
    lodash.isPlainObject(response) &&
    !!response.success &&
    lodash.isPlainObject(response?.resultData) &&
    !lodash.isEmpty(response?.resultData)
  ) {
    notification.success({
      message: config?.[type]?.message,
    });

    // TODO： override claimPayable
    yield put({
      type: 'saveClaimProcessData',
      payload: {
        ...response.resultData,
        processInstanceId,
        taskId,
      },
    });

    yield put.resolve({
      type: 'paymentSavePaymentData',
      payload: {
        claimData: response.resultData,
      },
    });

    yield put({
      type: 'claimCaseController/saveSnapshot',
      payload: {
        postData: response.resultData,
      },
    });

    config?.[type]?.extraAction && config?.[type]?.extraAction();
    return true;
  }

  return false;
}

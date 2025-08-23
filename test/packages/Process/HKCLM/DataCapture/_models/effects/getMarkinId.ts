import claimCaseControllerService from '@/services/claimCaseControllerService';
import { notification } from 'antd';
import { NAMESPACE } from '../../activity.config';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { Action } from '@/components/AuditLog/Enum';

export default function* getMarkinId({ payload }: any, { call, put, select }: any) {
  const { policyNo, incidentId } = payload;

  // @ts-ignore
  const claimTypeArray = yield select(({ [NAMESPACE]: modelNameSpace }: any) =>
    formUtils.queryValue(
      modelNameSpace.claimEntities?.incidentListMap?.[incidentId]?.claimTypeArray
    )
  ) || [undefined];

  // @ts-ignore
  const { caseNo, caseCategory } = yield select(({ processTask }: any) => processTask?.getTask);

  const claimType = claimTypeArray?.[0];

  // @ts-ignore
  const markinId = yield select(
    ({ [NAMESPACE]: modelNameSpace }: any) => modelNameSpace.claimProcessData?.markinId
  );

  // if not enough params, end function
  if (
    lodash.isNil(policyNo) ||
    lodash.isNil(claimType) ||
    lodash.isNil(caseNo) ||
    lodash.isNil(caseCategory) ||
    !lodash.isNil(markinId)
  ) {
    notification.error({
      message: `Fail to generate markin id, missing necessary params.`,
    });

    return;
  }

  // @ts-ignore
  const response = yield call(claimCaseControllerService.getMarkinId, {
    caseNo,
    policyNo,
    claimType,
    caseCategory,
  });

  if (!response?.success || !response?.resultData || !response?.resultData?.markinId) {
    notification.error({
      message: 'Fail to generate markin id, please retry.',
    });

    return;
  }

  yield put({
    type: `setMarkinId`,
    payload: {
      markinId: response?.resultData?.markinId,
    },
  });
  yield put({
    type: 'saveSnapshot',
  });
  /** -- auditLog -- */
  yield put({
    type: 'auditLogController/logTask',
    payload: {
      action: Action.GenMarkinId,
    },
  });

  notification.success({ message: 'Succeed to generate markin id.' });
}

import { notification } from 'antd';
import { formUtils } from 'basic/components/Form';
import { denormalizeClaimData } from 'opus/NewBusiness/ManualUnderwriting/_utils/normalizrUtils';
import { NAMESPACE } from '../../../activity.config';
import convert_businessDataFEToBE from 'opus/Utils/convert_businessDataFEToBE';
import lodash from 'lodash';
import { tenant } from '@/components/Tenant';
import { Action } from '@/components/AuditLog/Enum';

export default function* ({ payload }: any, { put, select }: any): Generator<any, any, any> {
  const taskDetail = yield select(({ processTask }: any) => processTask.getTask) || {};
  const { processData, entities } = payload;
  const denormalizedData = denormalizeClaimData(processData, entities);
  const claimData = formUtils.formatFlattenValue(denormalizedData);
  const originBusinessData = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.businessData
  );

  const diff = yield put.resolve({
    type: 'auditLogController/getDiff',
    payload: {
      action: Action.Confirm,
      activityKey: taskDetail?.taskDefKey,
      newProcessData: formUtils.formatFlattenValue(formUtils.cleanValidateData(denormalizedData)),
      isTitleSection: true,
    },
  });
  const fundChanged = lodash
    .chain(diff)
    .some((item) => lodash.includes(item.path, 'fund.fundInfoList'))
    .value();
  const response = convert_businessDataFEToBE(
    {
      requestData: { ...claimData, originBusinessData, fundChanged },
    },
    tenant.region()
  );

  const response_cleanValidate = formUtils.formatFlattenWithoutTransferBooleanValue(
    formUtils.cleanValidateData(response)
  );
  try {
    return response_cleanValidate?.businessData ?? {};
  } catch (err) {
    yield put({
      type: 'login/saveLoadingStatus',
      payload: {
        loadingStatus: false,
      },
    });
    // TODO:这里需要国际化
    notification.error({
      message: 'businessDataFEToBE fail!',
    });
  }
}

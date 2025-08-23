import { notification } from 'antd';
import { businessDataFEToBE } from '@/services/gotConvertService';
import { formUtils } from 'basic/components/Form';
import { denormalizeClaimData } from 'process/NewBusiness/ManualUnderwriting/_utils/normalizrUtils';
import { getTask } from '@/services/navigatorTaskOperationControllerService';
import { NAMESPACE } from '../../../activity.config';
import lodash from 'lodash';

export default function* ({ payload }: any, { call, put, select }: any): Generator<any, any, any> {
  const { processData, entities } = payload;

  const taskDetail = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.taskDetail
  );
  const denormalizedData = denormalizeClaimData(processData, entities);
  const claimData = formUtils.formatFlattenValue(formUtils.cleanValidateData(denormalizedData));

  const dataSource1 = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.businessData
  );

  let originBusinessData = {};
  if (lodash.isEmpty(dataSource1)) {
    const response = yield call(getTask, {
      dataType: 'mainPage',
      skipSnapshot: false,
      taskId: taskDetail?.taskId,
    });
    if (response.success) {
      originBusinessData = lodash.get(response, 'resultData.businessData', {});
    }
  } else {
    originBusinessData = dataSource1;
  }

  const response = yield call(businessDataFEToBE, {
    requestData: { ...claimData, originBusinessData },
  });

  if (
    lodash.isPlainObject(response) &&
    !!response?.success &&
    !lodash.isEmpty(response?.responseData?.businessData)
  ) {
    return response?.responseData?.businessData ?? {};
  } else {
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
    return {};
  }
}

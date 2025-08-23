import lodash from 'lodash';
import { premiumCalculation } from '@/services/owbNbProposalControllerService';
import { deleteData } from '@/services/dcSnapshotService';
import { notification } from 'antd';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

export default function* ({ payload }: any, { call, put, select }: any): Generator<any, any, any> {
  const { businessNo, taskId } = yield select(({ processTask }: any) => processTask.getTask);
  const { operationType, isWaive } = payload;

  // 添加转换成后端需要数据处理开始
  const processData = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData
  ) || {};
  const entities = yield select(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.entities);

  const businessData: any = yield put.resolve({
    type: 'getFEToBE',
    payload: {
      processData,
      entities,
    },
  });
  // 添加转换成后端需要数据处理结束
  const response = yield call(premiumCalculation, {
    ...businessData,
    operationType,
    reCalculateFlag: null,
  });

  if (lodash.isPlainObject(response) && response.success && !lodash.isEmpty(response.resultData)) {
    yield call(deleteData, {
      businessNo,
      dataType: 'mainPage',
      taskId,
    });
    yield put({
      type: 'saveCoverageListData',
      payload: {
        businessData: response?.resultData?.businessData,
        isWaive,
      },
    });
    const possibleSusOptNames = lodash.get(response, 'resultData.businessData.possibleSusOptNames');
    if (lodash.isArray(possibleSusOptNames)) {
      yield put({
        type: 'savePossibleSusOptNames',
        possibleSusOptNames,
      });
    }
    const actionList = lodash
      .chain(response)
      .get('resultData.businessData.policyList[0].clientInfoList', [])
      .map((clientInfoItem: any) => {
        return put({
          type: 'changeBasicInfoFields',
          payload: {
            changedFields: {
              customerAge: clientInfoItem?.customerAge,
            },
            id: clientInfoItem?.id,
          },
        });
      })
      .value();
    yield actionList;
    if (isWaive) {
      notification.success({
        message: 'recalculate success',
      });
    }
  }

  return response;
}

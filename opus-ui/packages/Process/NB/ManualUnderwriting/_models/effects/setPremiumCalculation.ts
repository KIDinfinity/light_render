import lodash from 'lodash';
import { premiumCalculation } from '@/services/owbNbProposalControllerService';
import { deleteData } from '@/services/dcSnapshotService';

export default function* setPremiumCalculation({ payload }: any, { call, put, select }: any) {
  const { businessNo, taskId } = yield select(({ processTask }: any) => processTask.getTask);
  const { operationType } = payload;
  const data = yield put.resolve({
    type: 'getDataForSubmit',
  });
  const response = yield call(premiumCalculation, {
    ...lodash.get(data, 'businessData', {}),
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
  }

  return response;
}

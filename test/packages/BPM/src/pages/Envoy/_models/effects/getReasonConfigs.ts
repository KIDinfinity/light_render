import lodash from 'lodash';
import envoyReasonConfigControllerService from '@/services/envoyReasonConfigControllerService';

function* getReasonConfigs({ signal }: any, { select, call, put }: any) {
  const { activityKey, caseCategory } = yield select((state: any) => state.envoyController);

  const response = yield call(
    envoyReasonConfigControllerService.listConfigs,
    {
      activityKey,
      caseCategory,
    },
    {
      signal,
    }
  );

  if (lodash.isPlainObject(response) && response.success && lodash.isArray(response?.resultData)) {
    yield put({
      type: 'saveReasonConfigs',
      payload: {
        reasonConfigs: response?.resultData,
      },
    });

    const { currentReasonGroups } = yield select((state: any) => state.envoyController);

    for (
      let groupIdx = 0, groupLen = currentReasonGroups?.length;
      groupIdx < groupLen;
      groupIdx += 1
    ) {
      if (
        currentReasonGroups[groupIdx]?.reasonDetails?.[0]?.destRoleOpt?.length === 0 &&
        currentReasonGroups[groupIdx].groupCode === 'P_PH_PND_019'
      ) {
        yield put({
          type: 'setDestRoleOpt',
          payload: {
            groupIdx,
            groupCode: 'P_PH_PND_019',
          },
        });
      }
    }
  }

  const listConfigsResponse = yield call(envoyReasonConfigControllerService.listConfigs, {
    caseCategory,
  });
  if (
    lodash.isPlainObject(listConfigsResponse) &&
    listConfigsResponse.success &&
    lodash.isArray(listConfigsResponse?.resultData)
  ) {
    yield put.resolve({
      type: 'saveCaseCategoryReasonConfigs',
      payload: {
        caseCategory,
        caseCategoryReasonConfigs: listConfigsResponse?.resultData,
      },
    });
    yield put({
      type: 'saveCaseCategoryReasonDocConfigs',
      payload: {
        caseCategory,
        caseCategoryReasonConfigs: listConfigsResponse?.resultData,
      },
    });
  }
}

export default getReasonConfigs;

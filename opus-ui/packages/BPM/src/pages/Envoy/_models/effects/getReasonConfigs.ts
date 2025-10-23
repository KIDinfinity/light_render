import lodash from 'lodash';
import envoyReasonConfigControllerService from '@/services/envoyReasonConfigControllerService';
import { getActivityPermissionLimit } from '@/services/rbac2PermissionLimitControllerService';
import { Validator } from 'jsonschema';

const validator = new Validator();
function* getReasonConfigs({ signal }: any, { select, call, put }: any) {
  const { activityKey, caseCategory } = yield select((state: any) => state.envoyController);
  const userId = yield select((state: any) => state.user?.currentUser?.userId);
  const schema = {
    id: 'request-payload',
    type: 'object',
    properties: {
      activityKey: {
        type: 'string',
      },
      caseCategory: {
        type: 'string',
      },
    },
    required: ['activityKey', 'caseCategory'],
  };
  const params = {
    activityKey,
    caseCategory,
  };
  const validateResult = validator.validate(params, schema);

  if (!validateResult.valid) {
    console.warn('validateResult', validateResult);
    return false;
  }
  const response = yield call(envoyReasonConfigControllerService.listConfigs, params, {
    signal,
  });

  const envoyEditResponse = yield call(
    getActivityPermissionLimit,
    {
      activityKey,
      caseCategory,
      categoryCode: 'envoyEdit',
      userId,
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
        envoyEditConfigs: envoyEditResponse?.resultData,
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

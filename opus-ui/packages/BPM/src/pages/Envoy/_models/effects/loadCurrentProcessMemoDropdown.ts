import envoyMemoControllerService from '@/services/envoyMemoControllerService';
import { Validator } from 'jsonschema';
import lodash from 'lodash';

const validator = new Validator();

export default function* ({ payload }: any, { call, put, select }: any) {
  const { caseCategory, activityKey } = yield select((state: any) => state.envoyController);

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
    caseCategory,
    activityKey,
  };
  const validateResult = validator.validate(params, schema);
  if (!validateResult.valid || !caseCategory || !activityKey) {
    console.warn('validateResult', validateResult);
    return false;
  }
  const response = yield call(
    envoyMemoControllerService.listMemoByCaseCategoryAndActivityKey,
    params
  );
  const { success, resultData } = lodash.pick(response, ['success', 'resultData']);

  if (success && lodash.isArray(resultData)) {
    yield put({
      type: 'saveCurrentProcessMemoDropdown',
      payload: {
        currentProcessMemoDropdown: resultData,
      },
    });
  }
}

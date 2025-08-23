import lodash from 'lodash';
import {
  asyncRequestReIndexDoc
} from '@/services/docViewControllerService';

export default function* reIndexAsyncStart({ payload }: any, { call }: any) {
  const response = yield call(asyncRequestReIndexDoc, payload);

  if (lodash.isPlainObject(response) && response.success) {
    return {
      result: response.resultData,
      loopTime: true,
    };
  }
  return {
    result: false,
  };
}

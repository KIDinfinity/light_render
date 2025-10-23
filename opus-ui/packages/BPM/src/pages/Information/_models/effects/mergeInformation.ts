import lodash from 'lodash';
import type { IEffects } from '../interfaces/index';

export default function* mergeInformation({ payload }: any, { put, select }: IEffects) {
  const changedFields = lodash.get(payload, 'changedFields', {});
  const { informationData } = yield select((state: any) => state.navigatorInformationController);
  const result = {
    ...informationData,
    ...changedFields,
  };
  yield put({
    type: 'setInformationData',
    payload: {
      informationData: result,
    },
  });
}

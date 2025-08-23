import lodash from 'lodash';
import type { IEffects } from '../interfaces/index';

export default function* setInformationDataByKey({ payload }: any, { put, select }: IEffects) {
  const informationData = select((state) => state.navigatorInformationController?.informationData);
  const key = lodash.get(payload, 'key', '');
  const value = lodash.get(payload, 'value', '');
  const result = {
    ...informationData,
    [key]: value,
  };
  yield put({
    type: 'setInformationData',
    payload: {
      informationData: result,
    },
  });
}

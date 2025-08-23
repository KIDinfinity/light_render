import lodash from 'lodash';
import { CategoryCode } from '@/utils/constant/information';

export default function* autoAddInformationHandle({ payload }: any, { put }: any) {
  const changedFields = lodash.get(payload, 'changedFields');

    yield put({
      type: 'setAddInformationBuffer',
      payload: {
        addInformationBuffer: lodash.pick(changedFields, ['categoryCode']),
      },
    });

  if (changedFields?.categoryCode !== CategoryCode.BusinessCheck) {
    yield put({
      type: 'changeShowInformationList',
      payload: {
        isShowInformationList: true,
        isShowAddBtn: false,
      },
    });
  }
}

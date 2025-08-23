import { CategoryCode } from '@/utils/constant/information';
import type { IEffects } from '../interfaces/index';

export default function* setFieldsFromOutside({ payload }: any, { put }: IEffects) {
  const changedFields = payload?.changedFields;

  yield put({
    type: 'changeInformationFields',
    payload: {
      changedFields,
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

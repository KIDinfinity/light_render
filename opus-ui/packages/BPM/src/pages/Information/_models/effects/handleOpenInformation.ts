import { SwitchDrawerTab } from 'navigator/enum/SwitchDrawerTab';
import type { IEffects } from '../interfaces/index';

export default function* handleOpenInformation(_: any, { put }: IEffects) {
  const categoryCode = _?.payload?.categoryCode;
  yield put({
    type: 'workspaceSwitchOn/changeSwitch',
    payload: {
      name: SwitchDrawerTab.Remark,
    },
  });
  // 选择类型
  if (categoryCode) {
    yield put({
      type: 'setFieldsFromOutside',
      payload: {
        changedFields: {
          categoryCode,
        },
      },
    });
  }

  yield put({
    type: 'loadFirstPage',
  });
}

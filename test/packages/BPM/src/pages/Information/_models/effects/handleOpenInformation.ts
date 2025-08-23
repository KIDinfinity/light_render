import lodash from 'lodash';
import { SwitchDrawerTab } from 'navigator/enum/SwitchDrawerTab';
import type { IEffects } from '../interfaces/index';
import { ESiderPermissions } from 'basic/enum';

export default function* handleOpenInformation(_: any, { put, select }: IEffects) {
  const categoryCode = _?.payload?.categoryCode;
  const commonAuthorityList = yield select(
    (state: any) => state.authController.commonAuthorityList
  );

  const auth = lodash.find(commonAuthorityList, {
    authorityCode: ESiderPermissions.InformationManagement,
  })?.result;

  if (auth) {
    yield put({
      type: 'workspaceSwitchOn/changeSwitch',
      payload: {
        name: SwitchDrawerTab.Remark,
      },
    });
  }

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

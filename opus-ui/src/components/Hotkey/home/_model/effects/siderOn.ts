import { SwitchDrawerTab } from 'navigator/enum/SwitchDrawerTab';
/*
 * @Descripttion:
 * @Author: jack_huang
 * @Date: 2019-12-06 20:43:28
 * @LastEditors: jack_huang
 * @LastEditTime: 2019-12-07 19:02:58
 */

function* siderOn(_: any, { put, select }: any) {
  const isSwitchOn = yield select((state: any) => state.workspaceSwitchOn.isSwitchOn);

  if (isSwitchOn) {
    yield put({
      type: 'workspaceSwitchOn/closeSwitch',
    });
  } else {
    yield put({
      type: 'workspaceSwitchOn/changeSwitch',
      payload: {
        name: SwitchDrawerTab.SmartCircle,
      },
    });
  }
}

export default siderOn;

/*
 * @Descripttion: 默认选中
 * @Author: jack_huang
 * @Date: 2019-11-25 11:03:52
 * @LastEditors: jack_huang
 * @LastEditTime: 2019-12-09 18:24:46
 */

import OrderDirection from '../../enum/orderDirection';

function* defaultHome({ payload }: any, { put }: any) {
  yield put({
    type: 'hotkey/homeModuleOrder',
    payload: {
      order: OrderDirection.Next,
    },
  });
  yield put({
    type: 'hotkey/homeSectionOrder',
    payload: {
      order: OrderDirection.Prev,
    },
  });
}

export default defaultHome;

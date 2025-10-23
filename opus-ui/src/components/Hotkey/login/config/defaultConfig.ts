/*
 * @Descripttion: 配置 - 默认数据结构
 * @Author: jack_huang
 * @Date: 2019-11-22 17:49:48
 * @LastEditors: jack_huang
 * @LastEditTime: 2019-12-07 16:16:24
 */
// 枚举 - 筛选类型
import OrderDataType from '../../common/enum/OrderDataType';
// 枚举 - 唯一id
import { HotkeyLoginIds } from '../../common/enum/hotkeyIds';

export default [
  {
    id: HotkeyLoginIds.loginUserName,
    keyboardType: OrderDataType.Field,
    order: 1,
    active: 1,
  },
  {
    id: HotkeyLoginIds.loginPassword,
    keyboardType: OrderDataType.Field,
    order: 2,
    active: 0,
  },
  {
    id: HotkeyLoginIds.loginSubmit,
    keyboardType: OrderDataType.Field,
    keyboard: OrderDataType.Enter,
    active: 0,
  },
];

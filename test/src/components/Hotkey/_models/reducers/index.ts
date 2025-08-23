/*
 * @Descripttion: redux - 入口引入
 * @Author: jack_huang
 * @Date: 2019-11-18 14:54:33
 * @LastEditors: jack_huang
 * @LastEditTime: 2019-12-07 15:04:14
 */

// login模块
import { loginAddKey, loginFieldOrder } from '../../login/_model/reducers';

// home模块
import {
  homeAddKey,
  homeRemoveHotkey,
  homeModuleOrder,
  homeSectionOrder,
  homeFieldOrder,
} from '../../home/_model/reducers';

import saveHotkeyBind from './saveHotkeyBind';
import saveHomeHotKeyBind from './saveHomeHotKeyBind';

export {
  loginAddKey,
  loginFieldOrder,
  homeAddKey,
  homeRemoveHotkey,
  homeModuleOrder,
  homeSectionOrder,
  homeFieldOrder,
  saveHotkeyBind,
  saveHomeHotKeyBind,
};

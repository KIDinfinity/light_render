/*
 * @Descripttion: hotkey - 全局快捷键
 * @Author: jack_huang
 * @Date: 2019-12-06 22:47:12
 * @LastEditors: jack_huang
 * @LastEditTime: 2019-12-07 19:00:51
 */
import {
  goHome,
  logout,
  open360,
  openChat,
  openAI,
  openModeButton,
  defaultHome,
  goSearch,
  siderOn,
} from '@/components/Hotkey/home/_model/effects';

export default {
  namespace: 'hotkeyGlobal',

  state: {},

  effects: {
    goHome,
    logout,
    open360,
    openChat,
    openAI,

    openModeButton,

    goSearch,
    siderOn,
    defaultHome,
  },

  reducers: {},
};

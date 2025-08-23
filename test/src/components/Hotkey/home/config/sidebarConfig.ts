/*
 * @Descripttion: 快捷键 - 通用快捷键
 * @Author: jack_huang
 * @Date: 2019-11-12 17:05:49
 * @LastEditors: jack_huang
 * @LastEditTime: 2019-12-07 18:58:00
 */
// 快捷键
import Shortcutkey from '../enum/shortcutkey';

export default [
  {
    id: 'open360',
    keyboard: Shortcutkey.Open360,
    actionName: 'hotkeyGlobal/open360',
  },
  {
    id: 'openChat',
    keyboard: Shortcutkey.OpenChat,
    actionName: 'hotkeyGlobal/openChat',
  },
  {
    id: 'openAI',
    keyboard: Shortcutkey.OpenAI,
    actionName: 'hotkeyGlobal/openAI',
  },
  {
    id: 'logout',
    keyboard: Shortcutkey.Logout,
    actionName: 'hotkeyGlobal/logout',
  },
  {
    id: 'goHome',
    keyboard: Shortcutkey.GoHome,
    actionName: 'hotkeyGlobal/goHome',
  },
  {
    id: 'goSearch',
    keyboard: Shortcutkey.GoAdvancedSearch,
    actionName: 'hotkeyGlobal/goSearch',
  },
  {
    id: 'siderOn',
    keyboard: Shortcutkey.sideOn,
    actionName: 'hotkeyGlobal/siderOn',
  },
];

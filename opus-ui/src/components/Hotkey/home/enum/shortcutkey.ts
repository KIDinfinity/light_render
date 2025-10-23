/*
 * @Descripttion: 配置 - 枚举 - 快捷键（TODO:不存在顶层模块，需要去掉）
 * @Author: jack_huang
 * @Date: 2019-11-21 17:28:15
 * @LastEditors: jack_huang
 * @LastEditTime: 2019-12-07 19:02:07
 */
enum Shortcutkey {
  // 顶层模块选择
  ModulePrev = 'alt+left',
  ModuleNext = 'alt+right',

  // 子模块选择
  SectionPrev = 'alt+up',
  SectionNext = 'alt+down',

  // 内容选择
  FieldPrev = 'shift+tab, up',
  FieldNext = 'tab, down',

  // 快捷键
  Enter = 'enter',
  Open360 = 'alt+3',
  OpenChat = 'alt+c',
  OpenAI = 'alt+s',
  Logout = 'alt+l',
  GoHome = 'alt+h',
  GoAdvancedSearch = 'alt+i',
  ToggleModeButton = 'alt+w',

  // table上下页选择
  TablePagePrev = 'left',
  TablePageNext = 'right',

  // 菜单开关快捷键
  sideOn = 'alt+q',
}

export default Shortcutkey;

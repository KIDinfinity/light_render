/*
 * @Descripttion: 配置 - 枚举 - id
 * @Author: jack_huang
 * @Date: 2019-11-21 17:49:10
 * @LastEditors: jack_huang
 * @LastEditTime: 2019-12-09 13:43:03
 */

enum HotkeyLoginIds {
  loginUserName = 'username',
  loginPassword = 'password',
  loginSubmit = 'submit',
}

enum HotkeyHomeIds {
  Task = 'Task',
  Sidebar = 'Sidebar',
  SidebarPage = 'SidebarPage',
  UserOptions = 'UserOptions',

  HomeWatchingTableModule = 'HomeWatchingTableModule',
  HomeWatchingTable = 'HomeWatchingTable',
  HomeWatchingFilterTable = 'HomeWatchingFilterTable',
  HomeWatchingFilterItem = 'HomeWatchingFilterItem',
  HomeWatchingFilterItemCard = 'HomeWatchingFilterItemCard',
  HomeWatchingCardModule = 'HomeWatchingCardModule',
  HomeWatchingFilterCard = 'HomeWatchingFilterCard',
  HomeWatchingCard = 'HomeWatchingCard',
  HomeWatchingSwiper = 'HomeWatchingSwiper',
  HomeWatchingFlow = 'HomeWatchingFlow',
  HomeWatchingFlowProcessList = 'HomeWatchingFlowProcessList',
  HomeWatchingFlowActivityList = 'HomeWatchingFlowActivityList',
  HomeWatchingFlowAdvancedSearch = 'HomeWatchingFlowAdvancedSearch',
  HomeWatchingFlowActivityList1 = 'HomeWatchingFlowActivityList1',
  HomeWatchingFlowAdvancedSearch1 = 'HomeWatchingFlowAdvancedSearch1',
  ModeButton = 'ModeButton',

  ToggleModeButton = 'ToggleModeButton',
  FlowMode = 'FlowMode',
  CardMode = 'CardMode',
  TableMode = 'TableMode',
  SearchMode = 'SearchMode',
}

export { HotkeyLoginIds, HotkeyHomeIds };

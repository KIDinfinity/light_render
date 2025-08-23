/*
 * @Descripttion: 配置 - 默认数据结构
 * @Author: jack_huang
 * @Date: 2019-11-22 17:49:48
 * @LastEditors: jack_huang
 * @LastEditTime: 2019-12-09 18:12:23
 */
// 枚举 - 筛选类型
import OrderDataType from '../../common/enum/OrderDataType';
// 枚举 - 唯一id
import { HotkeyHomeIds } from '../../common/enum/hotkeyIds';
// 事件类型
import ActionType from '../enum/actionType';
// 快捷键
import Shortcutkey from '../enum/shortcutkey';

export default [
  {
    id: HotkeyHomeIds.HomeWatchingCardModule,
    orderDataType: OrderDataType.Module,
    order: 1,
    sections: [
      {
        id: HotkeyHomeIds.HomeWatchingCard,
        orderDataType: OrderDataType.Section,
        order: 1,
        module: HotkeyHomeIds.Task,
        fields: [
          {
            id: HotkeyHomeIds.HomeWatchingSwiper,
            orderDataType: OrderDataType.Field,
            actionType: ActionType.NextPrevFunc,
          },
        ],
        keyboard: Shortcutkey.Enter,
        action: () => {
          const ele: any = document.querySelector('.swiper-slide-active');
          if (ele) {
            setTimeout(() => {
              ele.click();
            }, 500);
          }
        },
      },
      {
        id: HotkeyHomeIds.HomeWatchingFilterCard,
        orderDataType: OrderDataType.Section,
        order: 2,
        module: HotkeyHomeIds.Task,
        fields: [
          {
            id: HotkeyHomeIds.HomeWatchingFilterItemCard,
            orderDataType: OrderDataType.Field,
            actionType: ActionType.NextPrevFunc,
          },
        ],
      },
    ],
  },
  {
    id: HotkeyHomeIds.HomeWatchingTableModule,
    orderDataType: OrderDataType.Module,
    order: 1,
    sections: [
      {
        id: HotkeyHomeIds.HomeWatchingTable,
        orderDataType: OrderDataType.Section,
        order: 1,
        fields: [],
        keyboard: Shortcutkey.Enter,
        action: () => {
          const ele: any = document.querySelector('.ant-table-row.selected');
          if (ele) {
            ele.click();
          }
        },
      },
      {
        id: HotkeyHomeIds.HomeWatchingFilterTable,
        orderDataType: OrderDataType.Section,
        order: 2,
        module: HotkeyHomeIds.Task,
        fields: [
          {
            id: HotkeyHomeIds.HomeWatchingFilterItem,
            orderDataType: OrderDataType.Field,
            actionType: ActionType.NextPrevFunc,
          },
        ],
      },
    ],
  },
  {
    id: HotkeyHomeIds.HomeWatchingFlow,
    orderDataType: OrderDataType.Module,
    order: 2,
    sections: [
      {
        id: HotkeyHomeIds.HomeWatchingFlowActivityList,
        orderDataType: OrderDataType.Section,
        order: 2,
        module: HotkeyHomeIds.HomeWatchingFlow,
        fields: [
          {
            id: '0',
            orderDataType: OrderDataType.Field,
            order: 1,
            keyboard: Shortcutkey.Enter,
          },
          {
            id: '1',
            orderDataType: OrderDataType.Field,
            order: 2,
            keyboard: Shortcutkey.Enter,
          },
        ],
      },
      {
        id: HotkeyHomeIds.HomeWatchingFlowProcessList,
        orderDataType: OrderDataType.Section,
        order: 1,
        module: HotkeyHomeIds.HomeWatchingFlow,
        fields: [],
      },

      // TODO:搜索功能暂时不做，暂时关闭
      // {
      //   id: HotkeyHomeIds.HomeWatchingFlowAdvancedSearch,
      //   orderDataType: OrderDataType.Section,
      //   order: 3,
      //   module: HotkeyHomeIds.HomeWatchingFlow,
      // },
    ],
  },
  {
    id: HotkeyHomeIds.Sidebar,
    orderDataType: OrderDataType.Module,
    order: 3,
  },
  {
    id: HotkeyHomeIds.SidebarPage,
    orderDataType: OrderDataType.Module,
    order: 4,
  },
  {
    id: HotkeyHomeIds.UserOptions,
    orderDataType: OrderDataType.Module,
    order: 5,
  },

  {
    id: HotkeyHomeIds.ToggleModeButton,
    keyboard: Shortcutkey.ToggleModeButton,
    orderDataType: OrderDataType.Tree,
    actionName: 'navigatorHomeWatching/toggleModeButton',
    children: [
      {
        id: HotkeyHomeIds.FlowMode,
        orderDataType: OrderDataType.Field,
        order: 1,
      },
      {
        id: HotkeyHomeIds.CardMode,
        orderDataType: OrderDataType.Field,
        order: 2,
      },
      {
        id: HotkeyHomeIds.TableMode,
        orderDataType: OrderDataType.Field,
        order: 3,
      },
      {
        id: HotkeyHomeIds.SearchMode,
        orderDataType: OrderDataType.Field,
        order: 4,
      },
    ],
  },
];

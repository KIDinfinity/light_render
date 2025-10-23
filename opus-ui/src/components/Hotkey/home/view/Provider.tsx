/*
 * @Descripttion: 基础组件 - home - 入口
 * @Author: jack_huang
 * @Date: 2019-11-21 17:40:47
 * @LastEditors: jack_huang
 * @LastEditTime: 2019-12-09 18:18:29
 */
import lodash from 'lodash';
import hotkeys from 'hotkeys-js';
import { Component } from 'react';
import { connect } from 'dva';
import configs from '../config';
import keyboardInit from '../../common/keyboard/init';
import keyboardAction from '../action/action';
import actionCallback, { action1 } from '../action/callback';
import OrderDirection from '../enum/orderDirection';
import KeyboardsShortCut from '../enum/shortcutkey';
import { HotkeyHomeIds } from '../../common/enum/hotkeyIds';

interface IComponentProps {
  hotkeysData: any;
  hotkeysConfig: any;
  dynamicMergedConfigs: any;
  dispatch?: any;
}

@connect(({ hotkey, task, workspaceSwitchOn }: any) => ({
  dynamicMergedConfigs: hotkey.dynamicMergedConfigs,
  isBind: hotkey.isBind,
  homeHotKeyIsBind: hotkey.homeHotKeyIsBind,
  totalPage: task.tableList?.pagination.totalPage,
  isSwitchOn: workspaceSwitchOn.isSwitchOn,
}))
class HotkeyProvider extends Component<IComponentProps> {

  // TODO 是否会执行多次，造成按键绑定多次
  componentDidMount = () => {
    const { isBind, homeHotKeyIsBind, dispatch } = this.props;
    this.enable =
      window.location.pathname === '/navigator' || window.location.pathname === '/navigator/';

    if (!isBind) {
      dispatch({
        type: 'hotkey/saveHotkeyBind',
      });
      keyboardInit();

      keyboardAction({
        configs,
        dispatch,
      });
    }
    if (this.enable && !homeHotKeyIsBind) {
      this.bindHotKey();

      dispatch({
        type: 'hotkey/saveHomeHotKeyBind',
        payload: {
          homeHotKeyIsBind: true,
        },
      });
    }
  };

  componentDidUpdate = () => {
    const { homeHotKeyIsBind, dispatch, totalPage,isSwitchOn } = this.props;
    this.enable =
    window.location.pathname === '/navigator' || window.location.pathname === '/navigator/';
    this.totalPage = totalPage;
    this.isSwitchOn=isSwitchOn
    if (!this.enable && homeHotKeyIsBind) {
      this.unBindHotKey();
      dispatch({
        type: 'hotkey/saveHomeHotKeyBind',
        payload: {
          homeHotKeyIsBind: false,
        },
      });
    } else if (this.enable && !homeHotKeyIsBind) {
      this.bindHotKey();
      dispatch({
        type: 'hotkey/saveHomeHotKeyBind',
        payload: {
          homeHotKeyIsBind: true,
        },
      });
    }
  };

  componentWillUnmount = () => {
    const { homeHotKeyIsBind, dispatch } = this.props;

    if (homeHotKeyIsBind) {
      this.unBindHotKey();
      dispatch({
        type: 'hotkey/saveHomeHotKeyBind',
        payload: {
          homeHotKeyIsBind: false,
        },
      });
    }
  };

  bindHotKey = () => {
    const { dispatch } = this.props;

    // TODO:是否可以传个id进来，然后根据具体写逻辑？(通过)
    hotkeys(KeyboardsShortCut.Enter, (event: any) => {
      if (!this.enable) {
        return;
      }

      if(this.isSwitchOn){
        return;
      }

      event.preventDefault();

      const { dynamicMergedConfigs } = this.props;

      actionCallback(
        dynamicMergedConfigs,
        ({ keyboard }: any) => keyboard === KeyboardsShortCut.Enter
      );

      // TODO:这里分类太多,需要优化
      // flow -task
      actionCallback(
        lodash.chain(dynamicMergedConfigs).find(['id', 'task']).get('sections').value(),
        ({ keyboard }: any) => keyboard === KeyboardsShortCut.Enter
      );

      // flow - fields
      action1(
        lodash
          .chain(dynamicMergedConfigs)
          .find(['id', HotkeyHomeIds.HomeWatchingFlow])
          .get('sections')
          .find('active')
          .get('fields')
          .find('active')
          .value(),
        ({ keyboard }: any) => keyboard === KeyboardsShortCut.Enter
      );

      // table - fields
      action1(
        lodash
          .chain(dynamicMergedConfigs)
          .find(['id', HotkeyHomeIds.HomeWatchingTableModule])
          .get('sections')
          .find('active')
          .value(),
        ({ keyboard }: any) => keyboard === KeyboardsShortCut.Enter
      );
      action1(
        lodash
          .chain(dynamicMergedConfigs)
          .find(['id', HotkeyHomeIds.HomeWatchingCardModule])
          .get('sections')
          .find('active')
          .value(),
        ({ keyboard }: any) => keyboard === KeyboardsShortCut.Enter
      );
    });

    hotkeys(KeyboardsShortCut.ModuleNext, (event: any) => {
      if (!this.enable) {
        return;
      }

      event.preventDefault();

      dispatch({
        type: 'hotkey/homeModuleOrder',
        payload: {
          order: OrderDirection.Next,
        },
      });
    });

    hotkeys(KeyboardsShortCut.ModulePrev, (event: any) => {
      if (!this.enable) {
        return;
      }

      event.preventDefault();

      dispatch({
        type: 'hotkey/homeModuleOrder',
        payload: {
          order: OrderDirection.Prev,
        },
      });
    });

    hotkeys(KeyboardsShortCut.SectionNext, (event: any) => {
      if (!this.enable) {
        return;
      }

      event.preventDefault();

      dispatch({
        type: 'hotkey/homeSectionOrder',
        payload: {
          order: OrderDirection.Next,
        },
      });
    });

    hotkeys(KeyboardsShortCut.SectionPrev, (event: any) => {
      if (!this.enable) {
        return;
      }

      event.preventDefault();

      dispatch({
        type: 'hotkey/homeSectionOrder',
        payload: {
          order: OrderDirection.Prev,
        },
      });
    });

    hotkeys(KeyboardsShortCut.FieldNext, (event: any) => {
      if (!this.enable) {
        return;
      }

      if(this.isSwitchOn){
        return;
      }

      event.preventDefault();
      // const { dynamicMergedConfigs } = this.props;
      // console.log(dynamicMergedConfigs);

      dispatch({
        type: 'hotkey/homeFieldOrder',
        payload: {
          order: OrderDirection.Next,
        },
      });
    });

    hotkeys(KeyboardsShortCut.FieldPrev, (event: any) => {
      if (!this.enable) {
        return;
      }

      if(this.isSwitchOn){
        return;
      }

      event.preventDefault();

      dispatch({
        type: 'hotkey/homeFieldOrder',
        payload: {
          order: OrderDirection.Prev,
        },
      });
    });

    hotkeys(KeyboardsShortCut.TablePageNext, (event: any) => {
      if (!this.enable) {
        return;
      }

      if(this.isSwitchOn){
        return;
      }

      event.preventDefault();

      dispatch({
        type: 'advancedQueryController/saveStateOfSearchPagination',
        payload: {
          direction: OrderDirection.Next,
          totalPage: this.totalPage,
        },
      });
    });
    hotkeys(KeyboardsShortCut.TablePagePrev, (event: any) => {
      if (!this.enable) {
        return;
      }

      if(this.isSwitchOn){
        return;
      }

      event.preventDefault();

      dispatch({
        type: 'advancedQueryController/saveStateOfSearchPagination',
        payload: {
          direction: OrderDirection.Prev,
          totalPage: this.totalPage,
        },
      });
    });
  };

  unBindHotKey = () => {
    hotkeys.unbind(KeyboardsShortCut.Enter);
    hotkeys.unbind(KeyboardsShortCut.ModuleNext);
    hotkeys.unbind(KeyboardsShortCut.ModulePrev);
    hotkeys.unbind(KeyboardsShortCut.SectionNext);
    hotkeys.unbind(KeyboardsShortCut.SectionPrev);
    hotkeys.unbind(KeyboardsShortCut.FieldNext);
    hotkeys.unbind(KeyboardsShortCut.FieldPrev);
    hotkeys.unbind(KeyboardsShortCut.TablePageNext);
    hotkeys.unbind(KeyboardsShortCut.TablePagePrev);
  };

  render() {
    const { children } = this.props;

    return children;
  }
}

export default HotkeyProvider;

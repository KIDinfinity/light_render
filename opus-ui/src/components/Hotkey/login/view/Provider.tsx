import { Component } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import hotkeys from 'hotkeys-js';
import KeyboardsShortCut from '../enum/shortcutkey';
import orderDirection from '../../common/enum/orderDirection';
// 枚举 - 唯一id
import { HotkeyLoginIds } from '../../common/enum/hotkeyIds';

interface IComponentProps {
  loginList: any;
  dispatch: any;
}

@connect(({ hotkey }: any) => ({
  loginList: hotkey.loginList,
}))
class HotkeyProvider extends Component<IComponentProps> {
  componentDidMount = () => {
    const { dispatch } = this.props;
    window.addEventListener('keydown', this.tabEvent);
    this.bindHotKey();
    // 默认选中
    setTimeout(() => {
      dispatch({
        type: 'hotkey/loginFieldOrder',
        payload: {
          order: orderDirection.Next,
        },
      });
    }, 500);
  };

  componentWillUnmount = () => {
    this.unbindHotKey();
    window.removeEventListener('keydown', this.tabEvent);
  };

  // tab 切换事件
  tabEvent = (e: any) => {
    if (e.code === 'Tab') {
      const { dispatch } = this.props;
      e.preventDefault();
      dispatch({
        type: 'hotkey/loginFieldOrder',
        payload: {
          order: orderDirection.Next,
        },
      });
    }
  };

  bindHotKey = () => {
    // 回车
    hotkeys(KeyboardsShortCut.Enter, (event: any) => {
      event.preventDefault();

      const { loginList } = this.props;
      const config1 = lodash.find(loginList, (item) => item.id === HotkeyLoginIds.loginSubmit);

      if (config1 && lodash.isFunction(config1.action)) {
        config1.action();
      }
    });
  };

  unbindHotKey = () => {
    hotkeys.unbind(KeyboardsShortCut.Tab);
    hotkeys.unbind(KeyboardsShortCut.Enter);
  };

  render() {
    const { children } = this.props;

    return children;
  }
}

export default HotkeyProvider;

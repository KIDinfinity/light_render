import React, { Component } from 'react';
import { connect } from 'dva';
import Focus from '../../common/view/Focus';

interface IComponentProps {
  id: string | string[];
  dispatch?: any;
  block?: any;
  action?: any;
  next?: any;
  prev?: any;
  dynamicMergedConfigs?: any;
  className?: string;
}

@connect()
class Hotkey extends Component<IComponentProps> {
  addHotkey = async () => {
    const { dispatch, children, ...restProps } = this.props;
    const { id } = restProps;
    let newId = id;
    if (typeof id === 'string') {
      newId = [id];
    }
    await dispatch({
      type: 'hotkey/homeAddKey',
      payload: {
        ...restProps,
        id: newId,
      },
    });
    newId.forEach(async (item) => {
      // TODO:这里只是home的操作,需要移到home模块
      if (
        item === 'HomeWatchingFlowActivityList' ||
        item === 'HomeWatchingTableModule' ||
        item === 'HomeWatchingCard'
      ) {
        await dispatch({
          type: 'hotkeyGlobal/defaultHome',
          payload: {
            id: item,
          },
        });
      }
    });
  };

  UNSAFE_componentWillMount = () => {
    const { id } = this.props;
    if (!id) return;
    // this.addHotkey();
  };

  componentWillUnmount = async () => {
    const { dispatch, id } = this.props;
    if (!id) return;
    let newId = id;
    if (typeof id === 'string') {
      newId = [id];
    }
    await dispatch({
      type: 'hotkey/homeRemoveHotkey',
      payload: {
        id: newId,
      },
    });
  };

  render() {
    const { children, id, block, className } = this.props;
    return (
      <Focus id={id} block={block} className={className}>
        {children}
      </Focus>
    );
  }
}

export default Hotkey;

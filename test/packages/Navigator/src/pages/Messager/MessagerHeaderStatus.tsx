import React, { Component } from 'react';
import { Spin, Icon } from 'antd';
import { connect } from 'dva';
import lodash from 'lodash';
import MCSubscribeUserState from '@mc/MCSubscribe/MCSubscribeUserState.tsx';
import userStatusBadge from './components/UserStatusBadge';
import { getText } from './userState';
import styles from './MessagerHeaderStatus.less';

@connect(({ user, chatController, loading, userContactController }) => ({
  currentUserId: user?.currentUser?.userId,
  chatStatus: chatController.chatStatus,
  loadingOfChangeChatStatus: loading.effects['chatController/changeChatStatus'],
  contactsList: userContactController?.contactList,
}))
class MessagerHeaderStatus extends Component {
  state = {
    autoSwitch: true,
  };

  componentDidMount() {
    this.autoSwitchAwayMark();
  }

  componentWillUnmount() {
    this.autoSwitchAwayMarkClear();
  }

  autoSwitchAwayMark = () => {
    document.documentElement.addEventListener('keydown', lodash.debounce(this.resetTimeout, 30));
    document.documentElement.addEventListener('mousedown', lodash.debounce(this.resetTimeout, 30));
    document.documentElement.addEventListener('mousemove', lodash.debounce(this.resetTimeout, 30));
    this.resetTimeout();
  };

  autoSwitchAwayMarkClear = () => {
    this.clearTimeout();
    document.documentElement.removeEventListener('keydown', this.resetTimeout);
    document.documentElement.removeEventListener('mousedown', this.resetTimeout);
    document.documentElement.removeEventListener('mousemove', this.resetTimeout);
  };

  resetTimeout = (e?: { target: { parentNode: any } }) => {
    let outside = null;
    if (e) {
      // e.stopPropagation();
      const parent = e?.target?.parentNode;
      outside =
        parent?.className?.indexOf?.('chat_status_2') < 0 && parent?.dataset?.chatstatus !== '3';
    }
    const { autoSwitch } = this.state;
    if (!autoSwitch) return;
    const { chatStatus } = this.props;

    this.clearTimeout();

    if (chatStatus === 3 && outside) {
      this.autoChangeStatus(2);
    }
    // console.log(new Date().toString(),'---开始计时---');
    this.timeStickStatus = setTimeout(() => {
      this.autoChangeStatus(3);
      // console.log(new Date().toString(),'---完成切换---');
    }, 5 * 60 * 1000);
  };

  clearTimeout = () => {
    if (this.timeStickStatus) {
      clearTimeout(this.timeStickStatus);
    }
  };

  autoChangeStatus = (status: number) => {
    this.setState({ autoSwitch: true }, () => {
      this.changeStatus(status);
    });
  };

  /**
   * @description: 用于改变用户状态 现在不能够主动更改
   * @param {*}
   * @return {*}
   */
  /*
  handleChangeStatus = (status, e) => {
    e.stopPropagation();
    const promise = new Promise((resolve, reject) => {
      try {
        if (status === 2 || status === 3) {
          this.setState({ show: false, autoSwitch: false }, () => {
            this.autoSwitchAwayMarkClear();
            resolve(true);
          });
        } else if (status === 1) {
          this.setState({ show: false, autoSwitch: true }, () => {
            this.autoSwitchAwayMark();
            resolve(true);
          });
        } else {
          resolve(true);
        }
      } catch (ex) {
        reject(ex);
      }
    });
    promise.then((data) => {
      if (data) this.changeStatus(status);
    });
  }; */

  changeStatus = (status) => {
    const { dispatch, contactsList, currentUserId }: any = this.props;
    dispatch({
      type: 'userContactController/changeContactListByUserId',
      payload: {
        status,
        contactsList,
        userId: currentUserId,
      },
    });

    dispatch({
      type: 'chatController/changeChatStatus',
      payload: {
        status,
      },
    });
  };

  render() {
    const { loadingOfChangeChatStatus, chatStatus }: any = this.props;

    return (
      <div className={styles.headerStatus}>
        <MCSubscribeUserState />
        <div className={styles.text}>
          {loadingOfChangeChatStatus ? (
            <Spin size="small" indicator={<Icon type="loading" style={{ fontSize: 12 }} spin />} />
          ) : (
            <div>{userStatusBadge(chatStatus, getText(chatStatus))}</div>
          )}
        </div>
      </div>
    );
  }
}

export default MessagerHeaderStatus;

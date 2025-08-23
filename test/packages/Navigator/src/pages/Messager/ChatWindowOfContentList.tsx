import React, { Component } from 'react';
import { connect } from 'dva';
import { Spin, Dropdown } from 'antd';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import messageUtils from '@/utils/message';
import ChatWindowOfContentListItem from './ChatWindowOfContentListItem';
import styles from './ChatWindowOfContentList.less';

@connect(({ user, chatController, loading }: any) => ({
  currentUseId: user.currentUser?.userId,
  currentChatInfo: chatController.currentChatInfo,
  currentChatMessages: messageUtils.setShowTimeToMessage(chatController.currentChatMessages),
  loadingOfChat:
    loading.effects['chatController/getBySessionId'] ||
    loading.effects['chatController/getBySessionIdHistory'],
  showContextMenu: chatController.showContextMenu,
}))
class ChatWindowOfContentList extends Component<any> {
  componentDidMount = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'chatController/getBySessionId',
      payload: {
        reverse: true,
      },
    });
  };

  // 点击多选
  handleShowMultiselect = () => {
    const { dispatch } = this.props;

    dispatch({
      type: 'chatController/changeShowMultiSelect',
      payload: {
        showMultiSelect: true,
      },
    });
  };

  render() {
    const { currentChatInfo, currentChatMessages, currentUseId, loadingOfChat } = this.props;

    return (
      <Dropdown
        overlay={
          <div className={styles.contextMenu} onClick={() => this.handleShowMultiselect()}>
            {formatMessageApi({
              Label_COM_WarningMessage: 'app.navigator.drawer.messager.contact.multiselect',
            })}
          </div>
        }
        trigger={['contextMenu']}
      >
        <div className={styles.contentList}>
          {loadingOfChat && (
            <div className={styles.loading}>
              <Spin size="small" />
            </div>
          )}
          {lodash.map(currentChatMessages, (item: any, i: number) => {
            const img =
              item?.srcId === currentUseId
                ? currentChatInfo?.srcAvatar
                : currentChatInfo?.destAvatar;

            return <ChatWindowOfContentListItem key={i.toString()} item={item} img={img} />;
          })}
        </div>
      </Dropdown>
    );
  }
}

export default ChatWindowOfContentList;

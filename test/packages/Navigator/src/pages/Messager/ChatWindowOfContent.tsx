import React, { Component } from 'react';
import { connect } from 'dva';
import { Icon, Badge, Popover } from 'antd';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import messageUtils from '@/utils/message';
import { ReactComponent as archiveIcon } from 'navigator/assets/archive.svg';
import { getAuth } from '@/auth/Utils';
import ChatWindowOfContentList from './ChatWindowOfContentList';
import ChatWindowOfSendButton from './ChatWindowOfSendButton';
import { getStatus } from './userState';
import styles from './ChatWindowOfContent.less';

class ChatWindowOfContent extends Component<any> {
  scroller: any;

  componentDidMount = async () => {
    const { dispatch } = this.props;

    await dispatch({
      type: 'chatController/chatContentInit',
    });
    dispatch({
      type: 'chatController/cleanUnread',
    });
  };

  componentDidUpdate() {
    this.scrollToEnd();
  }

  componentWillUnmount = async () => {
    const { dispatch } = this.props;

    await dispatch({
      type: 'chatController/clearChatWindow',
    });

    dispatch({
      type: 'chatController/changeShowMultiSelect',
      payload: {
        showMultiSelect: false,
      },
    });

    // dispatch({
    //   type: 'converseController/conversationList',
    // });
  };

  handleHideWindow = () => {
    const { dispatch } = this.props;

    dispatch({
      type: 'chatController/closeChatWindowAndCleanUnRead',
    });

    dispatch({
      type: 'chatController/changeSearchVisibleReducer',
      payload: {
        showSearchVisible: true,
      },
    });
  };

  scrollToEnd = () => {
    const { currentChatMessagesIsUpdateNew } = this.props;
    if (!this.scroller || !currentChatMessagesIsUpdateNew) {
      return;
    }

    const { scrollHeight, clientHeight } = this.scroller;
    this.scroller.scrollTop = scrollHeight - clientHeight;
  };

  handleScroll = (e: any) => {
    const { currentChatMessagesPagination, dispatch } = this.props;
    const scoller = e?.target;

    if (!scoller) {
      return;
    }

    if (
      currentChatMessagesPagination &&
      scoller.scrollTop === 0 &&
      scoller.scrollHeight > scoller.clientHeight
    ) {
      const { total, pageSize, currentPage } = currentChatMessagesPagination;

      if (total > pageSize * currentPage) {
        const debounced = lodash.debounce(async () => {
          await dispatch({
            type: 'chatController/getBySessionIdHistory',
          });
        }, 200);

        debounced();
      } else {
        scoller.scrollTop = 0;
      }
    }
  };

  // 点击icon后跳转到备注管理
  handleSaveMultiselect = () => {
    const { dispatch } = this.props;

    // 多选去掉
    dispatch({
      type: 'chatController/saveArchiveList',
    });
    dispatch({
      type: 'chatController/sendArchiveList',
    });
    dispatch({
      type: 'navigatorInformationController/setIsActivedGroup',
      payload: {
        isSelectedCategory: true,
      },
    });
  };

  handleClearMultiselectList = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'chatController/clearMultiSelectList',
    });
  };

  infomationPermission() {
    const { commonAuthorityList } = this.props;
    const auth = getAuth(commonAuthorityList, {
      authorityCode: 'informationManagement',
    });
    return auth;
  }

  render() {
    const { currentChatInfo, isShowArchive, showMultiSelect } = this.props;
    return (
      <div className={styles.wrap}>
        <div className={styles.title}>
          {!showMultiSelect && <Icon type="left" onClick={() => this.handleHideWindow()} />}
          <div className={styles.titleText}>
            <Badge
              // @ts-ignore
              status={getStatus(currentChatInfo?.ustate)}
            />
            {currentChatInfo?.title}
          </div>
          {showMultiSelect && (
            <div className={styles.titlebutton}>
              {this.infomationPermission() ? (
                <Popover
                  content={
                    <span>
                      {formatMessageApi({
                        Label_COM_WarningMessage: 'app.navigator.drawer.messager.pop.title.archive',
                      })}
                    </span>
                  }
                  placement="top"
                  overlayClassName={styles.popoverButton}
                >
                  {isShowArchive ? (
                    <Icon
                      component={archiveIcon}
                      className="archive-svg-active"
                      onClick={() => this.handleSaveMultiselect()}
                    />
                  ) : (
                    <Icon component={archiveIcon} className="archive-svg" />
                  )}
                </Popover>
              ) : null}
              <Icon type="close-circle" onClick={() => this.handleClearMultiselectList()} />
            </div>
          )}
        </div>
        <div
          className={`${styles.content} ${styles['black-scroll']} ${styles['black-scroll-small']}`}
          onScroll={this.handleScroll}
          ref={(inst) => {
            this.scroller = inst;
          }}
        >
          <div className={styles.message}>
            <ChatWindowOfContentList />
          </div>
        </div>
        {!showMultiSelect && <ChatWindowOfSendButton />}
      </div>
    );
  }
}

export default connect(({ user, chatController, authController }: any) => ({
  user,
  chatController,
  sessionId: chatController.sessionId,
  currentChatInfo: chatController.currentChatInfo,
  currentChatInfoSessionPeer: chatController.currentChatInfo.sessionPeer,
  currentChatMessages: messageUtils.setShowTimeToMessage(chatController.currentChatMessages),
  currentChatMessagesPagination: chatController.currentChatMessagesPagination,
  currentChatMessagesIsUpdateNew: chatController.currentChatMessagesIsUpdateNew,
  isShowArchive: chatController.isShowArchive,
  showMultiSelect: chatController.showMultiSelect,
  commonAuthorityList: authController.commonAuthorityList,
}))(ChatWindowOfContent);

import React, { PureComponent } from 'react';
import { connect } from 'dva';
import QueueAnim from 'rc-queue-anim';
import Contact from './SearchContact';
import ChatHist from './SearchChatHist';
import ChatHistList from './SearchChatHistList';
import ChatSingleHistList from './SearchChatSingleHistList';
import ChatWindow from './ChatWindow';
import styles from './SearchFrame.less';

@connect(({ chatController }) => ({
  chatController,
}))
class SearchContent extends PureComponent {
  handleShowComp = ({
    isShowContact,
    isShowChatHist,
    isShowChatHistList,
    isShowChatSingleHistList,
    isShowHistMore,
    goFirst,
    params,
    showListNum,
    goBackHist,
  }) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'chatController/changeSearchShowComp',
      payload: {
        isShowContact,
        isShowChatHist,
        isShowChatHistList,
        isShowChatSingleHistList,
        isShowHistMore,
        goFirst,
        params,
        showListNum,
        goBackHist,
      },
    });
  };

  handleClick = (item) => {
    const { dispatch, userInfo } = this.props;

    dispatch({
      type: 'chatController/openChatWindow',
      payload: {
        sessionId: `${userInfo.userId}@${item.userId}`,
      },
    });

    dispatch({
      type: 'chatController/save',
      payload: {
        showSeachBox: false,
        chatWindowVisible: true,
        keyword: '',
      },
    });
  };

  render() {
    const {
      data,
      contactFilterData,
      userInfo,
      chatController,
      chatController: { searchShowComp },
    } = this.props;
    const {
      isShowContact,
      isShowChatHist,
      isShowChatHistList,
      isShowChatSingleHistList,
      isShowHistMore,
      goFirst,
      params,
      showListNum,
      goBackHist,
    } = searchShowComp;

    return (
      <div>
        {chatController?.showSeachBox ? (
          <div className={styles.searchBody}>
            {/* 全部联系人列表 */}
            {isShowContact ? (
              <Contact
                isShowContact={isShowContact}
                contactFilterData={contactFilterData}
                keyword={chatController?.keyword}
                list={data?.userContactsList}
                handleShowComp={this.handleShowComp}
                userInfo={userInfo}
                onClick={this.handleClick}
              />
            ) : (
              ''
            )}

            {/* 全部历史列表 */}
            {isShowChatHist ? (
              <ChatHist
                isShowChatHist={isShowChatHist}
                keyword={chatController?.keyword}
                handleShowComp={this.handleShowComp}
                list={data?.chatMessageList}
                userInfo={userInfo}
                isShowHistMore={isShowHistMore}
                goFirst={goFirst}
                showListNum={showListNum}
                goBackHist={goBackHist}
              />
            ) : (
              ''
            )}

            {/* 多人历史列表 */}
            {isShowChatHistList ? (
              <ChatHistList
                isShowChatHistList={isShowChatHistList}
                keyword={chatController?.keyword}
                handleShowComp={this.handleShowComp}
                userInfo={userInfo}
                params={params}
                showListNum={showListNum}
                goFirst={goFirst}
                goBackHist={goBackHist}
              />
            ) : (
              ''
            )}

            {/* 单人历史列表 */}
            {isShowChatSingleHistList ? (
              <ChatSingleHistList
                isShowChatSingleHistList={isShowChatSingleHistList}
                keyword={chatController?.keyword}
                handleShowComp={this.handleShowComp}
                params={params}
                isShowHistMore={isShowHistMore}
                showListNum={showListNum}
                goFirst={goFirst}
                goBackHist={goBackHist}
              />
            ) : (
              ''
            )}
          </div>
        ) : (
          <div>
            {chatController?.chatWindowVisible ? (
              <QueueAnim>
                <ChatWindow currentChat={chatController?.currentChat} />
              </QueueAnim>
            ) : (
              ''
            )}
          </div>
        )}
      </div>
    );
  }
}

export default SearchContent;

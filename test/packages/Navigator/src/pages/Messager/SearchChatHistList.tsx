import React, { Component } from 'react';
import { connect } from 'dva';
import InfiniteScroll from 'react-infinite-scroller';
import { Divider, Avatar, List, Button, Spin } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import userDefaultIcon from 'navigator/assets/user-default.svg';
import CommonEmpty from '@/components/Empty';
import timeUtils from '@/utils/time';
import styles from './SearchChatHistList.less';

class ChatHistList extends Component<any> {
  state = {
    loading: true,
    hasMore: true,
    listData: [],
    pagination: {} as any,
  };

  componentDidMount = () => {
    this.fetchData(1);
  };

  fetchData = async (page: any) => {
    const {
      params,
      dispatch,
      chatController: { keyword: content },
    } = this.props;
    const { listData } = this.state;
    await dispatch({
      type: 'chatController/getBySessionId',
      payload: {
        currentPage: page,
        pageSize: 20,
        params,
        content,
      },
    });

    const { chatController } = this.props;

    dispatch({
      type: 'chatController/save',
      payload: {
        histList: {
          listData: chatController.currentChatMessages,
          pagination: chatController.currentChatMessagesPagination,
        },
      },
    });

    this.setState({
      listData: listData.concat(chatController.currentChatMessages),
      pagination: chatController?.currentChatMessagesPagination,
      loading: false,
    });
  };

  handleInfiniteOnLoad = async () => {
    const { listData, pagination } = this.state;
    this.setState({
      loading: true,
    });
    if (listData.length >= pagination?.total) {
      this.setState({
        hasMore: false,
        loading: false,
      });

      return;
    }

    await this.fetchData(pagination.currentPage + 1);
  };

  handleSingleItemClick = (item: any) => {
    const { handleShowComp, userInfo, keyword } = this.props;
    const destId = item?.userId || item?.destId;

    handleShowComp({
      isShowContact: false,
      isShowChatHist: false,
      isShowChatSingleHistList: true,
      params: {
        sessionId: `${userInfo.userId}@${destId}`,
        time: item?.chatMsg?.time || item?.time,
        content: keyword,
      },
    });
  };

  handleBack = () => {
    const { handleShowComp, goFirst } = this.props;
    handleShowComp({
      isShowContact: goFirst || false,
      isShowChatHist: goFirst || true,
      isShowChatHistList: false,
      isShowHistMore: goFirst,
      goBackHist: true,
    });
  };

  render() {
    const { hasMore, loading, listData } = this.state;

    return (
      <div className={styles.histList}>
        <Divider className={styles.dividerStyle} orientation="left">
          {formatMessageApi({
            Label_COM_WarningMessage: 'app.navigator.drawer.messager.search.chat-history',
          })}
        </Divider>

        {listData?.length > 0 ? (
          <div className={styles.infiniteScrollWrapper}>
            <InfiniteScroll
              initialLoad={false}
              pageStart={0}
              loadMore={this.handleInfiniteOnLoad}
              hasMore={!loading && hasMore}
              useWindow={false}
            >
              <List
                className={styles.antList}
                itemLayout="horizontal"
                dataSource={listData}
                renderItem={(item: any) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src={item?.avatar ? item?.avatar : userDefaultIcon} />}
                      title={
                        <div>
                          <span>{item?.destName}</span>
                          <span style={{ float: 'right' }}>{timeUtils.calendar(item?.time)}</span>
                        </div>
                      }
                      description={
                        <div>
                          <span className={styles.talkContent}>{item?.content}</span>
                        </div>
                      }
                    />
                  </List.Item>
                )}
              >
                {loading && hasMore && (
                  <div className={styles.loadingWrapper} key={1}>
                    <Spin />
                  </div>
                )}
              </List>
            </InfiniteScroll>
          </div>
        ) : (
          <CommonEmpty />
        )}
        <div className={styles.btnStyle}>
          <Button className={styles.backStyle} onClick={this.handleBack}>
            BACK
          </Button>
        </div>
      </div>
    );
  }
}

export default connect(({ converseController, chatController, loading }: any) => ({
  converseController,
  chatController,
  loading,
}))(ChatHistList);

import React, { Component } from 'react';
import { connect } from 'dva';
import { Spin } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import List from './List';
import styles from './Scroller.less';

class Scroller extends Component<any> {
  scroller: any;

  handleInfiniteOnLoad = async () => {
    const { dispatch, messageList } = this.props;
    await dispatch({
      type: 'smartCircleNotification/messageList',
      payload: {
        currentPage: messageList.currentPage + 1,
      },
    });
  };

  componentDidMount = () => {
    const { dispatch } = this.props;
    dispatch({ type: 'smartCircleNotification/saveScroll', payload: { scroll: this.scroller } });
  };

  render() {
    const { loadingEffectOfMessageList, messageList } = this.props;
    const currentCount =
      (messageList.currentPage - 1) * messageList.pageSize + messageList.rows?.length;
    const hasMore = currentCount < messageList.total;

    return (
      <div className={styles['infinite-container']}>
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={this.handleInfiniteOnLoad}
          hasMore={!loadingEffectOfMessageList && hasMore}
          useWindow={false}
        >
          <div
            className={styles.message}
            ref={(int) => {
              this.scroller = int;
            }}
          >
            <List />
          </div>

          {loadingEffectOfMessageList && hasMore && (
            <div className={styles.loadingContainer}>
              <Spin />
            </div>
          )}
        </InfiniteScroll>
      </div>
    );
  }
}

export default connect(({ smartCircleNotification, loading }: any) => ({
  messageList: smartCircleNotification.messageList,
  isBackToTop: smartCircleNotification.isBackToTop,
  loadingEffectOfMessageList: loading.effects['smartCircleNotification/messageList'],
}))(Scroller);

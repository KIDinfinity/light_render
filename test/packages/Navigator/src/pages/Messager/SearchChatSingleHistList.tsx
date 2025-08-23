import React, { Component } from 'react';
import { connect } from 'dva';
import InfiniteScroll from 'react-infinite-scroller';
import { Divider, Avatar, List, Button, Spin, notification } from 'antd';
import userDefaultIcon from 'navigator/assets/user-default.svg';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './SearchChatSingleHistList.less';

class ChatSingleHistSingleList extends Component<any> {
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
    const { params, dispatch } = this.props;
    const { listData } = this.state;

    await dispatch({
      type: 'chatController/getBySessionId',
      payload: {
        currentPage: page,
        pageSize: 10,
        params,
      },
    });

    const { chatController } = this.props;

    this.setState({
      listData: listData.concat(chatController.currentChatMessages),
      pagination: chatController.currentChatMessagesPagination,
      loading: false,
    });
  };

  handleInfiniteOnLoad = async () => {
    const { listData, pagination } = this.state;
    this.setState({
      loading: true,
    });

    if (listData.length >= pagination?.total) {
      notification.warning({
        message: formatMessageApi({
          Label_BIZ_Claim: 'component.noticeIcon.end',
        }),
      });
      this.setState({
        hasMore: false,
        loading: false,
      });

      return;
    }

    await this.fetchData(pagination.page + 1);
  };

  handleBack = () => {
    const { handleShowComp, goFirst, isShowHistMore } = this.props;
    handleShowComp({
      isShowContact: goFirst,
      isShowChatHist: !isShowHistMore,
      isShowChatHistSingleList: false,
      isShowChatSingleHistSingleList: false,
      isShowHistMore: goFirst,
      goFirst,
      goBackHist: true,
    });
  };

  // todo 关键字高亮
  // formatString = content => {
  //   const { keyword } = this.props;
  //   // const str = content.indexOf(keyword);
  //   // const result = content.substr(str + 1, str.length);
  //   // console.log(result)
  // const re = new RegExp(keyword, 'g');
  //   // let text = ''
  //   // if (re.test(content)) {
  //   //   text = content.replace(re, `<span style='color: #f90'>${keyword}</span>`);
  //   // }
  //   // console.log(re);
  // };

  render() {
    const { hasMore, loading, listData } = this.state;

    return (
      <div className={styles.singleHistList}>
        <Divider className={styles.dividerStyle} orientation="left">
          {formatMessageApi({
            Label_COM_WarningMessage: 'app.navigator.drawer.messager.search.chat-history',
          })}
        </Divider>
        {/* <InfiniteScrollWrapper> */}
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
                    title={item?.srcName}
                    description={item?.content}
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
        <div style={{ textAlign: 'center', paddingBottom: '20px' }}>
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
}))(ChatSingleHistSingleList);

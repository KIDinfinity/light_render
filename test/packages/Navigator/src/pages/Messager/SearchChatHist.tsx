import React, { PureComponent } from 'react';
import { Avatar, Divider, List, Button, Spin } from 'antd';
import classNames from 'classnames';
import lodash from 'lodash';
import { connect } from 'dva';
import InfiniteScroll from 'react-infinite-scroller';
import CommonEmpty from '@/components/Empty';
import userDefaultIcon from 'navigator/assets/user-default.svg';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './SearchChatHist.less';

class ChatHist extends PureComponent<any> {
  state = {
    loading: false,
    hasMore: true,
    pagination: {} as any,
    listData: [],
  };

  componentDidMount = () => {
    const { chatController, goBackHist } = this.props;
    // 其他页面返回来时，数据为空则初始化数据
    if (goBackHist) {
      this.setState({
        listData: chatController?.hist?.listData,
        pagination: chatController?.hist?.pagination,
      });
    }
  };

  handleClickMore = () => {
    const { handleShowComp } = this.props;
    handleShowComp({
      isShowContact: false,
      isShowChatHist: true,
      isShowHistMore: false,
      goFirst: true,
    });
    this.fetchData(1);
  };

  fetchData = async (page: any) => {
    const { keyword, dispatch, userInfo } = this.props;
    const { listData } = this.state;

    this.setState({
      loading: true,
    });

    await dispatch({
      type: 'chatController/getByMsgCount',
      payload: {
        currentPage: page,
        pageSize: 10,
        params: { kw: keyword, creator: `${userInfo?.userId}` },
      },
    });

    const { chatController } = this.props;
    const chatListData = page === 1 ? [] : chatController?.hist.listData;
    dispatch({
      type: 'chatController/save',
      payload: {
        hist: {
          listData: chatListData.concat(chatController?.getByMsgCount?.list) || [],
          pagination: chatController?.getByMsgCount?.pagination,
        },
      },
    });

    this.setState({
      listData: listData.concat(chatController?.getByMsgCount?.list),
      pagination: chatController?.getByMsgCount?.pagination,
      loading: false,
    });
  };

  handleInfiniteOnLoad = async () => {
    const { isShowHistMore, chatController, dispatch } = this.props;
    const { pagination } = this.state;

    // 在高级查询有more的不要滚动加载
    if (isShowHistMore) return;

    // 预防从其他页面返回来时，触发滚动事件，或参数未空而报错
    if (pagination.length === 0) {
      if (!chatController?.getByMsgCount?.hist?.hasMore) return;

      dispatch({
        type: 'chatController/save',
        payload: {
          hist: {
            listData: chatController?.getByMsgCount?.list,
            pagination: chatController?.getByMsgCount?.pagination,
            hasMore: false,
          },
        },
      });
    }
    this.setState({
      pagination: chatController?.getByMsgCount?.pagination,
    });
    if (pagination?.page * pagination?.pageSize >= pagination?.total) {
      this.setState({
        hasMore: false,
        loading: false,
      });

      return;
    }

    await this.fetchData(pagination.page + 1);
  };

  handleBack = () => {
    const { handleShowComp } = this.props;
    handleShowComp({
      isShowContact: true,
      isShowChatHist: true,
      isShowHistMore: true,
    });
    this.setState({
      listData: [],
      loading: false,
      hasMore: true,
      pagination: {},
    });
  };

  handleSingleItemClick = (item: any) => {
    const { dispatch, handleShowComp, isShowHistMore } = this.props;
    dispatch({
      type: 'chatController/saveSessionId',
      payload: {
        sessionId: item.sessionId,
      },
    });

    handleShowComp({
      isShowContact: false,
      isShowChatHist: false,
      isShowChatHistList: false,
      isShowChatSingleHistList: true,
      isShowHistMore: false,
      goFirst: isShowHistMore,
      params: { sessionId: item.sessionId, time: item?.chatMsg?.time || item?.time },
      goBackHist: true,
    });
  };

  handleItemClick = (item: any) => {
    const { dispatch, handleShowComp, isShowHistMore, keyword } = this.props;
    dispatch({
      type: 'chatController/saveSessionId',
      payload: {
        sessionId: item?.sessionId,
      },
    });

    handleShowComp({
      isShowContact: false,
      isShowChatHist: false,
      isShowChatHistList: true,

      isShowChatSingleHistList: false,
      isShowHistMore: false,
      goFirst: isShowHistMore,
      params: { sessionId: item?.sessionId, content: keyword },
      goBackHist: true,
    });
  };

  renderHighLight = (item: any, keyword: any) => {
    const reg = new RegExp(keyword, 'gi');
    const match = item.chatMsg.content.match(reg);

    return lodash.map(item?.chatMsg?.content?.split(keyword), (v: any, vIndex: any, vArr: any) => {
      if (vIndex < vArr.length - 1) {
        const key = `item${vIndex}`;

        return (
          <span key={key}>
            {v}
            <span style={{ color: '#e97b1d' }}>{match[vIndex]}</span>
          </span>
        );
      }

      return v;
    });
  };

  render() {
    const {
      list,
      isShowHistMore,
      chatController: { keyword },
    } = this.props;
    const { hasMore, loading, listData } = this.state;
    const len = list?.length;
    return (
      <div className={styles.hist}>
        <Divider orientation="left" className={styles.divider}>
          {formatMessageApi({
            Label_COM_WarningMessage: 'app.navigator.drawer.messager.search.chat-history',
          })}
        </Divider>

        {len > 0 || listData?.length > 0 ? (
          <div
            className={classNames(
              styles.infiniteScrollWrapper,
              isShowHistMore && styles.showHistMore
            )}
          >
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
                dataSource={isShowHistMore ? list?.slice(0, 3) : listData}
                renderItem={(item: any) => (
                  <div>
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar src={item?.avatar ? item?.avatar : userDefaultIcon} />}
                        title={item?.sessionName}
                        description={
                          <div>
                            {item?.related !== 1 ? (
                              <span
                                // style={{ cursor: isShowHistMore ? 'pointer' : 'default' }}
                                style={{ cursor: 'pointer' }}
                                onClick={() => this.handleItemClick(item)}
                              >
                                <i
                                  style={{
                                    color: '#666',
                                    paddingRight: '5px',
                                    fontStyle: 'normal',
                                  }}
                                >
                                  {item?.related}
                                </i>
                                Related Messages
                              </span>
                            ) : (
                              <span className="descriptionLine">
                                {this.renderHighLight(item, keyword)}
                              </span>
                            )}
                          </div>
                        }
                      />
                    </List.Item>
                  </div>
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

        {!isShowHistMore ? (
          <div style={{ textAlign: 'center', paddingTop: '20px' }}>
            {/* <StyledBack onClick={this.handleBack}>BACK</StyledBack> */}
            <Button onClick={this.handleBack}>BACK</Button>
          </div>
        ) : (
          ''
        )}

        {len > 3 && isShowHistMore ? (
          <div className={styles.more}>
            <a onClick={this.handleClickMore}>MORE&raquo;</a>
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }
}
export default connect(({ chatController, advancedQueryController, loading }: any) => ({
  chatController,
  advancedQueryController,
  loading,
}))(ChatHist);

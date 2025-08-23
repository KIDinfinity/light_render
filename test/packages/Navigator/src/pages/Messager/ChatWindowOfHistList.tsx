import React, { Component } from 'react';
import { connect } from 'dva';
import loadsh from 'lodash';
import { Divider, Input, Avatar, List, Button, Spin } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import CommonEmpty from '@/components/Empty';
import styles from './ChatWindowOfHistList.less';

/**
 * 获取当前聊天对象
 * @returns {Promise<void>}
 */
const getCurrentChat = (props: any) => {
  const { chatController } = props;

  const chatMessages = loadsh.get(chatController, 'chatMessages', {});
  const sessionId = loadsh.get(chatController, 'sessionId');
  const currentChat = loadsh.get(chatMessages, `${sessionId}`, {});

  return currentChat;
};

class ChatWindowHistList extends Component<any> {
  state = {
    loading: false,
    hasMore: true,
    inputVal: '',
    filterMode: false,
    currentChatHist: {} as any,
    filterList: [],
  };

  componentDidMount = () => {
    const currentChat = getCurrentChat(this.props);
    const currentChatHist = { ...currentChat };
    this.setState({ currentChatHist });
  };

  handleInfiniteOnLoad = async () => {
    this.setState({
      loading: true,
    });

    this.fetHistMessage();
  };

  // 取聊天纪录，每次取最新数据
  fetHistMessage = async () => {
    const { dispatch, chatController } = this.props;
    const { currentChatHist } = this.state;
    const currentChat = getCurrentChat(this.props);
    const newCurrentChatHist = !loadsh.isEmpty(currentChatHist)
      ? currentChatHist
      : { ...currentChat };

    const pagination = loadsh.get(newCurrentChatHist, 'pagination');
    const currentPage = loadsh.get(pagination, 'currentPage', 0);
    const totalPage = loadsh.get(pagination, 'totalPage', 0);

    const sessionId = loadsh.get(chatController, 'sessionId');

    if (currentPage < totalPage) {
      // 取聊天纪录
      const response = await dispatch({
        type: 'chatController/getBySessionId',
        payload: {
          currentPage: currentPage + 1,
          pageSize: 10,
          params: { sessionId },
          reverse: false,
        },
      });

      let messages = [];
      if (response?.success) {
        messages = loadsh.concat(
          newCurrentChatHist?.messages.reverse(),
          loadsh.get(response, 'resultData.rows', [])
        );

        const resultData = response?.resultData;
        const newPagination = {
          currentPage: resultData?.currentPage,
          pageSize: resultData?.pageSize,
          total: resultData?.total,
          totalPage: resultData?.totalPage,
        };

        loadsh.set(newCurrentChatHist, 'messages', messages);
        loadsh.set(newCurrentChatHist, 'pagination', newPagination);

        this.setState({
          currentChatHist: newCurrentChatHist,
          loading: false,
        });
      }
    } else {
      this.setState({
        hasMore: false,
        loading: false,
      });
    }
  };

  handleBack = () => {
    const { dispatch } = this.props;

    dispatch({
      type: 'chatController/closeChatWindowHist',
    });

    this.setState({
      filterList: [],
      filterMode: false,
      currentChatHist: {},
    });
  };

  handleChange = (evt: any) => {
    const { value } = evt.target;

    let filterMode = true;
    if (!value) {
      filterMode = false;
    }

    this.setState({
      inputVal: value,
      filterMode,
    });

    this.search(value);
  };

  handlePressEnter = () => {
    const { inputVal } = this.state;
    this.search(inputVal);
  };

  search = (kew: any) => {
    const { currentChatHist } = this.state;
    const messages = loadsh.get(currentChatHist, 'messages');

    const filterList = messages?.filter((item: any) => item.content.indexOf(kew) !== -1);

    this.setState({
      filterList,
    });
  };

  renderData = () => {
    const { currentChatHist, filterList, filterMode } = this.state;
    const currentChat = getCurrentChat(this.props);

    let data = currentChat?.messages;

    if (filterMode) {
      data = filterList;

      return data;
    }

    if (!loadsh.isEmpty(currentChatHist)) {
      data = currentChatHist?.messages;

      return data;
    }

    return data;
  };

  render() {
    const { hasMore, loading } = this.state;

    const messages = this.renderData();

    return (
      <div className={styles.wrapper}>
        <div className={styles.box}>
          <Input
            onChange={this.handleChange}
            style={{ width: '88%', margin: '0 auto', display: 'block' }}
            placeholder={formatMessageApi({
              Label_COM_WarningMessage: 'app.navigator.drawer.messager.search',
            })}
          />

          <Divider orientation="left">History</Divider>

          {messages?.length > 0 ? (
            <div className={styles.scrollWrapper}>
              <InfiniteScroll
                initialLoad={false}
                pageStart={0}
                loadMore={this.handleInfiniteOnLoad}
                hasMore={!loading && hasMore}
                useWindow={false}
              >
                <List
                  itemLayout="horizontal"
                  dataSource={messages}
                  renderItem={(item: any) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={
                          item?.avatar ? (
                            <span>
                              <Avatar src={item?.avatar} />
                            </span>
                          ) : (
                            <span>
                              <Avatar style={{ backgroundColor: '#e87722' }} icon="user" />
                            </span>
                          )
                        }
                        title={item?.userName}
                        description={item.content}
                      />
                    </List.Item>
                  )}
                >
                  {loading && hasMore && (
                    <div key={1}>
                      <Spin />
                    </div>
                  )}
                </List>
              </InfiniteScroll>
            </div>
          ) : (
            <CommonEmpty />
          )}

          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <Button onClick={this.handleBack}>BACK</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(({ chatController, loading }: any) => ({
  chatController,
  loading,
}))(ChatWindowHistList);

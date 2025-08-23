import React, { Component } from 'react';
import { connect } from 'dva';
import { List, Avatar } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { SwitchDrawerTab } from 'navigator/enum/SwitchDrawerTab';
import styles from './SmartCircleQueryOf.less';
import StyledDivider from './SmartCircleQueryOfStyledDivider';

@connect(({ workspaceAI, loading }) => ({
  queryListOfUser: workspaceAI.queryListOfUser,
  searchValue: workspaceAI.searchValue,
  loadingOfQueryListOfUser: loading.effects['workspaceAI/queryListOfUser'],
  showLengthOfUser: workspaceAI.showLengthOfUser,
}))
class SmartCircleQueryOfUser extends Component {
  handleClick = ({ userId }) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'workspaceSwitchOn/changeSwitch',
      payload: {
        name: SwitchDrawerTab.Chat,
      },
    });
    // 进入聊天窗口
    dispatch({
      type: 'chatController/openChatWindow',
      payload: {
        sessionId: userId,
      },
    });

    dispatch({
      type: 'chatController/changeSearchVisibleReducer',
      payload: {
        showSearchVisible: false,
      },
    });
  };

  handleMore = async () => {
    const { searchValue, dispatch } = this.props;
    await dispatch({
      type: 'advancedQueryController/enter',
      payload: {
        tabIndex: '3',
        stateOfSearch: {
          params: {
            userId: searchValue,
          },
        },
      },
    });
    await dispatch({
      type: 'advancedQueryAllForm/saveCurrentTab',
      payload: {
        currentTab: '3',
      },
    });
  };

  render() {
    const { queryListOfUser, loadingOfQueryListOfUser, showLengthOfUser } = this.props;

    return queryListOfUser?.rows?.length ? (
      <div className={styles.wrapper}>
        <StyledDivider>
          {formatMessageApi({
            Label_COM_General: 'User',
          })}
        </StyledDivider>
        <List
          itemLayout="horizontal"
          dataSource={queryListOfUser?.rows?.filter((item, i) => i < showLengthOfUser)}
          className={styles.user}
          renderItem={(item) => (
            <List.Item key={item.title}>
              <div key={item.userId} className={styles.item} onClick={() => this.handleClick(item)}>
                <div className={styles.leftBar}>
                  <Avatar src={item?.avatar} className={styles.avatar} />
                </div>
                <div className={styles.rightBar}>
                  <div>No: {item.userId}</div>
                  <div>{item.userName || ''}</div>
                </div>
              </div>
            </List.Item>
          )}
          loading={loadingOfQueryListOfUser}
        />
        {queryListOfUser.total > showLengthOfUser && (
          <div className={styles.moreWrapper}>
            <a className={styles.more} onClick={() => this.handleMore()}>
              {formatMessageApi({
                Label_BIZ_Claim: 'app.navigator.drawer.aiCircle.label.more',
              })}{' '}
              <i className={styles.arrow}>&gt;</i>
            </a>
          </div>
        )}
      </div>
    ) : (
      ''
    );
  }
}

export default SmartCircleQueryOfUser;

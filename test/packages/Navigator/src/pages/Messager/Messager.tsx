import React, { Component } from 'react';
import { connect } from 'dva';
import { Tabs, Icon, Badge } from 'antd';
import { ReactComponent as userSvg } from 'navigator/assets/messager-user.svg';
import { ReactComponent as groupSvg } from 'navigator/assets/messager-group.svg';
import { ReactComponent as dialogueSvg } from 'navigator/assets/messager-dialogue.svg';
import MessagerHeader from './MessagerHeader';
import Search from './Search';
import Conversation from './Conversation';
import Contact from './Contacts';
import Notification from './Notification';
import styles from './Messager.less';

@connect(({ user, chatController, converseController, contactsAssigneeList }) => ({
  userId: user.currentUser?.userId,
  currentTab: chatController.currentTab,
  webSocket: chatController.webSocket,
  AssigneeListRef: contactsAssigneeList?.AssigneeListRef,
  docSize: contactsAssigneeList?.docSize,
  messagerTotal: converseController.messagerTotal,
}))
class Messager extends Component {
  handleTabChange = (value) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'chatController/changeCurrentTab',
      payload: {
        currentTab: value,
      },
    });
  };

  fnDragOver = (e) => {
    // assignee list can scroll to next page when dragging the task
    const { docSize, AssigneeListRef } = this.props;
    if (!AssigneeListRef) return;
    const { clientHeight, scrollTop } = AssigneeListRef;
    const { clientY } = e;
    const offsetTop = docSize.height - clientHeight;
    const ajust = 50;
    const step = 5;
    if (clientY <= offsetTop + ajust && scrollTop !== 0) {
      AssigneeListRef.scrollTop -= step;
    } else if (clientY >= offsetTop + clientHeight - ajust) {
      AssigneeListRef.scrollTop += step;
    }
  };

  render() {
    const { currentTab, messagerTotal } = this.props;

    return (
      <div className={styles.messager} onDragOver={this.fnDragOver}>
        <MessagerHeader />
        <div className={styles.tabs}>
          <Tabs
            defaultActiveKey={currentTab}
            activeKey={currentTab}
            onChange={this.handleTabChange}
            type="card"
          >
            <Tabs.TabPane
              key="1"
              tab={
                <div>
                  <Badge count={messagerTotal} className={styles.total}>
                    <Icon component={dialogueSvg} />
                  </Badge>
                </div>
              }
            >
              <Search>
                <Conversation />
              </Search>
            </Tabs.TabPane>
            <Tabs.TabPane key="2" tab={<Icon component={userSvg} />}>
              <Search>
                <Contact />
              </Search>
            </Tabs.TabPane>
            <Tabs.TabPane key="3" tab={<Icon component={groupSvg} />}>
              <Search>
                <Notification />
              </Search>
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default Messager;

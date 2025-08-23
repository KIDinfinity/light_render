import React, { Component } from 'react';
import { connect } from 'dva';
import { List, Avatar, Badge, Row, Col, Icon } from 'antd';
import Ellipsis from '@/components/Ellipsis';
import shareIcon from 'navigator/assets/share.svg';
import { ReactComponent as chatIcon } from 'navigator/assets/chat-message.svg';
import timeUtil from '@/utils/time';
import userDefaultIcon from 'navigator/assets/user-default.svg';
import ListItemAvatar from './components/ListItemAvatar';
import styles from './ConversationListItem.less';

@connect(({ chatController }: any) => ({
  chatController,
}))
class ChatConversationListItem extends Component<any> {
  state = {
    show: false,
  };

  handleMouseEnter = () => {
    this.handleShow(true);
  };

  handleMouseLeave = () => {
    this.handleShow(false);
  };

  handleShow = (bool: boolean) => {
    this.setState({
      show: bool,
    });
  };

  handleEnterChat = (num: number, sessionId: string) => {
    const { dispatch } = this.props;

    dispatch({
      type: 'chatController/openChatWindow',
      payload: {
        sessionId,
      },
    });
  };

  render() {
    const { item } = this.props;
    const { show } = this.state;

    return (
      <List.Item
        onMouseLeave={this.handleMouseLeave}
        onClick={() => this.handleEnterChat(item.unread, item?.sessionId)}
      >
        <List.Item.Meta
          avatar={<ListItemAvatar item={item} handleMouseEnter={this.handleMouseEnter} />}
          title={<a className={styles.userName}>{item?.sessionName}</a>}
          description={
            <Ellipsis lines={0} length={18} fullWidthRecognition>
              {item?.lcontent}
            </Ellipsis>
          }
        />
        <div className={styles.right}>
          <div className="time">{timeUtil.calendar(item?.ltime)}</div>
          {item?.unread !== 0 && <Badge count={item?.unread} overflowCount={99} />}
        </div>
        {show && (
          <Row type="flex" className={styles.cardtBox}>
            <Row type="flex" className={styles.cardMsg}>
              <Avatar src={item?.avatar ? item?.avatar : userDefaultIcon} />
              <div className={styles.userInfo}>
                <h4 className={styles.name}>{item.sessionName}</h4>
                <div className={styles.title}>{item.title}</div>
              </div>
            </Row>
            <Row type="flex" className={styles.boxIcon}>
              <Col className={styles.iconImg}>
                <img className={styles.iconShare} src={shareIcon} alt=" " />
              </Col>
              <Col className={styles.iconImg}>
                <Icon component={chatIcon} className={styles.chatIcon} />
              </Col>
            </Row>
          </Row>
        )}
      </List.Item>
    );
  }
}

export default ChatConversationListItem;

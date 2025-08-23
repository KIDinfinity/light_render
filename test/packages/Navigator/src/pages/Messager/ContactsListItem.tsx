import React, { Component } from 'react';
import { connect } from 'dva';
import { List, Avatar, Row, Col, Icon } from 'antd';
import shareIcon from 'navigator/assets/share.svg';
import { ReactComponent as chatIcon } from 'navigator/assets/chat-message.svg';
import userDefaultIcon from 'navigator/assets/user-default.svg';
import ListItemAvatar from './components/ListItemAvatar';
import styles from './ContactsListItem.less';

class ContactsListItem extends Component<any> {
  state = {
    show: false,
  };

  handleMouseEnter = () => {
    this.handleShow(true);
  };

  handleMouseLeave = () => {
    this.handleShow(false);
  };

  handleShow = (bool: any) => {
    this.setState({
      show: bool,
    });
  };

  handleEnterChat = async (sessionId: any) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'chatController/openChatWindow',
      payload: {
        sessionId,
      },
    });
  };

  render() {
    const { item }: any = this.props;
    const { show } = this.state;
    return (
      <List.Item
        className={styles.list}
        onMouseLeave={this.handleMouseLeave}
        onClick={() => this.handleEnterChat(item?.userId)}
      >
        <List.Item.Meta
          avatar={<ListItemAvatar item={item} handleMouseEnter={this.handleMouseEnter} />}
          title={item.userName}
        />
        {item.first && (
          <span data-en={item.userName.toUpperCase().slice(0, 1)} className={styles.first}>
            {item.userName.toUpperCase().slice(0, 1)}
          </span>
        )}
        {show ? (
          <Row type="flex" className={styles.cardtBox}>
            <Row type="flex" className={styles['card-msg']}>
              <Avatar src={item?.avatar ? item?.avatar : userDefaultIcon} />
              <div className={styles['user-info']}>
                <span className={styles.name}>{item.userName}</span>
                {item.title && <span className={styles.title}>{item.title}</span>}
              </div>
            </Row>
            <Row type="flex" className={styles.boxIcon}>
              <Col className={styles.iconImg}>
                <img src={shareIcon} alt=" " />
              </Col>
              <Col className={styles.iconImg}>
                <Icon component={chatIcon} className={styles.chatIcon} />
              </Col>
            </Row>
          </Row>
        ) : (
          ''
        )}
      </List.Item>
    );
  }
}

export default connect(({ chatController }: any) => ({
  chatController,
}))(ContactsListItem);

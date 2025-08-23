import React, { Component } from 'react';
import { Avatar, Card } from 'antd';
import { connect } from 'dva';
import userDefaultIcon from 'navigator/assets/user-default.svg';
import MessagerHeaderStatus from './MessagerHeaderStatus';
import styles from './MessagerHeader.less';

@connect(({ user, userContactController }) => ({
  currentUser: user.currentUser,
  title: userContactController.title,
}))
class MessagerHeader extends Component {
  componentDidMount = async () => {
    const { dispatch } = this.props;
    await dispatch({
      type: 'userContactController/getUserInfo',
    });
  };

  render() {
    const { currentUser, title } = this.props;

    return (
      <div className={styles.header}>
        <Card>
          <Card.Meta
            avatar={<Avatar size={40} src={userDefaultIcon} />}
            title={
              <div>
                <span style={{ lineHeight: '24px' }}>{currentUser?.userName}</span>
                <span className={styles.title}>{title}</span>
              </div>
            }
            description={<MessagerHeaderStatus />}
          />
        </Card>
      </div>
    );
  }
}

export default MessagerHeader;

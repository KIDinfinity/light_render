import React, { Component } from 'react';
import styles from './NotificationDraftListItem.less';

class NotificationDraftListItem extends Component {
  state = {};

  render() {
    const { icon, item } = this.props;

    return (
      <div className={styles.container}>
        <div className={styles.left}>
          <img src={icon} alt="draft" />
        </div>
        <div className={styles.content}>
          <div className={styles.title}>{item?.title}</div>
          <div>{item?.time}</div>
        </div>
      </div>
    );
  }
}

export default NotificationDraftListItem;

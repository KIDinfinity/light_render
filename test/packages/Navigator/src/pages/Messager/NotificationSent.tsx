import React, { Component } from 'react';
import { connect } from 'dva';

@connect(({ notificationController }) => ({
  pageSentVisible: notificationController?.pageSentVisible,
}))
class NotificationSent extends Component {
  state = {};

  render() {
    const { pageSentVisible } = this.props;

    return <div>{pageSentVisible && <div>NotificationSent</div>}</div>;
  }
}

export default NotificationSent;

import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessageApi } from '@/utils/dictFormatMessage';

@connect(({ notificationController }) => ({
  pageGroupVisible: notificationController?.pageGroupVisible,
}))
class NotificationGroup extends Component {
  state = {};

  render() {
    const { pageGroupVisible } = this.props;

    return (
      <div>
        {pageGroupVisible && (
          <div>
            {formatMessageApi({
              Label_COM_WarningMessage: 'app.navigator.drawer.messager.notifications.draft-group',
            })}
          </div>
        )}
      </div>
    );
  }
}

export default NotificationGroup;

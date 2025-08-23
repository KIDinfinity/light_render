import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessageApi } from '@/utils/dictFormatMessage';

@connect(({ notificationController }) => ({
  pageDraftVisible: notificationController?.pageDraftVisible,
}))
class NotificationDraft extends Component {
  state = {};

  render() {
    const { pageDraftVisible } = this.props;

    return (
      <div>
        {pageDraftVisible && (
          <div>
            {formatMessageApi({
              Label_COM_WarningMessage: 'app.navigator.drawer.messager.notifications.draft',
            })}
          </div>
        )}
      </div>
    );
  }
}

export default NotificationDraft;

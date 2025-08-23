import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessageApi } from '@/utils/dictFormatMessage';

@connect(({ notificationController }) => ({
  pageNewVisible: notificationController?.pageNewVisible,
}))
class NotificationNew extends Component {
  state = {};

  render() {
    const { pageNewVisible } = this.props;

    return (
      <div>
        {pageNewVisible && (
          <div>
            {formatMessageApi({
              Label_COM_WarningMessage: 'app.navigator.drawer.messager.notifications.new',
            })}
          </div>
        )}
      </div>
    );
  }
}

export default NotificationNew;

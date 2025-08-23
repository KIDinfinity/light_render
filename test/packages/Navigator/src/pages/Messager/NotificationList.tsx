import React, { Component } from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import NotificationTitle from './NotificationTitle';
import styles from './NotificationListView.less';
import NotificationDraftList from './NotificationDraftList';

// import sentIcon from 'navigator/assets/sent.svg';

@connect(({ notificationController }) => ({
  notificationController,
  pageNotificationVisible: notificationController?.pageNotificationVisible,
  listDraft: notificationController?.listDraft,
}))
class NotificationList extends Component {
  state = {};

  render() {
    const { pageNotificationVisible } = this.props;

    return (
      <div>
        {pageNotificationVisible && (
          <div>
            <div className={styles.newBtn}>
              <Button type="primary" block>
                {formatMessageApi({
                  Label_COM_WarningMessage: 'app.navigator.drawer.messager.write-notification',
                })}
              </Button>
            </div>
            <NotificationTitle
              title={formatMessageApi({
                Label_COM_WarningMessage: 'app.navigator.drawer.messager.draft',
              })}
            />
            <NotificationDraftList />
          </div>
        )}
      </div>
    );
  }
}

export default NotificationList;

import React, { Component } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import draftIcon from 'navigator/assets/draft.svg';
import NotificationDraftListItem from './NotificationDraftListItem';

@connect(({ notificationController }) => ({
  notificationController,
  listDraft: notificationController?.listDraft,
}))
class NotificationDraftList extends Component {
  state = {};

  componentDidMount = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'notificationController/lsDraft',
      payload: {
        currentPage: 1,
        pageSize: 3,
      },
    });
  };

  render() {
    const { listDraft } = this.props;

    return (
      <div>
        {lodash.map(listDraft, (item) => (
          <NotificationDraftListItem key={item?.id} icon={draftIcon} item={item} />
        ))}
      </div>
    );
  }
}

export default NotificationDraftList;

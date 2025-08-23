import React, { Component } from 'react';
import { connect } from 'dva';
import { Checkbox } from 'antd';
import ChatWindowOfContentListItemSelf from './ChatWindowOfContentListItemSelf';
import ChatWindowOfContentListItemOther from './ChatWindowOfContentListItemOther';
import styles from './ChatWindowOfContentListItem.less';

class ChatWindowOfContentListItem extends Component<any> {
  handleChange = (item: any) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'chatController/saveMessageListItem',
      payload: {
        item: {
          ...item,
          checked: !item.checked,
        },
      },
    });
  };

  render() {
    const { item, img, currentUser, showMultiSelect } = this.props;
    const { userId } = currentUser;

    return (
      <div className={styles.listbox}>
        {item?.srcId === userId ? (
          <ChatWindowOfContentListItemSelf item={item} img={img} />
        ) : (
          <ChatWindowOfContentListItemOther item={item} img={img} />
        )}
        {showMultiSelect && (
          <Checkbox checked={item.checked} onChange={() => this.handleChange(item)} />
        )}
      </div>
    );
  }
}

export default connect(({ user, chatController }: any) => ({
  currentUser: user.currentUser,
  chatController,
  archiveList: chatController.archiveList,
  archiveListInIt: chatController.archiveList.archiveListInIt,
  showContextMenu: chatController.showContextMenu,
  showMultiSelect: chatController.showMultiSelect,
}))(ChatWindowOfContentListItem);

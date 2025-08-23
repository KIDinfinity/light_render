import React, { Component } from 'react';
import { connect } from 'dva';
import ChatWindow from './ChatWindow';
import ContactsList from './ContactsList';
import ContactsAssigneeList from './ContactsAssigneeList';

@connect(({ chatController, contactsAssigneeList }: any) => ({
  chatWindowVisible: chatController.chatWindowVisible,
  isAssigneeListVisible: contactsAssigneeList.isAssigneeListVisible,
}))
class Contacts extends Component<any> {
  componentDidMount = () => {
    const { dispatch } = this.props;

    dispatch({
      type: 'chatController/changeSearchVisibleReducer',
      payload: {
        showSearchVisible: true,
      },
    });
  };

  render() {
    const { chatWindowVisible, isAssigneeListVisible } = this.props;
    const contact = chatWindowVisible ? <ChatWindow /> : <ContactsList />;

    return isAssigneeListVisible ? <ContactsAssigneeList /> : contact;
  }
}

export default Contacts;

import lodash from 'lodash';

export default (state, action) => {
  const editChatMessages = state.currentChatMessages;
  const { item } = action.payload;
  let isShowArchive;

  const newMessage = lodash.map(editChatMessages, (message) => {
    if (message.mid === item.mid) {
      return item;
    }

    return message;
  });

  // 是否有勾选，有的归档的图标高亮
  lodash.forEach(newMessage, (msg) => {
    if (msg.checked) {
      isShowArchive = true;
    }
  });

  return {
    ...state,
    currentChatMessages: newMessage,
    isShowArchive,
  };
};

import lodash from 'lodash';

export default (state) => {
  const editChatMessages = lodash.cloneDeep(state.currentChatMessages);
  const archiveListInIt = lodash.cloneDeep(state.archiveList.archiveListInIt);
  const sessionId = lodash.cloneDeep(state.sessionId);

  // 把当前聊天的列表里的check去掉
  const newMessages = lodash.map(editChatMessages, (item) => {
    const message = { ...item };
    if (message.checked) {
      archiveListInIt.push(message);
      delete message.checked;

      return message;
    }
    delete message.checked;

    return item;
  });

  // 排序
  const archiveListSort = archiveListInIt?.sort((a, b) => a.mid - b.mid);

  // 初始值
  const newArchiveListInIt = lodash.map(archiveListSort, (item) => ({
    srcId: item.srcId,
    content: item.content,
    time: item.time,
    sessionId,
    messageId: item.mid,
  }));

  // 后台传值的
  const archiveListParams = lodash.map(archiveListSort, (item) => ({
    mid: item.mid,
    sessionId,
    messageId: item.mid,
  }));

  return {
    ...state,
    archiveList: {
      archiveListParams,
      archiveListInIt: newArchiveListInIt,
    },
    showMultiSelect: false,
    isShowArchive: false,
    currentChatMessages: newMessages,
  };
};

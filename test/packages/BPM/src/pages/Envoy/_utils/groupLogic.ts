export default (memoItem: any) => {
  const requestedClientRole = memoItem.requestedClientRole || '';
  const requestedClientId = memoItem.requestedClientId || '';
  if (!requestedClientRole && !requestedClientId) {
    return memoItem.groupCode;
  }
  return requestedClientRole + '_' + requestedClientId;
};

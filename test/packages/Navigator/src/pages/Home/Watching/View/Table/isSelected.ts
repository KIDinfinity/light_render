export default ({ dataSource = [], stateOfSearch, record, index, id = 'taskId' }: any) => {
  const { selectable, pagination } = stateOfSearch;
  if (selectable.current.index === 0 && !selectable.current.id) {
    return index === 0 ? 'selected' : '';
  }
  if (!pagination || !selectable) {
    return '';
  }

  const { prev, current, next } = selectable;
  const { total, pageSize, currentPage } = pagination;

  // 默认标识第一条
  let selectedRowIndex: null | number = 0;
  if (current.id) {
    const currentExist = dataSource.some((item: any) => item[id] === current.id);
    const nextExist = dataSource.some((item: any) => item[id] === next.id);
    // 访问过详情页
    selectedRowIndex = -1;
    if (currentExist) {
      // 访问详情页时的那项数据存在
      if (record[id] === current.id) {
        // 访问详情页时的那项数据存在，表示数据没有减少，直接标识
        selectedRowIndex = index;
      }
    } else if (nextExist) {
      // 访问详情页时的那项数据丢失，且后一条数据存在，标识后一条数据
      if (record[id] === next.id) {
        selectedRowIndex = index;
      }
    } else if (!nextExist && total > pageSize * currentPage) {
      // 访问详情页时的那项数据丢失，且后一条数据存在于下一页，标识下一页的第一条数据（即本页的最后一条）
      selectedRowIndex = pageSize - 1;
    } else if (record[id] === prev.id) {
      // 访问详情页时的那项数据丢失，且后一条数据也不存在，则标识前一条数据
      selectedRowIndex = index;
    }
  }

  return selectedRowIndex === index ? 'selected' : '';
};

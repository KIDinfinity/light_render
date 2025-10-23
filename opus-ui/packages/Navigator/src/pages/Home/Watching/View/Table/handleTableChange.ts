export default (pagination: any, filters: any, sorter: any) => {
  const params = {
    // 筛选
    params: {
      ...filters,
    },

    // 分页
    pagination: {
      pageSize: pagination?.pageSize,
      currentPage: pagination?.current,
      total: pagination?.total,
    },

    // 排序
    sortName: sorter?.field,
    orders: {},

    // 选中
    selectable: {
      prev: {
        id: '',
        index: -1,
      },
      current: {
        id: '',
        index: 0,
      },
      next: {
        id: '',
        index: 1,
      },
    },
  };

  // 排序 - 正反
  if (sorter?.order) {
    params.sortOrder = sorter.order === 'ascend' ? 'asc' : 'desc';
  }
  // 排序 - 字段
  if (sorter?.field) {
    params.orders = {
      [sorter.field]: {
        sortName: sorter.field,
        sortOrder: sorter.order,
      },
    };
  }

  return params;
};

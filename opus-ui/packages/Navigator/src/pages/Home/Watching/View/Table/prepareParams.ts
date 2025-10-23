import lodash from 'lodash';
import { dashboardPageSize } from '@/utils/constant';

export default ({ params, filter, userId, stateOfSearch }) => {
  const sort = lodash.values(stateOfSearch?.orders)[0] || {};

  const options = {
    // 分页
    pageSize: stateOfSearch?.pagination?.pageSize || dashboardPageSize,
    currentPage: stateOfSearch?.pagination?.currentPage,
    ...params?.pagination,

    // 筛选
    params: {
      taskStatus: params?.filter || filter,
      ...params?.params,
      assignee: userId,
    },
  };

  // 排序
  if (params?.sortOrder) {
    options.sortOrder = params.sortOrder;
  } else if (sort?.sortOrder) {
    options.sortOrder = sort.sortOrder === 'ascend' ? 'asc' : 'desc';
  }

  // 排序
  if (options.sortOrder) {
    options.sortName = params?.sortName || sort.sortName;
  }

  return options;
};

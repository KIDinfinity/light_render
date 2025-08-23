import lodash from 'lodash';

export const PAGE = 1;
export const PAGESIZE = 10;

// 请求: 组件 - 默认值
export const defaultReqVal = {
  params: {},
  pagination: {
    currentPage: PAGE,
    pageSize: PAGESIZE,
  },
};

// 请求: 组件 -> 接口
export const reqC2B = (data: any) => ({
  params: data?.params || {},
  currentPage: data?.pagination?.page || PAGE,
  pageSize: data?.pagination?.pageSize || PAGESIZE,
  sortName: data?.sortName,
  sortOrder: data?.sortOrder,
  sortOrders: data?.sortOrders || [],
});

// 请求: 接口 -> 组件
export const reqB2C = (data: any) => ({
  params: data?.params || {},
  pagination: {
    page: data?.currentPage || PAGE,
    pageSize: data?.pageSize || PAGESIZE,
  },
});

// [不需要处理]响应: 组件 -> 接口
// export const resC2B = () => ({});

// 响应: 接口 -> 组件
export const resB2C = (data: any) => {
  if (!data?.resultData) {
    return data;
  }

  const result = data?.resultData;

  if (result?.rows) {
    const { total, pageSize, currentPage, totalPage = 1, rows = [] } = result;
    const list = rows.map((item: any, key: any) => ({
      ...item,
      key,
    }));

    return {
      list,
      pagination: {
        total,
        pageSize,
        page: currentPage,
        totalPage,
      },
    };
  }

  if (lodash.isArray(data?.resultData)) {
    return {
      list: data?.resultData,
      pagination: {
        total: data?.resultData.length,
        pageSize: data?.resultData.length,
        page: PAGE,
      },
    };
  }

  return result;
};

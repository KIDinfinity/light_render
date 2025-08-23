import lodash from 'lodash';
import { PAGE, PAGESIZE, FuncHistoryCode, WhereOperator } from './Constant';
import type { SearchComponentProps, SortOrderProps, DataFieldProps } from './Typings';
import { getDefaultSort } from './FormUtils';
import { tranferResult } from './Transfer';

class SearchUtils {
  // 处理range key(first/second) to Array
  handlerParams = (payParams: any) => {
    const expFir = new RegExp(/_first/, 'g');
    const expSec = new RegExp(/_second/, 'g');
    const exp = new RegExp(/_first|_second/, 'g');
    return lodash.keys(payParams).reduce((pre, cur) => {
      const fieldName = cur.replace(exp, '');
      if (exp.test(cur) && payParams[cur] && !lodash.isArray(pre[fieldName])) {
        lodash.set(pre, fieldName, new Array(2));
      }
      if (expFir.test(cur) && payParams[cur]) {
        lodash.set(pre, `${fieldName}[0]`, payParams[cur]);
      } else if (expSec.test(cur) && payParams[cur]) {
        lodash.set(pre, `${fieldName}[1]`, payParams[cur]);
      } else {
        lodash.set(pre, cur, payParams[cur]);
      }
      return pre;
    }, {});
  };

  // 获取默认值
  getSearchDefault = (functionData: any) => {
    const { searchComponentList = [], defaultSort } = functionData;
    const tempSearch = searchComponentList || [];
    const params = tempSearch.reduce((searchDefault: any, current: SearchComponentProps) => {
      const { defaultValue: val, fieldName } = current;
      if (!lodash.isEmpty(val) || val === 0 || val === false) {
        lodash.set(searchDefault, fieldName, val);
      }
      return searchDefault;
    }, {});
    const sortOrders = getDefaultSort(defaultSort);

    return {
      pagination: {},
      params: { ...params },
      sortOrders,
    };
  };

  handlerSearchParams = (payload: any, functionData: any, isListPage: boolean = false) => {
    const { functionCode } = payload;
    const newPayload = {
      ...payload,
      params: tranferResult(functionData?.searchComponentList, payload.params, true),
    };
    const { searchComponentList = [], dataFieldList = [] } = functionData;
    if (functionCode === FuncHistoryCode && !isListPage) {
      return this.handlerHistorySearch(newPayload, dataFieldList);
    }
    return this.handlerListPageSearch(newPayload, searchComponentList);
  };

  handlerHistorySearch = (payload: any, dataFieldList: DataFieldProps[] = []) => {
    const { params = {}, sortOrders = [], ...res } = payload;
    const newParams = lodash.keys(params).reduce((pre, cur) => {
      const temp = params[cur];
      if (!lodash.isEmpty(temp) || lodash.isBoolean(temp)) {
        lodash.set(pre, lodash.camelCase(cur), params[cur]);
      }
      return pre;
    }, {});
    const searchParams = {
      ...res,
      params: newParams,
    };
    const sortName = lodash
      .map(sortOrders, (item: SortOrderProps) => {
        const tempName = lodash
          .chain(dataFieldList)
          .find((el) => el.fieldName === item.sortName)
          .get('fieldName')
          .value();
        return `${tempName} ${item.sortOrder}`;
      })
      .join(',');

    if (sortName) {
      lodash.set(searchParams, 'sortName', sortName);
    }

    return searchParams;
  };

  // 处理list page serach传参
  handlerListPageSearch = (payload: any, searchComponentList: SearchComponentProps[] = []) => {
    const {
      params: payParams = {},
      currentPage,
      pageSize,
      sortOrders,
      sortName,
      sortOrder,
      functionCode,
      functionId,
      caseCategory,
    } = payload;
    const paramsTemp: any = {
      functionCode,
      functionId,
      orderConditions: [],
      whereConditions: [],
      caseCategory,
      page: {
        currentPage: currentPage || PAGE,
        pageSize: pageSize || PAGESIZE,
        firstResult: 0,
        offset: 0,
        params: {},
        rows: [],
        sortName: '',
        sortOrder: '',
        startPage: 0,
        total: 0,
        totalPage: 0,
      },
    };

    if (sortOrders && sortOrders.length) {
      const orderConditions = lodash.map(sortOrders, (item: any) => ({
        fieldName: item.sortName,
        orderType: item.sortOrder,
      }));
      lodash.set(paramsTemp, 'orderConditions', orderConditions);
    } else if (sortName && sortOrder) {
      lodash.set(paramsTemp, 'orderConditions', [
        {
          fieldName: sortName,
          orderType: sortOrder,
        },
      ]);
    }

    // 去除field range拆分
    const newPayParams = this.handlerParams(payParams);

    // todo 如果是rangeQuery, operator是between
    paramsTemp.whereConditions =
      newPayParams &&
      lodash.keys(newPayParams).reduce((pre: any[], key) => {
        if (newPayParams[key]) {
          const isRange = lodash.isArray(newPayParams[key]);
          let options;
          if (isRange) {
            const firstValue = newPayParams[key][0];
            const secondValue = newPayParams[key][1];
            if (firstValue || secondValue) {
              options = {
                fieldName: key,
                firstFieldValue: newPayParams[key][0],
                secondFieldValue: newPayParams[key][1],
              };
            }
          } else {
            options = {
              fieldName: key,
              firstFieldValue: newPayParams[key],
            };
          }
          if (options)
            pre.push({
              ...options,
              whereOperator: this.getOperatorByFieldName(searchComponentList, key),
            });
        }
        return pre;
      }, []);

    return {
      ...paramsTemp,
    };
  };

  getOperatorByFieldName = (
    searchComponentList: SearchComponentProps[] = [],
    fieldName: string = ''
  ) => {
    const temp = lodash
      .chain(searchComponentList)
      .find((el: SearchComponentProps) => el.fieldName === fieldName)
      .value();
    return (
      lodash.get(temp, 'whereOperator') ||
      lodash.get(temp, 'whereOperation') ||
      WhereOperator.equal_to
    );
  };
}

export const { handlerParams, getSearchDefault, handlerSearchParams } = new SearchUtils();

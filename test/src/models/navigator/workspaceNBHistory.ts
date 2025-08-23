// @ts-ignore
import { saga } from 'dva';
import lodash from 'lodash';
import { history } from '@/services/dcNbAdvSearchControllerService';
import { formUtils } from 'basic/components/Form';
import { InqueryTypes } from '@/dtos/InqueryTypes';

const { delay } = saga;

export default {
  namespace: 'workspaceNBHistory',

  state: {
    list: {
      list: [],
      pagination: {},
    },
    caseCategory: '',
  },

  effects: {
    list: [
      function* list({ payload }: any, { call, put }: any) {
        yield delay(0);
        const newParams = formUtils.transfersParams(payload, {}, InqueryTypes.NBhistory);
        const response = yield call(history, newParams);
        const rows = lodash.get(response, 'resultData.rows', []);
        if (response?.success) {
          yield put({
            type: 'save',
            payload: {
              list: rows,
              pagination: {
                page: response?.resultData?.currentPage,
                pageSize: response?.resultData?.pageSize,
                total: response?.resultData?.total,
              },
            },
          });
          return response?.resultData;
        }
      },
      { type: 'takeLatest' },
    ],
  },

  reducers: {
    save(state: any, action: any) {
      const dataList = action.payload.list;

      return {
        ...state,
        list: {
          list: dataList,
          pagination: action.payload.pagination,
        },
      };
    },
    saveCaseCategory(state: any, action: any) {
      const caseCategory = action.payload.caseCategory;
      return {
        ...state,
        caseCategory,
      };
    },
  },
};

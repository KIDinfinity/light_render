// @ts-ignore
import { saga } from 'dva';
import lodash from 'lodash';
import dcCaseInquiryControllerService from '@/services/dcCaseInquiryControllerService';
import { resRevert } from '@/utils/transform';
import { formUtils } from 'basic/components/Form';
import { getDrowDownList } from '@/utils/dictFormatMessage';

const { delay } = saga;

export default {
  namespace: 'advancedQueryOfCase',

  state: {
    list: [],
  },

  effects: {
    *getSearchData({ payload }: any, { put, select }: any) {
      const { params, sortName } = payload;
      yield delay(0);

      const configuration = yield select((state: any) => ({
        configuration: state.configController.configuration,
        sortFromTable: state.advancedQueryController.sortFromTable,
      }));

      const Dropdown_CAS_FinalStatus = getDrowDownList('Dropdown_CAS_FinalStatus');

      const currentStatusList: any = [];

      if (!lodash.isEmpty(Dropdown_CAS_FinalStatus)) {
        lodash.map(Dropdown_CAS_FinalStatus, (item: any) => {
          currentStatusList.push(item?.dictCode);
        });
      }

      if (lodash.isEmpty(configuration.configuration)) {
        configuration.configuration = yield put.resolve({
          type: 'configController/getConfiguration',
        });
      }

      let newParams = formUtils.transfersParams(payload, configuration, 'case');
      if (!lodash.isEmpty(params?.currentActivity) || sortName === 'currentActivityKey') {
        newParams = {
          ...newParams,
          params: {
            ...newParams.params,
            finalStatus: currentStatusList,
          },
        };
      }

      return newParams;
    },
    *exportExcel({ payload }: any, { call, put }: any) {
      const newParams = yield put.resolve({
        type: 'getSearchData',
        payload,
      });

      const response = yield call(dcCaseInquiryControllerService.advSearchExport, newParams);
      return response;
    },
    list: [
      function* list({ payload }: any, { call, put }: any) {
        const newParams = yield put.resolve({
          type: 'getSearchData',
          payload,
        });

        const response = yield call(dcCaseInquiryControllerService.advSearch, newParams);

        if (response?.success) {
          // TODO:row不应该返回null的，应该后端处理
          if (response.resultData?.rows !== null) {
            const requestList = lodash.get(response, 'resultData.rows', []);
            const rows = lodash.uniqBy(requestList, 'procInstId');
            const result = lodash.set(response, 'resultData.rows', rows);
            if (lodash.isArray(requestList) && !lodash.isEmpty(requestList)) {
              yield put({
                type: 'workspaceSwitchOn/handleTaskChange',
                payload: {
                  record: requestList[0],
                },
              });
            }
            yield put({
              type: 'save',
              payload: {
                list: resRevert(result),
              },
            });
          } else {
            yield put({
              type: 'save',
              payload: {
                list: [],
              },
            });
          }
          return response?.resultData;
        }
      },
      { type: 'takeLatest' },
    ],
  },

  reducers: {
    save(state: any, action: any) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};

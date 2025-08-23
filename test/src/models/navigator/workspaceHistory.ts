// @ts-ignore
import { saga } from 'dva';
import lodash, { isPlainObject, pick, values, isUndefined } from 'lodash';
import moment from 'moment';
import { history } from '@/services/dcClaimQueryControllerService';
import bpmBusinessProcessService from '@/services/bpmBusinessProcessService';
import { formUtils } from 'basic/components/Form';
import { serialize as objectToFormData } from 'object-to-formdata';

const { delay } = saga;

export default {
  namespace: 'workspaceHistory',

  state: {
    getCaseNoByBusinessNo: '',
    list: {
      list: [],
      pagination: {},
    },
    inited: false,
    initialQueryDays: 3, // claim history模块默认查询submission date的天数（从当前日期倒推的submission date的天数）
  },

  effects: {
    *exportExcel({ payload }: any, { call }: any): Generator<any, any, any> {
      const newParams = formUtils.transfersParams(payload);
      const response = yield call(bpmBusinessProcessService.advSearchExport, newParams);
      return response;
    },
    list: [
      function* list({ payload }: any, { call, put, select }: any) {
        yield delay(0);
        // @ts-ignore
        const newParams = formUtils.transfersParams(payload);
        const { inited, initialQueryDays } = yield select((state: any) => ({
          inited: state.workspaceHistory.inited,
          initialQueryDays: state.workspaceHistory.initialQueryDays,
        }));

        const fields = [
          'caseNo',
          'inquiryClaimNo',
          'caseCategory',
          'insuredName',
          'claimType',
          'assessmentDecision',
          'paymentAmount',
          'submissionDate',
          'closeDate',
        ];

        if (!inited && values(pick(newParams.params, fields)).every((item) => isUndefined(item))) {
          if (!isPlainObject(newParams.params)) newParams.params = {};
          newParams.params.submissionDateFrom = moment()
            .subtract(initialQueryDays, 'days')
            .format('YYYY/MM/DD');
          newParams.params.submissionDateTo = moment().format('YYYY/MM/DD');
        }

        const response = yield call(history, newParams);
        if (response?.success) {
          const list = lodash.get(response, 'resultData.rows', []);
          yield put({
            type: 'save',
            payload: {
              list,
              pagination: {
                page: response?.resultData?.currentPage,
                pageSize: response?.resultData?.pageSize,
                total: response?.resultData?.total,
              },
            },
          });
          if (lodash.size(list) > 0) {
            yield put({
              type: 'insured360/saveTaskInfo',
              payload: {
                taskDetail: {
                  ...list[0],
                },
              },
            });
          }
          return response?.resultData;
        }
      },
      { type: 'takeLatest' },
    ],

    *getCaseNoByBusinessNo({ payload }: any, { call, put }: any) {
      const response = yield call(
        bpmBusinessProcessService.getClaimCaseNo,
        objectToFormData(payload)
      );
      if (response.success) {
        yield put({
          type: 'saveCaseNoByBusinessNo',
          payload: {
            getCaseNoByBusinessNo: response.resultData,
          },
        });

        yield put({
          type: 'navigatorInformationController/saveProcessInstanceIdReducer',
          payload: {
            processInstanceId: response.resultData,
          },
        });
        return response.resultData;
      } else {
        yield put({
          type: 'saveCaseNoByBusinessNo',
          payload: {
            getCaseNoByBusinessNo: '',
          },
        });
      }

      return null;
    },

    *getClaimCaseNo({ payload }: any, { call, put }: any) {
      const { claimNo } = payload;
      const response = yield call(
        bpmBusinessProcessService.getClaimCaseNo,
        objectToFormData({ claimNo })
      );
      if (response?.success && response?.resultData) {
        const caseNo = response.resultData;
        yield put({
          type: 'saveCaseNo',
          payload: {
            caseNo,
          },
        });
        yield put({
          type: 'navigatorInformationController/saveProcessInstanceIdReducer',
          payload: {
            processInstanceId: caseNo,
          },
        });
      }
    },
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
    saveCaseNoByBusinessNo(state: any, action: any) {
      return {
        ...state,
        getCaseNoByBusinessNo: action.payload.getCaseNoByBusinessNo,
      };
    },
    updateInit(state: any, { payload }: any) {
      return {
        ...state,
        inited: payload.inited,
      };
    },
    saveCaseNo(state: any, { payload }: any) {
      const { caseNo } = payload;
      return {
        ...state,
        caseNo,
      };
    },
  },
};

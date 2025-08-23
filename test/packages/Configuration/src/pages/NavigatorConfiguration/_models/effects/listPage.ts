import { handlerSearchParams } from 'configuration/pages/ConfigurationCenter/Utils/Search';
import { businessData } from '@/services/ccJpDataControllerService';
import lodash from 'lodash';
import getCaseCategory from '../config/getCaseCategory';
import { formUtils } from 'basic/components/Form';
import { FunctionCode } from '../../Enum';
export default [
  // eslint-disable-next-line func-names
  function* ({ payload = {} }: any, { put, call, select }: any) {
    const { sortOrders = [] } = payload;
    const { functionData, searchDefault, functionId, functionCode, resetLoading } = yield select(
      (state: any) => ({
        functionData: state.configurationController?.functionData,
        searchDefault: state.configurationController?.searchDefault,
        functionId: state.configurationController?.currentMenu?.id,
        functionCode: state.configurationController?.currentMenu?.functionCode,
        resetLoading: state.configurationController?.resetLoading,
      })
    );
    if (!resetLoading) {
      yield put({
        type: 'saveSearchLoading',
        payload: {
          searchLoading: true,
        },
      });
    }
    yield put({
      type: 'saveSortOrders',
      payload: {
        functionCode,
        sortOrders,
      },
    });

    const hasParams = lodash.has(payload, 'params');
    const options = formUtils.cleanValidateData(hasParams ? payload : searchDefault);

    const newParams =
      FunctionCode.Fun_venus_integration_integration_service_downtime_config === functionCode
        ? {
            functionCode: 'Fun_venus_integration_integration_service_downtime_config',
            functionId: 'ea7e1403-5cd9-458c-b71f-033ea58cbf37',
            orderConditions: [
              {
                fieldName: 'start_day',
                orderType: 'desc',
              },
            ],
            whereConditions: [
              {
                fieldName: 'config_date_type',
                firstFieldValue: 'day',
                whereOperator: 'like',
              },
            ],
            caseCategory: 'BP_DT_CTG01',
            page: {
              currentPage: 1,
              pageSize: 999,
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
          }
        : handlerSearchParams(
            {
              ...options,
              functionId,
              functionCode,
              caseCategory: getCaseCategory(functionCode),
            },
            functionData
          );

    yield put({
      type: 'saveSearchDefault',
      payload: {
        searchDefault: {
          ...options,
          pagination: newParams.page,
        },
      },
    });
    const response = yield call(businessData, newParams);
    if (response?.success) {
      yield put({
        type: 'saveListPage',
        payload: {
          listPage: response?.resultData,
        },
      });
    }
    yield put({
      type: 'saveSearchLoading',
      payload: {
        searchLoading: false,
      },
    });
  },
  { type: 'takeLatest' },
];

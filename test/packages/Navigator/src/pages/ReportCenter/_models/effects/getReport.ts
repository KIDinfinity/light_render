import { handlerSearchParams } from 'configuration/pages/ConfigurationCenter/Utils/Search';
import { report, generate } from '@/services/owbReportCenterReportControllerService';
import { formUtils } from 'basic/components/Form';
import handleMessageModal from '@/utils/commonMessage';
import getVisibleParams from '../../_utils/getVisibleParams';
import moment from 'moment';
import { Modal } from 'antd';

export default [
  function* getReport({ payload = {} }: any, { put, call, select }: any) {
    const { manualRefresh = false, isFromDashboard = false } = payload;
    const { reportMetadata, searchDefault, reportCode, reportListMap } = yield select(
      (state: any) => ({
        reportMetadata: state.reportCenterController?.reportMetadata,
        searchDefault: state.reportCenterController?.searchDefault,
        reportCode: state.reportCenterController?.activeTabKey,
        reportListMap: state.reportCenterController?.reportListMap,
      })
    );
    const isResultCacheDuration = reportMetadata?.[reportCode]?.resultCacheDuration;
    const curSearchDefault = searchDefault?.[reportCode];
    const functionData = {
      searchComponentList: reportMetadata[reportCode].searchFieldList,
    };

    const options = formUtils.cleanValidateData({
      ...payload,
      params: getVisibleParams({
        searchFields: reportMetadata[reportCode]?.searchFieldList,
        params: {
          ...(curSearchDefault?.params || {}),
        },
        overrideVisible: !!isFromDashboard,
      }),
    });

    const newParams = handlerSearchParams(
      {
        ...options,
      },
      functionData
    );

    const reportParams = { ...newParams, reportCode };
    yield put({
      type: 'saveSearchDefault',
      payload: {
        searchDefault: {
          ...curSearchDefault,
          pagination: newParams.page,
          sortOrders: curSearchDefault?.sortOrders,
        },
        reportCode,
      },
    });
    yield put({
      type: 'savePrintParams',
      payload: {
        printParams: reportParams,
      },
    });

    if (reportCode === 'BS_CLM_00007') {
      const data = newParams.whereConditions.find((item) => item.fieldName === 'submission_date');
      if (data && moment(data?.secondFieldValue).diff(data?.firstFieldValue, 'days') > 183) {
        Modal.error({
          title:
            'Not support search period range over 6 months now, please re-input the search period',
        });
        return false;
      }
    }
    if (['HK_CLM_00010', 'HK_CLM_00014'].includes(reportCode)) {
      const data = newParams.whereConditions.find(
        (item) => item.fieldName === 'search_settle_date'
      );
      if (data && moment(data?.secondFieldValue).diff(data?.firstFieldValue, 'days') > 92) {
        Modal.error({
          title:
            'Not support search period range over 3 months now, please re-input the search period',
        });
        return false;
      }
    }

    const response = yield call(isResultCacheDuration ? generate : report, reportParams);
    if (isResultCacheDuration) {
      yield put({
        type: 'findStorage',
      });
    }
    if (response?.success && !isResultCacheDuration) {
      yield put({
        type: 'saveReport',
        payload: {
          tableReport: response?.resultData,
        },
      });
    } else {
      yield put({
        type: 'saveReport',
        payload: {
          tableReport: {},
        },
      });
      if (manualRefresh && !isResultCacheDuration) handleMessageModal(response?.promptMessages);
    }
    yield put({
      type: 'saveClickTab',
      payload: {
        clickdTab: false,
      },
    });
    return { response, reportParams, reportName: reportListMap?.[reportCode]?.reportName };
  },
  { type: 'takeLatest' },
];

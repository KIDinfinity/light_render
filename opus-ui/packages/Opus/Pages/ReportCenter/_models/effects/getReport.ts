import lodash from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { handlerSearchParams } from 'configuration/pages/ConfigurationCenter/Utils/Search';
import { report } from '@/services/owbReportCenterReportControllerService';
import { formUtils } from 'basic/components/Form';
import handleMessageModal from '@/utils/commonMessage';
import getVisibleParams from '../../_utils/getVisibleParams';
import moment from 'moment';

import { Modal } from 'opus/Components/Antd';

export default [
  function* getReport({ payload = {} }: any, { put, call, select }: any) {
    const { manualRefresh = false } = payload;
    const { reportMetadata, searchDefault, reportCode, reportListMap } = yield select(
      (state: any) => ({
        reportMetadata: state.reportCenterController?.reportMetadata,
        searchDefault: state.reportCenterController?.searchDefault,
        reportCode: state.reportCenterController?.activeTabKey,
        reportListMap: state.reportCenterController?.reportListMap,
      })
    );
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
      }),
    });

    const newParams = handlerSearchParams(
      {
        pageSize: 20,
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

    const response = yield call(report, reportParams);
    if (response?.success) {
      yield put({
        type: 'saveReport',
        payload: {
          reportCode,
          tableReport: {
            ...response?.resultData,
            rows: lodash.map(response?.resultData?.rows || [], (item: any) => ({
              ...item,
              cc_key: uuidv4(),
            })),
          },
        },
      });
    } else {
      yield put({
        type: 'saveReport',
        payload: {
          reportCode,
          tableReport: {},
        },
      });
      if (manualRefresh) handleMessageModal(response?.promptMessages);
    }
    return { response, reportParams, reportName: reportListMap?.[reportCode]?.reportName };
  },
  { type: 'takeLatest' },
];

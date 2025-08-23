import { handlerSearchParams } from 'configuration/pages/ConfigurationCenter/Utils/Search';
import { findStorage } from '@/services/owbReportCenterReportControllerService';
import { formUtils } from 'basic/components/Form';
import getVisibleParams from '../../_utils/getVisibleParams';

export default function* ({ payload = {} }: any, { put, call, select }: any) {
  const { isFromDashboard = false } = payload;
  const { reportMetadata, searchDefault, reportCode } = yield select((state: any) => ({
    reportMetadata: state.reportCenterController?.reportMetadata,
    searchDefault: state.reportCenterController?.searchDefault,
    reportCode: state.reportCenterController?.activeTabKey,
  }));
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

  const response = yield call(findStorage, reportParams);

  yield put({
    type: 'saveFindStorage',
    payload: {
      findStorage: response?.success ? response?.resultData : {},
    },
  });
}

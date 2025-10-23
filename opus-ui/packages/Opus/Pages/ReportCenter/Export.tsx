import React from 'react';
import { useSelector, useDispatch } from 'dva';
import moment from 'moment';

import { formatMessageApi } from '@/utils/dictFormatMessage';

import { notification, Modal } from 'opus/Components/Antd';

import { tarckInquiryPoint, eEventOperation } from '@/components/TarckPoint';

import Buttons from 'opus/Components/Buttons';

const Main = () => {
  const dispatch = useDispatch();

  const isPrintTable = useSelector(
    ({ reportCenterController }: any) => reportCenterController?.isPrintTable
  );
  const statisticCodeList = useSelector(
    ({ reportCenterController }: any) => reportCenterController?.statisticCodeList
  );
  const activeTabKey = useSelector(
    ({ reportCenterController }: any) => reportCenterController?.activeTabKey
  );
  const printParams = useSelector(
    ({ reportCenterController }: any) => reportCenterController?.printParams
  );

  const exportLoading = useSelector(
    (state: any) => state.loading.effects['reportCenterController/printReport']
  );

  const checkData = (reportCode: string, params: any) => {
    if (reportCode === 'BS_CLM_00007') {
      const data = params.whereConditions.find((item) => item.fieldName === 'submission_date');
      if (data && moment(data?.secondFieldValue).diff(data?.firstFieldValue, 'days') > 183) {
        Modal.error({
          title:
            'Not support search period range over 6 months now, please re-input the search period',
        });
        return false;
      }
    }
    if (['HK_CLM_00010', 'HK_CLM_00014'].includes(reportCode)) {
      const data = params.whereConditions.find((item) => item.fieldName === 'search_settle_date');
      if (data && moment(data?.secondFieldValue).diff(data?.firstFieldValue, 'days') > 92) {
        Modal.error({
          title:
            'Not support search period range over 3 months now, please re-input the search period',
        });
        return false;
      }
    }
    return true;
  };

  const handleExport = async () => {
    if (!isPrintTable && statisticCodeList.length === 0) {
      notification.error({
        message: formatMessageApi({ Label_COM_ErrorMessage: 'ERR_000299' }),
      });
      return;
    }

    if (!checkData(activeTabKey, printParams)) {
      return;
    }
    const result: any = await dispatch({
      type: 'reportCenterController/printReport',
    });
    tarckInquiryPoint(dispatch, {
      eventName:
        result.reportName ||
        formatMessageApi({ Label_COM_ReportCenter: result.reportParams?.reportCode }),
      eventOperation: eEventOperation.print,
      remarks: result.reportParams?.whereConditions,
    });
  };
  return (
    <Buttons.Export
      defaultStyle
      loading={exportLoading}
      handleClick={() => {
        handleExport();
      }}
    />
  );
};

export default Main;

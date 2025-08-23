import React, { useCallback, useRef } from 'react';
import { connect } from 'dva';
import lodash, { toUpper } from 'lodash';
import { Button, notification, Modal, Tooltip } from 'antd';
import { useLocation } from 'umi';
import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { tarckInquiryPoint, eEventOperation } from '@/components/TarckPoint';
import styles from './index.less';
import { ReportCenterEnum } from '@/enum/GolbalAuthority';
import Authorized from '@/utils/Authorized';
import moment from 'moment';

interface IFindStorage {
  hasQuertStorage: boolean;
  generating: boolean;
}

interface IProps {
  dispatch: any;
  form: any;
  activeTabKey: string;
  printLoading: boolean;
  reportMetadata: any;
  searchDefault: any;
  printReportPDFLoading: boolean;
  previewPDFLoading: boolean;
  reportListMap: any;
  commonAuthorityList: any;
  statisticCodeList: any;
  isPrintTable: boolean;
  printParams: any;
  findStorage: IFindStorage;
}

const BtnGroup: React.FC<IProps> = (props) => {
  const {
    dispatch,
    form,
    activeTabKey,
    printLoading,
    reportMetadata,
    searchDefault,
    printReportPDFLoading,
    previewPDFLoading,
    reportListMap,
    commonAuthorityList,
    statisticCodeList,
    isPrintTable,
    printParams,
    findStorage,
  } = props;

  const removeDashboardData = useRef(false);

  const { state: locationState } = useLocation();

  const isResultCacheDuration = reportMetadata?.[activeTabKey]?.resultCacheDuration;

  const hasError = formUtils.getErrorArray(searchDefault?.[activeTabKey])?.length !== 0;

  const generateDisabled = findStorage?.hasQuertStorage || findStorage?.generating;

  const list = lodash
    .chain(commonAuthorityList)
    .filter((item) => item.result)
    .map((item) => item.authorityCode)
    .value();

  const checkData = useCallback((reportCode: string, params: any) => {
    if (reportCode === 'BS_CLM_00007') {
      const data = params.whereConditions.find((item: any) => item.fieldName === 'submission_date');
      if (data && moment(data?.secondFieldValue).diff(data?.firstFieldValue, 'days') > 183) {
        Modal.error({
          title:
            'Not support search period range over 6 months now, please re-input the search period',
        });
        return false;
      }
    }
    if (['HK_CLM_00010', 'HK_CLM_00014'].includes(reportCode)) {
      const data = params.whereConditions.find(
        (item: any) => item.fieldName === 'search_settle_date'
      );
      if (data && moment(data?.secondFieldValue).diff(data?.firstFieldValue, 'days') > 92) {
        Modal.error({
          title:
            'Not support search period range over 3 months now, please re-input the search period',
        });
        return false;
      }
    }
    return true;
  }, []);

  const searchFn = useCallback(async () => {
    const reportCode = activeTabKey;
    const searchFieldList = reportMetadata?.[reportCode]?.searchFieldList;
    const dictionary = reportMetadata?.[reportCode]?.dictionary;
    const isResultCacheDurationLocal = reportMetadata?.[reportCode]?.resultCacheDuration;
    const validateKey = lodash
      .chain(searchFieldList)
      .filter((el) => el.visible)
      .map((item: any) => item.fieldName)
      .value();

    try {
      await form.validateFields(validateKey, { force: true });
      dispatch({ type: 'reportCenterController/batchSumUpStatistic' });
      const result: any = await dispatch({
        type: 'reportCenterController/getReport',
        payload: { manualRefresh: true },
      });
      removeDashboardData.current = true;
      if (!result || isResultCacheDurationLocal) return;
      if (result?.response?.resultData?.total > 0) {
        const remarks = lodash.reduce(
          result.reportParams?.whereConditions,
          (acc: any, item: any, key: number) => {
            const newAcc = [...acc, { ...item }];
            if (lodash.indexOf(item.firstFieldValue, ',') !== -1) {
              newAcc[key].firstFieldValue = lodash
                .chain(item.firstFieldValue)
                .split(',')
                .map((self: any) => formatMessageApi({ [dictionary?.[item.fieldName]]: self }))
                .join(',')
                .value();
            } else {
              newAcc[key].firstFieldValue = formatMessageApi({
                [dictionary?.[item.fieldName]]: item.firstFieldValue,
              });
            }
            return newAcc;
          },
          []
        );
        tarckInquiryPoint(dispatch, {
          eventName:
            result.reportName ||
            formatMessageApi({ Label_COM_ReportCenter: result.reportParams?.reportCode }),
          eventOperation: eEventOperation.preView,
          remarks,
        });
      }
    } catch (error) {
      // 处理表单校验失败或其他错误
    }
  }, [dispatch, form, activeTabKey, reportMetadata]);

  const resetFn = useCallback(() => {
    dispatch({
      type: 'reportCenterController/reset',
    });
  }, [dispatch]);

  const printFn = useCallback(async () => {
    const { fromDashboard: isFromDashboard, dashboardCode, linkedReportCode } = locationState || {};

    if (!isPrintTable && statisticCodeList.length === 0) {
      notification.error({
        message: formatMessageApi({ Label_COM_ErrorMessage: 'ERR_000299' }),
      });
      return;
    }
    if (!checkData(activeTabKey, printParams)) return;
    const result: any = await dispatch({
      type: 'reportCenterController/printReport',
      payload: {
        isFromDashboard: removeDashboardData.current ? false : isFromDashboard,
        dashboardCode,
        linkedReportCode,
      },
    });
    tarckInquiryPoint(dispatch, {
      eventName:
        result.reportName ||
        formatMessageApi({ Label_COM_ReportCenter: result.reportParams?.reportCode }),
      eventOperation: eEventOperation.print,
      remarks: result.reportParams?.whereConditions,
    });
  }, [dispatch, activeTabKey, isPrintTable, statisticCodeList, printParams, checkData]);

  const printPDFFn = useCallback(async () => {
    if (!isPrintTable && statisticCodeList.length === 0) {
      notification.error({
        message: formatMessageApi({ Label_COM_ErrorMessage: 'ERR_000299' }),
      });
      return;
    }
    if (!checkData(activeTabKey, printParams)) return;
    const result: any = await dispatch({
      type: 'reportCenterController/printReportPDF',
    });
    tarckInquiryPoint(dispatch, {
      eventName:
        result.reportName ||
        formatMessageApi({ Label_COM_ReportCenter: result.reportParams?.reportCode }),
      eventOperation: eEventOperation.print,
      remarks: result.reportParams?.whereConditions,
    });
  }, [dispatch, activeTabKey, isPrintTable, statisticCodeList, printParams, checkData]);

  const previewPDF = useCallback(async () => {
    await dispatch({
      type: 'reportCenterController/savePreviewModal',
      payload: { visible: true },
    });
    await dispatch({ type: 'reportCenterController/preViewReportPDF' });
  }, [dispatch]);

  return (
    <div className={styles.btnGroup}>
      {isResultCacheDuration ? (
        <>
          <div className={styles.generateButton}>
            {findStorage?.generating && (
              <div className={styles.tooltip}>
                <Tooltip
                  placement="rightTop"
                  title="Report is generating. Will send notification after it is ready for download."
                  visible={true}
                  getPopupContainer={(triggerNode) => triggerNode.parentNode.parentNode.parentNode}
                />
              </div>
            )}
            <Button type="primary" block onClick={searchFn} disabled={generateDisabled || hasError}>
              {formatMessageApi({ Label_BIZ_Claim: 'Generate' })}
            </Button>
          </div>
          <Button
            type="primary"
            block
            loading={printLoading}
            onClick={printFn}
            disabled={!findStorage?.hasQuertStorage}
          >
            {formatMessageApi({ Label_BPM_Button: 'Download' })}
          </Button>
        </>
      ) : (
        <>
          <Button type="primary" block onClick={searchFn} disabled={hasError}>
            {formatMessageApi({
              Label_BIZ_Claim: 'component.tableSearch.search',
            })}
          </Button>
          <Button block loading={printLoading} onClick={printFn}>
            {formatMessageApi({ Label_BPM_Button: 'Export' })}
          </Button>
        </>
      )}
      {reportListMap?.[activeTabKey]?.templateList
        ?.map((item: any) => toUpper(item?.templateType))
        .includes('PDF') && (
        <>
          <Button block loading={printReportPDFLoading} onClick={printPDFFn}>
            {formatMessageApi({ Label_BPM_Button: 'Export PDF' })}
          </Button>
          <Authorized authority={[ReportCenterEnum.RS_BP_GetApproalButton]} currentAuthority={list}>
            <Button block loading={previewPDFLoading} onClick={previewPDF}>
              {formatMessageApi({ Label_COM_ReportCenter: 'RequestApproval' })}
            </Button>
          </Authorized>
        </>
      )}
    </div>
  );
};

export default connect(({ reportCenterController, loading, authController }: any) => ({
  form: reportCenterController.form,
  activeTabKey: reportCenterController.activeTabKey,
  printLoading: loading.effects['reportCenterController/printReport'],
  printReportPDFLoading: loading.effects['reportCenterController/printReportPDF'],
  reportMetadata: reportCenterController.reportMetadata,
  searchDefault: reportCenterController.searchDefault,
  statisticCodeList: reportCenterController.statisticCodeList,
  isPrintTable: reportCenterController.isPrintTable,
  previewPDFLoading: loading.effects['reportCenterController/preViewReportPDF'],
  reportListMap: reportCenterController.reportListMap,
  commonAuthorityList: authController.commonAuthorityList,
  printParams: reportCenterController.printParams,
  findStorage: reportCenterController.findStorage,
}))(BtnGroup);

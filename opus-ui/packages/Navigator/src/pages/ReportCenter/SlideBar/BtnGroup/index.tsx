import React, { Component } from 'react';
import { connect } from 'dva';
import lodash, { toUpper } from 'lodash';
import { Button, notification, Modal } from 'antd';
import { formUtils } from 'basic/components/Form';
// import { getCurrentTabFieldsVal } from 'navigator/pages/ReportCenter/_utils/utils';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { tarckInquiryPoint, eEventOperation } from '@/components/TarckPoint';
import styles from './index.less';
import { ReportCenterEnum } from '@/enum/GolbalAuthority';
import Authorized from '@/utils/Authorized';
import moment from 'moment';

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
}
// @ts-ignore
@connect(({ reportCenterController, loading, authController }) => ({
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
}))
class BtnGroup extends Component<IProps> {
  checkData = (reportCode, params) => {
    console.log(reportCode, params);
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
  get hasError() {
    const { searchDefault, activeTabKey } = this.props;
    return formUtils.getErrorArray(searchDefault?.[activeTabKey])?.length !== 0;
  }
  searchFn = async () => {
    const { dispatch, form, activeTabKey: reportCode, reportMetadata } = this.props;
    const searchFieldList = reportMetadata?.[reportCode]?.searchFieldList;
    const dictionary = reportMetadata?.[reportCode]?.dictionary;
    const validateKey = lodash
      .chain(searchFieldList)
      .filter((el) => el.visible)
      .map((item: any) => item.fieldName)
      .value();
    form.validateFields(validateKey, { force: true }).then(async () => {
      const result = await dispatch({
        type: 'reportCenterController/getReport',
        payload: {
          manualRefresh: true,
        },
      });
      if (!result) {
        return;
      }
      if (result.response.resultData.total > 0) {
        const remarks = lodash.reduce(
          result.reportParams?.whereConditions,
          (result: any, item: any, key) => {
            result = [...result, { ...item }];
            if (lodash.indexOf(item.firstFieldValue, ',') !== -1) {
              result[key].firstFieldValue = lodash
                .chain(item.firstFieldValue)
                .split(',')
                .map((self: any) => {
                  return formatMessageApi({ [dictionary?.[item.fieldName]]: self });
                })
                .join(',')
                .value();
            } else {
              result[key].firstFieldValue = formatMessageApi({
                [dictionary?.[item.fieldName]]: item.firstFieldValue,
              });
            }
            return result;
          },
          []
        );
        tarckInquiryPoint(dispatch, {
          eventName:
            result.reportName ||
            formatMessageApi({ Label_COM_ReportCenter: result.reportParams?.reportCode }),
          eventOperation: eEventOperation.preView,
          remarks: remarks,
        });
      }
      dispatch({
        type: 'reportCenterController/batchSumUpStatistic',
      });
    });
  };

  resetFn = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'reportCenterController/reset',
    });
  };

  printFn = async () => {
    const { dispatch, isPrintTable, statisticCodeList, activeTabKey, printParams } = this.props;
    if (!isPrintTable && statisticCodeList.length === 0) {
      notification.error({
        message: formatMessageApi({ Label_COM_ErrorMessage: 'ERR_000299' }),
      });
      return;
    }
    // const currentTabFieldsVal = getCurrentTabFieldsVal(form, activeTabKey);
    // await dispatch({
    //   type: 'reportCenterController/print',
    //   payload: {
    //     reportId: activeTabKey,
    //     currentTabFieldsVal,
    //     type: 'print',
    //   },
    // });
    if (!this.checkData(activeTabKey, printParams)) {
      return;
    }
    const result = await dispatch({
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

  printPDFFn = async () => {
    const { dispatch, isPrintTable, statisticCodeList, activeTabKey, printParams } = this.props;
    if (!isPrintTable && statisticCodeList.length === 0) {
      notification.error({
        message: formatMessageApi({ Label_COM_ErrorMessage: 'ERR_000299' }),
      });
      return;
    }
    if (!this.checkData(activeTabKey, printParams)) {
      return;
    }

    const result = await dispatch({
      type: 'reportCenterController/printReportPDF',
    });
    tarckInquiryPoint(dispatch, {
      eventName:
        result.reportName ||
        formatMessageApi({ Label_COM_ReportCenter: result.reportParams?.reportCode }),
      eventOperation: eEventOperation.print,
      remarks: result.reportParams?.whereConditions,
    });
  };
  previewPDF = async () => {
    const { dispatch } = this.props;

    await dispatch({
      type: 'reportCenterController/savePreviewModal',
      payload: {
        visible: true,
      },
    });

    await dispatch({
      type: 'reportCenterController/preViewReportPDF',
    });
  };
  render() {
    const {
      printLoading,
      printReportPDFLoading,
      activeTabKey,
      previewPDFLoading,
      reportListMap,
      commonAuthorityList,
    } = this.props;

    const list = lodash
      .chain(commonAuthorityList)
      .filter((item) => item.result)
      .map((item) => item.authorityCode)
      .value();
    return (
      <div className={styles.btnGroup}>
        <Button type="primary" block onClick={this.searchFn} disabled={this.hasError}>
          {formatMessageApi({ Label_BIZ_Claim: 'component.tableSearch.search' })}
        </Button>
        <Button block loading={printLoading} onClick={this.printFn}>
          {formatMessageApi({ Label_BPM_Button: 'Export' })}
        </Button>
        {reportListMap?.[activeTabKey]?.templateList
          ?.map((item) => toUpper(item?.templateType))
          .includes('PDF') && (
          <>
            <Button block loading={printReportPDFLoading} onClick={this.printPDFFn}>
              {formatMessageApi({ Label_BPM_Button: 'Export PDF' })}
            </Button>
            <Authorized
              authority={[ReportCenterEnum.RS_BP_GetApproalButton]}
              currentAuthority={list}
            >
              <Button block loading={previewPDFLoading} onClick={this.previewPDF}>
                {formatMessageApi({ Label_COM_ReportCenter: 'RequestApproval' })}
              </Button>
            </Authorized>
          </>
        )}
      </div>
    );
  }
}

export default BtnGroup;

import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Table, Icon, Spin } from 'antd';
import lodash from 'lodash';
import ErrorTooltipManual from 'claim/components/ErrorTooltipManual';
import Columns from './Columns';
import OPDForm from '../OPDForm/OPDForm';
import { isScannedOrError } from '../utils';
import { InvoiceType } from '../Enum';
import styles from './index.less';

interface IProps {
  dispatch?: any;
  invoiceInforData: any[];
  invoiceInforTip: string;
  invoiceInforSelRows: any[];
  taskNotEditable: boolean;
  loading: boolean;
}

// @ts-ignore
@connect(({ IdentifyHospitalBatchController, claimEditable, loading }: any) => ({
  hospitalBillingType: IdentifyHospitalBatchController?.claimProcessData?.hospitalBillingType,
  Dropdown_CLM_SubClaimType_IPD: IdentifyHospitalBatchController?.claimProcessData?.Dropdown_CLM_SubClaimType_IPD,
  Dropdown_CLM_SubClaimType_OPD: IdentifyHospitalBatchController?.claimProcessData?.Dropdown_CLM_SubClaimType_OPD,
  invoiceInforData: IdentifyHospitalBatchController?.claimProcessData?.invoiceInforData,
  invoiceInforTip: IdentifyHospitalBatchController?.claimProcessData?.invoiceInforTip,
  invoiceInforSelRows: IdentifyHospitalBatchController?.claimProcessData?.invoiceInforSelRows,
  taskNotEditable: claimEditable.taskNotEditable,
  loading: loading.effects['IdentifyHospitalBatchController/getHospitalBillingByClaimNoData'],
}))
class InvoiceInformation extends PureComponent<IProps> {
  refreshInvoiceInfromation = () => {
    const { dispatch, taskDetail } = this.props;

    dispatch({
      type: 'IdentifyHospitalBatchController/refreshInformation',
      payload: {
        taskId: taskDetail?.taskId,
      },
    });
  };

  expandedRowRender = (record: any, idx: number) => {
    const { type, isShowMore, status, taskNotEditable } = record;
    return [InvoiceType.OPD, InvoiceType.IPD].includes(type) && isShowMore ? (
      // @ts-ignore
      <OPDForm
        idx={idx}
        isShowMore={isShowMore}
        disabled={!isScannedOrError(status) || taskNotEditable}
        type={type}
      />
    ) : null;
  };

  render() {
    const {
      invoiceInforData,
      invoiceInforTip,
      invoiceInforSelRows,
      taskNotEditable,
      loading,
    } = this.props;
    const rowSelection = {
      selectedRowKeys: lodash.map(invoiceInforSelRows, (item: any) => item.key),
      onChange: async (_: any, selRows: any[]) => {
        const { dispatch } = this.props;
        await dispatch({
          type: 'IdentifyHospitalBatchController/saveData',
          payload: {
            invoiceInforSelRows: selRows,
          },
        });
      },
      getCheckboxProps: () => ({
        disabled: taskNotEditable,
      }),
    };
    const expandedRowKeys = lodash.map(invoiceInforData, (item: any) => item.key);

    return (
      <Card
        title={
          <>
            Invoice Information
            {invoiceInforTip && invoiceInforTip !== '' ? (
              // @ts-ignore
              <ErrorTooltipManual manualErrorMessage={invoiceInforTip} />
            ) : null}
          </>
        }
        extra={
          <Icon
            type="sync"
            style={{ cursor: 'pointer' }}
            onClick={this.refreshInvoiceInfromation}
          />
        }
      >
        {!loading ? (
          <Table
            className={styles.invoiceInformationTable}
            rowSelection={rowSelection}
            scroll={{ x: 'max-content' }}
            // @ts-ignore
            columns={Columns(this.props)}
            expandedRowRender={this.expandedRowRender}
            expandedRowKeys={expandedRowKeys}
            // defaultExpandAllRows
            dataSource={invoiceInforData}
            pagination={false}
            loading={loading}
          />
        ) : (
          <div className={styles.loading}>
            <Spin />
          </div>
        )}
      </Card>
    );
  }
}

export default InvoiceInformation;

import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Table, Icon, Spin } from 'antd';
import lodash from 'lodash';
import ErrorTooltipManual from 'claim/components/ErrorTooltipManual';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import Columns from './Columns';
import OPDForm from '../OPDForm/OPDForm';
import { isScannedOrError } from '../utils';
import { InvoiceType } from '../Enum';
import styles from './index.less';
import ModalWarnMessage from '@/components/ModalWarnMessage';

interface IProps {
  dispatch?: any;
  invoiceInforData: any[];
  submitforTip: string;
  invoiceInforSelRows: any[];
  taskNotEditable: boolean;
  loading: boolean;
  taskDetail: any;
  showCleanInvoiceModal: boolean;
}

// @ts-ignore
@connect(({ IdentifyHospitalBatchController, claimEditable, loading }: any) => ({
  hospitalBillingType: IdentifyHospitalBatchController?.claimProcessData?.hospitalBillingType,
  invoiceInforData: IdentifyHospitalBatchController?.claimProcessData?.invoiceInforData,
  Dropdown_CLM_SubClaimType_IPD:
    IdentifyHospitalBatchController?.claimProcessData?.Dropdown_CLM_SubClaimType_IPD,
  Dropdown_CLM_SubClaimType_OPD:
    IdentifyHospitalBatchController?.claimProcessData?.Dropdown_CLM_SubClaimType_OPD,
  Dropdown_CLM_HospitalBOStatus:
    IdentifyHospitalBatchController?.claimProcessData?.Dropdown_CLM_HospitalBOStatus,
  submitforTip: IdentifyHospitalBatchController?.claimProcessData?.submitforTip,
  invoiceInforSelRows: IdentifyHospitalBatchController?.claimProcessData?.invoiceInforSelRows,
  taskNotEditable: claimEditable.taskNotEditable,
  currentPage: IdentifyHospitalBatchController?.currentPage,
  loading: loading.effects['IdentifyHospitalBatchController/getHospitalBillingByClaimNoData'],
  dictsOfDropdownCLMHospitalInvoiceStatus:
    IdentifyHospitalBatchController?.claimProcessData?.Dropdown_CLM_HospitalInvoiceStatus,
  showCleanInvoiceModal: IdentifyHospitalBatchController?.claimProcessData?.showCleanInvoiceModal,
}))
class InvoiceInformation extends PureComponent<IProps> {
  constructor(props: any) {
    super(props);
    this.state = {
      pageSize: 10,
      filteredValue: [],
    };
  }

  refreshInvoiceInfromation = () => {
    const { dispatch, taskDetail } = this.props;

    dispatch({
      type: 'IdentifyHospitalBatchController/refreshInformation',
      payload: {
        taskId: taskDetail?.taskId,
      },
    });
  };

  ondeleteSelRows = () => {
    const { dispatch, taskDetail } = this.props;

    dispatch({
      type: 'IdentifyHospitalBatchController/deleteSelRows',
      payload: {
        taskId: taskDetail?.taskId,
      },
    });
  };

  expandedRowRender = (record: any) => {
    const { invoiceInforData } = this.props;
    const { type, isShowMore, status, taskNotEditable, id } = record;
    const idx = lodash.findIndex(invoiceInforData, (item: any) => item?.id === id);

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

  handlefilter = async (checkedValues: any[]) => {
    const { invoiceInforSelRows, dispatch } = this.props;
    this.setState({
      filteredValue: checkedValues,
    });
    if (!lodash.isEmpty(checkedValues)) {
      const newinvoiceInforSelRows = lodash.filter(invoiceInforSelRows, (item) =>
        lodash.includes(checkedValues, item?.status)
      );
      dispatch({
        type: 'IdentifyHospitalBatchController/saveData',
        payload: {
          invoiceInforSelRows: newinvoiceInforSelRows,
        },
      });
    }
  };

  invoiceInformationCurrentPage = (page: any) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'IdentifyHospitalBatchController/saveCurrentPage',
      payload: {
        currentPage: page?.current,
      },
    });
  };

  showcleanModal = () => {
    const { dispatch } = this.props;

    dispatch({
      type: 'IdentifyHospitalBatchController/saveData',
      payload: {
        showCleanInvoiceModal: true,
      },
    });
  };

  cleanValidateDataErrors = (data: any[]) => {
    for (const key of Object.keys(data)) {
      if (data[key] && typeof data[key] === 'object') {
        Object.keys(data[key]).forEach((field) => {
          if (
            data[key][field] &&
            data[key][field].value === null &&
            data[key][field].errTip === 'Required!'
          ) {
            data[key][field] = null;
          }
        });
      }
    }
    return data;
  };

  cleanSelectedinvoiceInformation = (selectedRowKeys: any[]) => {
    const { invoiceInforData, dispatch } = this.props;

    const selectedinvoiceInfor = lodash.filter(invoiceInforData || [], (item: any) =>
      lodash.includes(selectedRowKeys, item.key)
    );

    const selectedinvoiceInformation = this.cleanValidateDataErrors(selectedinvoiceInfor);

    dispatch({
      type: 'IdentifyHospitalBatchController/cleanInformation',
      payload: {
        selectedinvoiceInformation: selectedinvoiceInformation,
      },
    });
  };

  onCancelModal = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'IdentifyHospitalBatchController/saveData',
      payload: {
        showCleanInvoiceModal: false,
      },
    });
  };

  onConfirmModal = async (selectedRowKeys: any[]) => {
    await this.cleanSelectedinvoiceInformation(selectedRowKeys);
    this.onCancelModal();
  };

  render() {
    const {
      invoiceInforData,
      submitforTip,
      invoiceInforSelRows,
      taskNotEditable,
      loading,
      dispatch,
      currentPage,
      showCleanInvoiceModal,
    } = this.props;
    const { pageSize, filteredValue }: any = this.state;
    const rowSelection = {
      selectedRowKeys: lodash.map(invoiceInforSelRows, (item: any) => item.key),
      onSelectAll: (selected: boolean) => {
        const selectInvoice = lodash.isEmpty(filteredValue)
          ? invoiceInforData
          : lodash.filter(invoiceInforData, (item) => lodash.includes(filteredValue, item?.status));
        dispatch({
          type: 'IdentifyHospitalBatchController/saveData',
          payload: {
            invoiceInforSelRows: selected ? selectInvoice : [],
          },
        });
      },
      onSelect: (record: any, selected: boolean, selectedRows: any) => {
        dispatch({
          type: 'IdentifyHospitalBatchController/saveData',
          payload: {
            invoiceInforSelRows: selectedRows,
          },
        });
      },
      hideDefaultSelections: true,
      selections: [
        {
          key: 'current-page-all-data',
          text: formatMessageApi({ Label_BIZ_Claim: 'Select Current Page' }),
          onSelect: (changeableRowKeys: any[]) => {
            const selectedRows = lodash.map(
              changeableRowKeys,
              (index) => invoiceInforData?.[index]
            );
            dispatch({
              type: 'IdentifyHospitalBatchController/saveData',
              payload: {
                invoiceInforSelRows: selectedRows,
              },
            });
          },
        },
      ],
      getCheckboxProps: (record: any) => ({
        disabled: record?.status === 'Processing' || taskNotEditable,
      }),
    };
    const expandedRowKeys = lodash.map(invoiceInforData, (item: any) => item.key);

    return (
      <>
        <Card
          title={
            <>
              Invoice Information
              {submitforTip && submitforTip !== '' ? (
                // @ts-ignore
                <ErrorTooltipManual manualErrorMessage={submitforTip} />
              ) : null}
            </>
          }
          extra={
            <>
              {/* <Icon
              type="scissor"
              style={{ cursor: 'pointer', paddingRight: '10px' }}
              onClick={this.ondeleteSelRows}
            /> */}
              {
                //  OWBBAUT-2082 暂时注释clean button，
              }
              {/* <Button size='small' style={{marginRight:'10px'}} onClick={this.showcleanModal}>
              Clean
            </Button> */}

              <Icon
                type="sync"
                style={{ cursor: 'pointer' }}
                onClick={this.refreshInvoiceInfromation}
              />
            </>
          }
        >
          {!loading ? (
            <Table
              className={styles.invoiceInformationTable}
              rowSelection={rowSelection}
              scroll={{ x: 'max-content' }}
              // @ts-ignore
              columns={Columns(this.props, this.handlefilter, filteredValue)}
              expandedRowRender={this.expandedRowRender}
              expandedRowKeys={expandedRowKeys}
              // defaultExpandAllRows
              dataSource={invoiceInforData}
              pagination={{
                pageSize,
                current: currentPage,
              }}
              onChange={this.invoiceInformationCurrentPage}
              loading={loading}
            />
          ) : (
            <div className={styles.loading}>
              <Spin />
            </div>
          )}
        </Card>
        {showCleanInvoiceModal && (
          <ModalWarnMessage
            visible={showCleanInvoiceModal}
            maskClosable={false}
            closable={false}
            onOk={() => this.onConfirmModal(rowSelection.selectedRowKeys)}
            onCancel={this.onCancelModal}
            labelId="app.navigator.task-detail-policy-information-warn.msg.title"
            modalDetailText="You want to clean the data for the selected row ."
          />
        )}
      </>
    );
  }
}

export default InvoiceInformation;

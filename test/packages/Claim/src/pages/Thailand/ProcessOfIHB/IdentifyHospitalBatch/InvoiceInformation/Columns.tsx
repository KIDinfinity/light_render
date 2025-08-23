import React from 'react';
import { Select, Input, Icon, DatePicker, InputNumber, Checkbox } from 'antd';
import lodash from 'lodash';
import moment from 'moment';
import integrationEcmControllerService from '@/services/integrationEcmControllerService';
import bpmProcessTaskService from '@/services/bpmProcessTaskService';
import { fnPrecisionFormat, fnPrecisionParser, precision } from '@/utils/precisionUtils';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { getDateFormat, formUtils } from 'basic/components/Form';
import windowOpenFn from '@/utils/windowOpenFn';
import { Dropdown_CLM_SubClaimType } from 'claim/enum/Dropdown_CLM_SubClaimType';
import ErrLabel from './ErrLabel';
import { isScannedOrError } from '../utils';
import { InvoiceStatus, InvoiceType, BOStatus } from '../Enum';

import styles from './styles.less';

const { Option } = Select;

const openImageFn = async (submissionId: string) => {
  // @ts-ignore
  const response = await integrationEcmControllerService.gengerateEcmUrl({
    submissionId,
  });
  windowOpenFn(response.resultData);
};

const disabledDate = (current: any) =>
  (current && current > moment().endOf('day')) ||
  !moment(current).isBetween('1900-01-01T00:00:00', moment().format(), 'day', '[]');

const saveInvoiceInforFn = async (ev: any, type: string, props: any, id: string) => {
  let val = ev;
  if (ev?.persist) {
    ev?.persist();
    val = lodash.trim(ev.target.value);
  }
  if (type === 'visitDate') {
    val = ev.format();
    val = moment(val).set({ hour: 0, minute: 0, second: 0 }).format();
  }
  const { dispatch, invoiceInforData, invoiceInforSelRows } = props;
  const idx = lodash.findIndex(invoiceInforData, (item: any) => item?.id === id);
  // 更新invoiceInforData
  const newInvoiceInforData = lodash.cloneDeep(invoiceInforData);
  if (type === 'type') {
    newInvoiceInforData[idx].subClaimType = '';
  }
  // 值不能为空，如果为空，显示错误提示
  // val += '';
  if (val || lodash.isNumber(val)) {
    newInvoiceInforData[idx][type] = val;
    if (type === 'identityNo') {
      newInvoiceInforData[idx].firstName = formUtils.queryValue(newInvoiceInforData[idx].firstName);
      newInvoiceInforData[idx].lastName = formUtils.queryValue(newInvoiceInforData[idx].lastName);
    }
  } else {
    newInvoiceInforData[idx][type] = {
      value: val,
      errTip: formatMessageApi({ Label_COM_WarningMessage: 'ERR_000001' }),
    };
  }
  // 更新选中invoiceInforData
  const newInvoiceInforSelRows = lodash.cloneDeep(invoiceInforSelRows);
  lodash.forEach(newInvoiceInforSelRows, (item: any, i: number) => {
    if (item.key === newInvoiceInforData[idx].key) {
      newInvoiceInforSelRows[i] = newInvoiceInforData[idx];
    }
  });
  // 如果修改的是之前没有选中的数据，一旦修改，默认选中
  if (
    !lodash.some(newInvoiceInforSelRows, (item: any) => item.key === newInvoiceInforData[idx].key)
  ) {
    newInvoiceInforSelRows.push(newInvoiceInforData[idx]);
  }
  await dispatch({
    type: 'IdentifyHospitalBatchController/saveData',
    payload: {
      invoiceInforData: newInvoiceInforData,
      invoiceInforSelRows: newInvoiceInforSelRows,
    },
  });
};

const handleClaimNoClick = async (record: any, isJump: boolean, props: any) => {
  const { claimNo, activityKey: taskDefKey } = record;

  if (lodash.isEmpty(claimNo) || !isJump) return;
  // @ts-ignore
  const response: any = await bpmProcessTaskService?.getCurrentTaskIdByBusinessNo(claimNo);

  const { dispatch } = props;
  const { success, resultData: taskId } = lodash.pick(response, ['success', 'resultData']);
  if (success && taskId) {
    dispatch({
      type: 'global/visitTaskDetail',
      payload: {
        blank: true,
        taskId,
        taskDefKey,
      },
    });
  }
};

const switchOPDDetailFormFn = async (props: any, id: any) => {
  const { dispatch, invoiceInforData } = props;
  const idx = lodash.findIndex(invoiceInforData, (item: any) => item?.id === id);
  const newInvoiceInforData = lodash.cloneDeep(invoiceInforData);
  newInvoiceInforData[idx].isShowMore = !newInvoiceInforData[idx].isShowMore;
  if (lodash.isEmpty(newInvoiceInforData[idx].registration)) {
    await dispatch({
      type: 'IdentifyHospitalBatchController/getInvoiceFormDetail',
      payload: {
        invoiceInforData: newInvoiceInforData,
        idx,
      },
    });
  }
  await dispatch({
    type: 'IdentifyHospitalBatchController/saveData',
    payload: {
      invoiceInforData: newInvoiceInforData,
    },
  });
};

const columns = (props: any, handlefilter: Function, filteredValue: any[]) => {
  const { taskNotEditable, dictsOfDropdownCLMHospitalInvoiceStatus } = props;

  return [
    {
      title: 'No.',
      dataIndex: 'no',
    },
    {
      title: 'Invoice No.',
      dataIndex: 'invoiceNo',
      render: (_: any, record: any) => {
        const { invoiceNo, status, id } = record;
        return (
          <ErrLabel errTip={lodash.get(invoiceNo, 'errTip', null)}>
            <Input
              value={formUtils.queryValue(invoiceNo)}
              style={{ width: 110 }}
              maxLength={15}
              disabled={!isScannedOrError(status) || taskNotEditable}
              onChange={(ev: any) => saveInvoiceInforFn(ev, 'invoiceNo', props, id)}
            />
          </ErrLabel>
        );
      },
    },
    {
      title: 'Claim No.',
      dataIndex: 'inquiryClaimNo',
      render: (_: any, record: any) => {
        const { inquiryClaimNo, claimNo, status } = record;
        const jumpStatus = [
          InvoiceStatus.NeedIdentify,
          InvoiceStatus.Assessment,
          InvoiceStatus.PendingAPS,
        ];
        const isJump = !!(claimNo && status && jumpStatus.includes(status));

        return inquiryClaimNo ? (
          <span
            className={styles.jumpLink}
            onClick={() => handleClaimNoClick(record, isJump, props)}
          >
            {inquiryClaimNo}
          </span>
        ) : null;
      },
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      render: (_: any, record: any) => {
        const { identityNo, firstName, status, id } = record;
        return (
          <ErrLabel
            errTip={formUtils.queryValue(identityNo) ? '' : lodash.get(firstName, 'errTip', null)}
          >
            <Input
              value={formUtils.queryValue(firstName)}
              style={{ width: 110 }}
              maxLength={30}
              disabled={!isScannedOrError(status) || taskNotEditable}
              onChange={(ev: any) => saveInvoiceInforFn(ev, 'firstName', props, id)}
            />
          </ErrLabel>
        );
      },
    },
    {
      title: 'Surname',
      dataIndex: 'lastName',
      render: (_: any, record: any) => {
        const { identityNo, lastName, status, id } = record;
        return (
          <ErrLabel
            errTip={formUtils.queryValue(identityNo) ? '' : lodash.get(lastName, 'errTip', null)}
          >
            <Input
              value={formUtils.queryValue(lastName)}
              style={{ width: 110 }}
              maxLength={30}
              disabled={!isScannedOrError(status) || taskNotEditable}
              onChange={(ev: any) => saveInvoiceInforFn(ev, 'lastName', props, id)}
            />
          </ErrLabel>
        );
      },
    },
    {
      title: 'Visit Date',
      dataIndex: 'visitDate',
      render: (_: any, record: any) => {
        const { visitDate, status, id } = record;
        return (
          <ErrLabel errTip={lodash.get(visitDate, 'errTip', null)}>
            <DatePicker
              value={
                formUtils.queryValue(visitDate) ? moment(formUtils.queryValue(visitDate)) : null
              }
              style={{ width: 130 }}
              format={getDateFormat('L')}
              allowClear={false}
              disabledDate={disabledDate}
              placeholder=""
              disabled={!isScannedOrError(status) || taskNotEditable}
              onChange={(ev: any) => {
                saveInvoiceInforFn(ev, 'visitDate', props, id);
              }}
            />
          </ErrLabel>
        );
      },
    },
    {
      title: 'ID/Passport No.',
      dataIndex: 'identityNo',
      render: (_: any, record: any) => {
        const { identityNo, status, id } = record;
        return (
          <Input
            value={formUtils.queryValue(identityNo)}
            style={{ width: 110 }}
            maxLength={20}
            disabled={!isScannedOrError(status) || taskNotEditable}
            onChange={(ev: any) => saveInvoiceInforFn(ev, 'identityNo', props, id)}
          />
        );
      },
    },
    {
      title: 'Type',
      dataIndex: 'type',
      render: (_: any, record: any) => {
        const { type, status, id } = record;
        const filterHospitallBilling = lodash.filter(
          props.hospitalBillingType,
          (item) => item.dictCode !== InvoiceType.GEB
        );
        return (
          <Select
            value={formUtils.queryValue(type)}
            style={{ width: 80 }}
            disabled={!isScannedOrError(status) || taskNotEditable}
            onChange={(val: string) => saveInvoiceInforFn(val, 'type', props, id)}
          >
            {lodash.map(filterHospitallBilling, (item: any, idx: number) => (
              <Option value={item.dictCode} key={idx}>
                {item.dictName}
              </Option>
            ))}
          </Select>
        );
      },
    },
    {
      title: formatMessageApi({ Label_BIZ_Claim: 'subClaimType' }),
      dataIndex: 'subClaimType',
      render: (_: any, record: any, index: number) => {
        const { subClaimType, type, status, id } = record;
        return (
          <Select
            value={formUtils.queryValue(subClaimType)}
            style={{ width: 120 }}
            disabled={!isScannedOrError(status) || taskNotEditable}
            onChange={(val: string) => saveInvoiceInforFn(val, 'subClaimType', props, id)}
          >
            {lodash.map(
              props?.[Dropdown_CLM_SubClaimType[type]] || [],
              (item: any, idx: number) => (
                <Option value={item.dictCode} key={idx}>
                  {item.dictName}
                </Option>
              )
            )}
          </Select>
        );
      },
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      render: (_: any, record: any) => {
        const { amount, status, id } = record;
        return (
          <ErrLabel errTip={lodash.get(amount, 'errTip', null)}>
            {/**
            //@ts-ignore */}
            <InputNumber
              value={formUtils.queryValue(amount)}
              style={{ width: 130 }}
              disabled={!isScannedOrError(status) || taskNotEditable}
              formatter={fnPrecisionFormat}
              parser={fnPrecisionParser}
              precision={precision}
              min={0}
              max={999999999.99}
              onChange={(val: string) => saveInvoiceInforFn(val, 'amount', props, id)}
            />
          </ErrLabel>
        );
      },
    },
    {
      title: 'Final Amount',
      dataIndex: 'finalAmount',
      render: (text: number) => {
        let textFormat = text;
        if (text) {
          // @ts-ignore
          textFormat = fnPrecisionFormat(fnPrecisionParser(text.toFixed(2)));
        }
        return textFormat;
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      filters: lodash.map(dictsOfDropdownCLMHospitalInvoiceStatus, (item) => ({
        text: item?.dictName,
        value: item?.dictCode,
      })),
      filteredValue,
      filterDropdown: (props) => {
        const { filters } = props;
        return (
          <Checkbox.Group onChange={handlefilter} value={filteredValue}>
            {lodash.map(filters, (item) => (
              <div className={styles.filterMenu} key={item?.value}>
                <Checkbox value={item?.value}>{item?.text}</Checkbox>
              </div>
            ))}
          </Checkbox.Group>
        );
      },
      onFilter: (value: any, record: any) =>
        record?.status === value || record?.status?.value === value,
      render: (_: any, record: any) => {
        const { status } = record;
        return (
          <ErrLabel errTip={lodash.get(status, 'errTip', null)}>
            <Input
              // @ts-ignore
              bordered="false"
              style={{ width: 110 }}
              value={formatMessageApi({
                Dropdown_CLM_HospitalInvoiceStatus: formUtils.queryValue(status),
              })}
              disabled
            />
          </ErrLabel>
        );
      },
    },
    {
      title: formatMessageApi({ Label_BIZ_Claim: 'BOStatus' }),
      dataIndex: 'boStatus',
      render: (_: any, record: any) => {
        const { id, status, boStatus } = record;
        const editable =
          [InvoiceStatus.Paid, InvoiceStatus.Cancelled, InvoiceStatus.Rejected].includes(status) &&
          boStatus === BOStatus.BOFail;
        return (
          <Select
            value={formUtils.queryValue(boStatus)}
            style={{ width: 120 }}
            disabled={taskNotEditable || !editable}
            onChange={(val: string) => saveInvoiceInforFn(val, 'boStatus', props, id)}
          >
            {lodash
              .chain(props?.Dropdown_CLM_HospitalBOStatus || [])
              .filter((item) => {
                if (editable && boStatus === BOStatus.BOFail) {
                  return item.dictCode === BOStatus.BOFail || item.dictCode === BOStatus.BOSkip;
                }
                if (editable && lodash.isEmpty(boStatus)) {
                  return item.dictCode === BOStatus.BOSkip;
                }
                return true;
              })
              .map((item: any) => (
                <Option
                  value={item.dictCode}
                  key={item.dictCode}
                  disabled={editable && item.dictCode === BOStatus.BOFail}
                >
                  {item.dictName}
                </Option>
              ))
              .value()}
          </Select>
        );
      },
    },
    {
      title: 'Image',
      dataIndex: 'submissionId',
      align: 'center',
      render: (text: string) => (
        <Icon className="btn-image" type="camera" onClick={() => openImageFn(text)} />
      ),
    },
    {
      title: 'More',
      dataIndex: 'isShowMore',
      align: 'center',
      render: (_: any, record: any) => {
        const { type, isShowMore, id } = record;
        console.log('type', type);
        const renderDom = [InvoiceType.OPD, InvoiceType.IPD].includes(type) ? (
          <div onClick={() => switchOPDDetailFormFn(props, id)}>
            {isShowMore ? (
              <Icon className="btn-more" type="caret-up" />
            ) : (
              <Icon className="btn-more" type="caret-down" />
            )}
          </div>
        ) : null;
        return renderDom;
      },
    },
  ];
};

export default columns;

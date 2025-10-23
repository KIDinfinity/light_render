import React from 'react';
import { Select, Input, Icon, DatePicker, InputNumber } from 'antd';
import lodash from 'lodash';
import moment from 'moment';
import integrationEcmControllerService from '@/services/integrationEcmControllerService';
import bpmProcessTaskService from '@/services/bpmProcessTaskService';
import { fnPrecisionFormat, fnPrecisionParser, precision } from '@/utils/precisionUtils';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';
import windowOpenFn from '@/utils/windowOpenFn';
import { Dropdown_CLM_SubClaimType } from 'claim/enum/Dropdown_CLM_SubClaimType';
import ErrLabel from './ErrLabel';
import { isScannedOrError } from '../utils';
import { InvoiceStatus, InvoiceType } from '../Enum';

import styles from './styles.less';

const { Option } = Select;

const openImageFn = async (submissionId: string) => {
  // @ts-ignore
  const response = await integrationEcmControllerService.gengerateEcmUrl({
    submissionId,
  });
  windowOpenFn(response.resultData);
};

const disabledDate = (current: any) => current && current > moment().endOf('day');

const saveInvoiceInforFn = async (ev: any, idx: number, type: string, props: any) => {
  let val = ev;
  if (ev?.persist) {
    ev?.persist();
    val = ev.target.value;
  }
  if (type === 'visitDate') {
    val = ev.format();
    val = moment(val).set({ hour: 0, minute: 0, second: 0 }).format();
  }
  const { dispatch, invoiceInforData, invoiceInforSelRows } = props;
  // 更新invoiceInforData
  const newInvoiceInforData = lodash.cloneDeep(invoiceInforData);
  if (type === 'type') {
    newInvoiceInforData[idx].subClaimType = '';
  }
  // 值不能为空，如果为空，显示错误提示
  // val += '';
  if (val || lodash.isNumber(val)) {
    newInvoiceInforData[idx][type] = val;
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

const switchOPDDetailFormFn = async (idx: number, props: any) => {
  if (props?.taskNotEditable) return;
  const { dispatch, invoiceInforData } = props;
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

const columns = (props: any) => {
  const { taskNotEditable } = props;

  return [
    {
      title: 'No.',
      dataIndex: 'no',
    },
    {
      title: 'Invoice No.',
      dataIndex: 'invoiceNo',
      render: (_: any, record: any, index: number) => {
        const { invoiceNo, status } = record;
        return (
          <ErrLabel errTip={lodash.get(invoiceNo, 'errTip', null)}>
            <Input
              value={formUtils.queryValue(invoiceNo)}
              style={{ width: 110 }}
              maxLength={15}
              disabled={!isScannedOrError(status) || taskNotEditable}
              onChange={(ev: any) => saveInvoiceInforFn(ev, index, 'invoiceNo', props)}
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
      render: (_: any, record: any, index: number) => {
        const { identityNo, firstName, status } = record;
        return (
          <ErrLabel
            errTip={formUtils.queryValue(identityNo) ? '' : lodash.get(firstName, 'errTip', null)}
          >
            <Input
              value={formUtils.queryValue(firstName)}
              style={{ width: 110 }}
              maxLength={30}
              disabled={!isScannedOrError(status) || taskNotEditable}
              onChange={(ev: any) => saveInvoiceInforFn(ev, index, 'firstName', props)}
            />
          </ErrLabel>
        );
      },
    },
    {
      title: 'Surname',
      dataIndex: 'lastName',
      render: (_: any, record: any, index: number) => {
        const { identityNo, lastName, status } = record;
        return (
          <ErrLabel
            errTip={formUtils.queryValue(identityNo) ? '' : lodash.get(lastName, 'errTip', null)}
          >
            <Input
              value={formUtils.queryValue(lastName)}
              style={{ width: 110 }}
              maxLength={30}
              disabled={!isScannedOrError(status) || taskNotEditable}
              onChange={(ev: any) => saveInvoiceInforFn(ev, index, 'lastName', props)}
            />
          </ErrLabel>
        );
      },
    },
    {
      title: 'Visit Date',
      dataIndex: 'visitDate',
      render: (_: any, record: any, index: number) => {
        const { visitDate, status } = record;
        return (
          <ErrLabel errTip={lodash.get(visitDate, 'errTip', null)}>
            <DatePicker
              value={
                formUtils.queryValue(visitDate) ? moment(formUtils.queryValue(visitDate)) : null
              }
              style={{ width: 130 }}
              format="L"
              allowClear={false}
              disabledDate={disabledDate}
              placeholder=""
              disabled={!isScannedOrError(status) || taskNotEditable}
              onChange={(ev: any) => {
                saveInvoiceInforFn(ev, index, 'visitDate', props);
              }}
            />
          </ErrLabel>
        );
      },
    },
    {
      title: 'ID/Passport No.',
      dataIndex: 'identityNo',
      render: (_: any, record: any, index: number) => {
        const { identityNo, status } = record;
        return (
          <Input
            value={formUtils.queryValue(identityNo)}
            style={{ width: 110 }}
            maxLength={20}
            disabled={!isScannedOrError(status) || taskNotEditable}
            onChange={(ev: any) => saveInvoiceInforFn(ev, index, 'identityNo', props)}
          />
        );
      },
    },
    {
      title: 'Type',
      dataIndex: 'type',
      render: (_: any, record: any, index: number) => {
        const { type, status } = record;
        const filterHospitallBilling = lodash.filter(
          props.hospitalBillingType,
          (item) => item.dictCode !== InvoiceType.GEB
        );
        return (
          <Select
            value={formUtils.queryValue(type)}
            style={{ width: 80 }}
            disabled={!isScannedOrError(status) || taskNotEditable}
            onChange={(val: string) => saveInvoiceInforFn(val, index, 'type', props)}
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
        const { subClaimType, type, status } = record;
        return (
          <Select
            value={formUtils.queryValue(subClaimType)}
            style={{ width: 120 }}
            disabled={!isScannedOrError(status) || taskNotEditable}
            onChange={(val: string) => saveInvoiceInforFn(val, index, 'subClaimType', props)}
          >
            {lodash.map(props?.[Dropdown_CLM_SubClaimType[type]] || [], (item: any, idx: number) => (
              <Option value={item.dictCode} key={idx}>
                {item.dictName}
              </Option>
            ))}
          </Select>
        );
      },
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      render: (_: any, record: any, index: number) => {
        const { amount, status } = record;
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
              onChange={(val: string) => saveInvoiceInforFn(val, index, 'amount', props)}
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
      render: (_: any, record: any, index: number) => {
        const { type, isShowMore } = record;
        const renderDom = [InvoiceType.OPD, InvoiceType.IPD].includes(type) ? (
          <div onClick={() => switchOPDDetailFormFn(index, props)}>
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

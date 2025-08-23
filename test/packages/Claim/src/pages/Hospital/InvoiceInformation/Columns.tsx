import React from 'react';
import { Icon } from 'antd';
import lodash from 'lodash';
import moment from 'moment';
import integrationEcmControllerService from '@/services/integrationEcmControllerService';
import windowOpenFn from '@/utils/windowOpenFn';
import { numberPrecisionFn } from '../utils';

const openImageFn = async (submissionId: string) => {
  const response = await integrationEcmControllerService.gengerateEcmUrl({
    submissionId,
  });
  windowOpenFn(response.resultData);
};

const columns = (props: any) => {
  const switchOPDDetailFormFn = async (idx: number) => {
    const { dispatch, invoiceInforData } = props;
    const newInvoiceInforData = lodash.cloneDeep(invoiceInforData);
    newInvoiceInforData[idx].isShowMore = !newInvoiceInforData[idx].isShowMore;
    await dispatch({
      type: 'hospitalDetailController/saveData',
      payload: {
        invoiceInforData: newInvoiceInforData,
      },
    });
  };
  return [
    {
      title: 'No.',
      dataIndex: 'no',
    },
    {
      title: 'Invoice No.',
      dataIndex: 'invoiceNo',
    },
    {
      title: 'Claim No.',
      dataIndex: 'inquiryClaimNo',
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
    },
    {
      title: 'Surname',
      dataIndex: 'lastName',
    },
    {
      title: 'Visit Date',
      dataIndex: 'visitDate',
      render: (text: string) => moment(text).format('L'),
    },
    {
      title: 'Scan Date',
      dataIndex: 'scanDate',
      render: (text: string) => moment(text).format('L'),
    },
    {
      title: 'Type',
      dataIndex: 'type',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      render: (text: number) => numberPrecisionFn(text),
    },
    {
      title: 'Final Amount',
      dataIndex: 'finalAmount',
      render: (text: number) => numberPrecisionFn(text),
    },
    {
      title: 'Status',
      dataIndex: 'status',
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
        const renderDom =
          type === 'OPD' ? (
            <div onClick={() => switchOPDDetailFormFn(index)}>
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

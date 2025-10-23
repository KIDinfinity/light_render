import React from 'react';
import moment from 'moment';
import lodash, { toUpper, get } from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { filterConfig } from '@/utils/configUtil';
import Label from '@/components/Label/LabelIcon';
import { sorts } from '../TitleMap';

export default (orders: any, config: any, saveSort: any) => {
  // const { handleScale } = resizeWindowHook();

  const width = 130;
  const params = [
    {
      fieldName: 'businessNo',
      title: formatMessageApi({ Label_COM_General: 'BusinessNo' }),
      dataIndex: 'businessNo',
      key: 'businessNo',
      sorter: true,
      defaultSortOrder: orders?.businessNo?.sortOrder,
      width: width * 1.2,
      render: (text: any, item: any) => item?.inquiryBusinessNo || '-',
    },
    {
      fieldName: 'caseNo',
      title: formatMessageApi({
        Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.case-no',
      }),
      dataIndex: 'caseNo',
      key: 'caseNo',
      sorter: true,
      defaultSortOrder: orders?.caseNo?.sortOrder,
      width,
      render: (text: any, item: any) => lodash.get(item, 'caseNo'),
    },
    {
      fieldName: 'caseCategory',
      title: formatMessageApi({
        Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.case-category',
      }),
      dataIndex: 'caseCategory',
      width: width * 1.3,
      render: (text: any, item: any) =>
        formatMessageApi({ Label_BPM_CaseCategory: get(item, 'caseCategory') }) || text || '-',
    },
    {
      fieldName: 'policyNo',
      title: formatMessageApi({
        Label_BIZ_Policy: 'PolicyNo',
      }),
      dataIndex: 'policyNo',
      key: 'policyNo',
      sorter: true,
      width,
      defaultSortOrder: orders?.policyNo?.sortOrder,
      render: (text: any, item: any) => lodash.get(item, 'policyNo') || '-',
    },
    {
      fieldName: 'policyOwner',
      title: formatMessageApi({
        Label_BIZ_Individual: 'PolicyOwner',
      }),
      dataIndex: 'policyOwner',
      key: 'policyOwner',
      sorter: true,
      width,
      defaultSortOrder: orders?.policyOwner?.sortOrder,
      render: (text: any, item: any) => lodash.get(item, 'policyOwner') || '-',
    },
    {
      fieldName: 'insuredName',
      title: formatMessageApi({
        Label_BIZ_Individual: 'InsuredName',
      }),
      dataIndex: 'clientName',
      width,
      render: (text: any, item: any) => lodash.get(item, 'clientName') || '-',
    },
    {
      fieldName: 'transactionType',
      title: formatMessageApi({
        Label_BIZ_SRV: 'TransactionType',
      }),
      dataIndex: 'businessTypeCode',
      width: width * 1.5,
      render: (text: any, item: any) =>
        formatMessageApi({ Dropdown_COM_BusinessType: get(item, 'businessTypeCode') }) || '-',
    },
    {
      fieldName: 'businessDecision',
      title: formatMessageApi({
        Label_BIZ_SRV: 'Decision',
      }),
      dataIndex: 'businessDecision',
      width: width * 1.5,
      render: (text: any, item: any) =>
        formatMessageApi({ Dropdown_COM_BusinessDecision: get(item, 'businessDecision') }) || '-',
    },
    {
      fieldName: 'submissionDate',
      title: formatMessageApi({
        Label_COM_Registration: 'SubmissionDate',
      }),
      key: 'submissionDate',
      dataIndex: 'submissionDate',
      defaultSortOrder: orders?.submissionDate?.sortOrder,
      width: width * 1.2,
      render: (text: any, item: any) => {
        const submissionDate = item?.submissionDate;
        return submissionDate ? moment(submissionDate).format('L') : '-';
      },
    },
    {
      fieldName: 'submissionChannel',
      title: formatMessageApi({ Label_COM_Registration: 'SubmissionChannel' }),
      dataIndex: 'submissionChannel',
      width: width * 1.4,
      render: (text: any, item: any) =>
        formatMessageApi({ Dropdown_COM_SubmissionChannel: get(item, 'submissionChannel') }) || '-',
    },
    {
      fieldName: 'caseCompleteDate',
      title: formatMessageApi({ Label_COM_Inquiry: 'CaseCompleteDate' }),
      dataIndex: 'caseCompleteDate',
      width: width * 1.5,
      render: (text: any, item: any) => {
        const caseCompleteDate = item?.caseCompleteDate;
        return caseCompleteDate ? moment(caseCompleteDate).format('L') : '-';
      },
    },
    {
      fieldName: 'FinalStatus',
      title: formatMessageApi({
        Label_COM_Inquiry: 'FinalStatus',
      }),
      dataIndex: 'finalStatus',
      width: 120,
      render: (text: any, item: any) =>
        formatMessageApi({ Dropdown_CAS_FinalStatus: get(item, 'finalStatus') }) || text || '-',
    },
  ];

  const columns = filterConfig(config, params);

  return lodash.map(columns, (el: any, index: number) => {
    const tempParams: any = params.find(
      (ele: any) => toUpper(ele.fieldName) === toUpper(el.fieldName)
    );
    let sortOrder = tempParams?.defaultSortOrder || orders?.[tempParams.dataIndex]?.sortOrder;
    if (tempParams?.dataIndex === saveSort.sortName) {
      sortOrder = sorts[saveSort.sortOrder];
    }
    return {
      title: tempParams.title,
      dataIndex: tempParams.dataIndex,
      key: tempParams.key || tempParams.dataIndex,
      sorter: el.sortable,
      sortOrder,
      render:
        index === 0
          ? (text, rendertItem, all) => (
              <Label
                item={rendertItem}
                render={tempParams?.render.bind(null, text, rendertItem, all)}
              />
            )
          : tempParams?.render,
      width: tempParams.width,
    };
  });
};

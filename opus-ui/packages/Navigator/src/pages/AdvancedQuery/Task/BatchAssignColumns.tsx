import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import lodash, { toUpper } from 'lodash';
import { getRemainingTimeStr, getMinFromRemainingTime } from '@/utils/utils';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import Ellipsis from '@/components/Ellipsis';
import TableTitle from 'navigator/pages/Home/Watching/View/TableTitle';
import { tenant } from '@/components/Tenant';

const { isNaN } = Number;

interface IProps {
  orders: any;
  config: any;
  filterParams: Object;
  filterObj: Object;
  handleTitleChange: Function;
}

export default ({
  orders,
  config,
  filterParams,
  filterObj,
  handleTitleChange,
  handleHeaderCell,
}) => {
  const width = 130;
  const params = [
    {
      fieldName: 'Submission Date',
      labelTypeCode: 'Label_BIZ_Claim',
      id: 'app.navigator.task-detail-of-jpcr.label.submission-date',
      dataIndex: 'submissionDate',
      key: 'submissionDate',
      sorter: true,
      sortable: true,
      defaultSortOrder: orders?.submissionDate?.sortOrder,
      width: width * 1.5,
      order: 1,
      render: (text: any, item: any) => (text && moment(text).format('L LT')) || '-',
    },
    {
      fieldName: 'Claim No',
      labelTypeCode: 'Label_COM_General',
      id: 'BusinessNo',
      dataIndex: 'businessNo',
      defaultSortOrder: orders?.businessNo?.sortOrder,
      width: width * 1.2,
      order: 2,
      render: (text: any, item: any) => text,
    },
    {
      fieldName: 'Case No',
      labelTypeCode: 'Label_BIZ_Claim',
      id: 'app.navigator.task-detail-of-data-capture.label.case-no',
      dataIndex: 'caseNo',
      key: 'caseNo',
      sorter: true,
      defaultSortOrder: orders?.proc_inst_id?.sortOrder,
      width,
      order: 3,
      render: (text: any, item: any) => lodash.get(item, 'caseNo'),
    },
    {
      fieldName: 'Business Type', // configuration match
      labelTypeCode: 'Label_BIZ_Claim',
      id: 'BusinessType',
      dataIndex: 'businessType',
      defaultSortOrder: lodash.get(orders, 'businessType.sortOrder'),
      width,
      hidden: tenant.isMY() ? true : false,
      order: 4,
      render: (text: any) => {
        let viewText;
        if (lodash.isString(text)) {
          const textArr = lodash.split(text, ',');
          viewText = lodash.map(textArr, (item: string, idx: number) => {
            const i18nItem = formatMessageApi({ Dropdown_COM_BusinessType: item });
            if (idx === textArr.length - 1) {
              return i18nItem;
            }
            return `${i18nItem}, `;
          });
        } else {
          viewText = '-';
        }
        return viewText;
      },
    },
    {
      fieldName: 'Submission Channel', // configuration match
      labelTypeCode: 'Label_BIZ_Claim',
      id: 'SubmissionChannel',
      dataIndex: 'submissionChannel',
      defaultSortOrder: lodash.get(orders, 'submissionChannel.sortOrder'),
      width,
      order: 5,
      render: (text: any) =>
        text ? formatMessageApi({ Dropdown_COM_SubmissionChannel: text }) : '-',
    },
    {
      fieldName: 'Case Category',
      labelTypeCode: 'Label_BIZ_Claim',
      id: 'app.navigator.task-detail-of-data-capture.label.case-category',
      dataIndex: 'caseCategory',
      width: width * 1.5,
      order: 6,
      render: (text: any, item: any) =>
        formatMessageApi({ Label_BPM_CaseCategory: lodash.get(item, 'caseCategory') }) ||
        text ||
        '-',
    },
    {
      fieldName: 'Activity',
      labelTypeCode: 'Label_BIZ_Claim',
      id: 'app.navigator.taskDetail.inquireForm.label.activity-name',
      dataIndex: 'activityName',
      width: width * 1.5,
      order: 7,
      render: (text: any, item: any) => text,
    },
    {
      fieldName: 'Status',
      labelTypeCode: 'Label_BIZ_Claim',
      id: 'app.usermanagement.basicInfo.avatar.status',
      dataIndex: 'taskStatus',
      width: width * 0.8,
      order: 8,
      render: (text: any, item: any) =>
        formatMessageApi({ Label_BPM_TaskActivity: lodash.get(item, 'taskStatus') }) || text || '-',
    },
    {
      fieldName: 'Assignee',
      labelTypeCode: 'Label_BIZ_Claim',
      id: 'app.navigator.taskDetail.inquireForm.label.assignee',
      dataIndex: 'taskOwner',
      width: width * 1.2,
      order: 9,
      render: (text: any, item: any) => lodash.get(item, 'assigneeName') || lodash.get(item, 'assignee')||'-',
    },
    {
      fieldName: 'Due Date',
      labelTypeCode: 'Label_BIZ_Claim',
      id: 'app.navigator.taskDetail.inquireForm.label.completed-time',
      dataIndex: 'dueDate',
      key: 'dueDate',
      sorter: true,
      defaultSortOrder: orders?.due_date?.sortOrder,
      width,
      order: 10,
      render: (text: any, item: any) => {
        return lodash.isNil(item?.dueDate) ? '-' : moment(item?.dueDate).format('L');
      },
    },
    {
      fieldName: 'Remaining Time', // configuration match
      width: width * 2,
      labelTypeCode: 'Label_BIZ_Claim',
      id: 'app.navigator.taskDetail.inquireForm.label.remaining-time',
      dataIndex: 'taskRemainingTime',
      defaultSortOrder: lodash.get(orders, 'taskRemainingTime.sortOrder'),
      order: 11,
      render: (text: number, item: any) => {
        const remainingTime = getMinFromRemainingTime({
          taskRemainingTime: item.taskRemainingTime,
          caseRemainingTime: item.caseRemainingTime,
        });
        const Color = styled.span`
          color: 'rgba(255, 255, 255, 0.65)';
        `;

        return <Color>{getRemainingTimeStr(remainingTime, item?.slaUnit)}</Color>;
      },
    },
    {
      fieldName: 'Insured Name',
      labelTypeCode: 'Label_BIZ_Claim',
      id: 'ClientName',
      dataIndex: 'insured',
      key: 'insured',
      width,
      order: 12,
      render: (text: any) => text || '-',
    },
    {
      fieldName: 'Policy No',
      labelTypeCode: 'Label_BIZ_Claim',
      id: 'app.navigator.task-detail-of-claim-assessment.beneficiary.label.policy-no',
      dataIndex: 'policyNo',
      key: 'policyNo',
      sorter: true,
      width: width * 1.6,
      defaultSortOrder: orders?.policyNo?.sortOrder,
      order: tenant.isMY() ? 0 : 13,
      render: (text: any, item: any) => {
        return (
          <Ellipsis lines={3} tooltip forceTooltip>
            {lodash.get(item, 'policyNo') || '-'}
          </Ellipsis>
        );
      },
    },
  ];

  const columns = lodash
    .chain(params)
    .unionBy('fieldName')
    .filter((item) => !item?.hidden)
    .sortBy('order')
    .value();

  return lodash.map(columns, (el: any) => {
    const tempParams =
      params.find((ele: any) => toUpper(ele.fieldName) === toUpper(el.fieldName)) || {};
    const sorter = Object.keys(filterObj).includes(tempParams.dataIndex) ? false : el.sortable;
    return {
      title:
        !!filterObj[tempParams.dataIndex] && lodash.isArray(filterObj[tempParams.dataIndex]) ? (
          <TableTitle
            title={formatMessageApi({ [tempParams?.labelTypeCode]: tempParams?.id })}
            list={filterObj[tempParams.dataIndex]}
            value={filterParams[tempParams?.dataIndex]}
            paramsKey={tempParams.dataIndex}
            handleChange={handleTitleChange}
            getPopupContainer={(triggerNode) => {
              return triggerNode?.parentNode?.parentNode?.parentNode?.parentNode;
            }}
            isMultiple
            multipleBlackList={['caseCategory']}
          />
        ) : (
          formatMessageApi({ [tempParams?.labelTypeCode]: tempParams?.id })
        ),
      dataIndex: tempParams?.dataIndex,
      key: tempParams?.key || tempParams?.dataIndex,
      sorter,
      defaultSortOrder: tempParams?.defaultSortOrder,
      render: tempParams?.render,
      width: tempParams?.width,
      className: tempParams?.className,
      onHeaderCell: (column: any) =>
        sorter
          ? {
              onClick: (e: any) => handleHeaderCell(column, e), // 点击表头行
            }
          : {},
    };
  });
};

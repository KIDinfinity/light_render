import React from 'react';
import styled from 'styled-components';
import lodash from 'lodash';
import moment from 'moment';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { getEffectiveTime, getRemainingTimeStr, getMinFromRemainingTime } from '@/utils/utils';
import Ellipsis from '@/components/Ellipsis';

import TableTitle from '../TableTitle';
import Label from '@/components/Label/LabelIcon';
import styles from './Table.less';

const { isNaN } = Number;

interface IProps {
  orders: any;
  resultField: any;
  filterParams: Object;
  filterObj: Object;
  handleTitleChange: Function;
}

export default ({ orders, resultField, filterParams, filterObj, handleTitleChange }: IProps) => {
  const width = 100;
  const columns = [
    {
      fieldName: 'Claim No', // configuration match
      width: width * 1.3,
      title: formatMessageApi({ Label_BIZ_Claim: 'BusinessNo' }),
      dataIndex: 'inquiryBusinessNo',
      defaultSortOrder: lodash.get(orders, 'inquiryBusinessNo.sortOrder'),
      className: styles.haveFlag,
      render: (text: any, item: any) => {
        return item?.inquiryBusinessNo || item?.inquiryClaimNo || item?.businessNo || '-';
      },
    },
    {
      fieldName: 'Agent Channel', // configuration match
      width: width * 1.3,
      title: formatMessageApi({ Label_BIZ_Policy: 'DistributionChannel' }),
      dataIndex: 'agentChannel',
      defaultSortOrder: lodash.get(orders, 'agentChannel.sortOrder'),
      render: (text: any, item: any) => (
        <Ellipsis tooltip lines={1}>
          {formatMessageApi({
            Dropdown_POL_DistributionChannel: lodash.get(item, 'agentChannel'),
          }) ||
            text ||
            '-'}
        </Ellipsis>
      ),
    },
    {
      fieldName: 'Business Type', // configuration match
      width: width,
      title: formatMessageApi({ Label_BIZ_Claim: 'BusinessType' }),
      dataIndex: 'businessType',
      defaultSortOrder: lodash.get(orders, 'businessType.sortOrder'),
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
      fieldName: 'Policy No',
      title: formatMessageApi({
        Label_BIZ_Claim:
          'app.navigator.task-detail-of-claim-assessment.beneficiary.label.policy-no',
      }),
      dataIndex: 'policyNo',
      width: width,
      defaultSortOrder: orders?.policyNo?.sortOrder,
      render: (text: any, item: any) => {
        return (
          <Ellipsis lines={3} tooltip forceTooltip>
            {lodash.get(item, 'policyNo') || '-'}
          </Ellipsis>
        );
      },
    },
    {
      fieldName: 'Agent Name', // configuration match
      width: width * 1.4,
      title: formatMessageApi({ Label_BIZ_Claim: 'AgentName' }),
      dataIndex: 'agentName',
      defaultSortOrder: lodash.get(orders, 'agentName.sortOrder'),
      render: (text: any) =>
        (
          <Ellipsis tooltip lines={1}>
            {text}
          </Ellipsis>
        ) || '-',
    },
    {
      fieldName: 'Submission Channel', // configuration match
      width: width * 1.8,
      title: formatMessageApi({ Label_BIZ_Claim: 'SubmissionChannel' }),
      dataIndex: 'submissionChannel',
      defaultSortOrder: lodash.get(orders, 'submissionChannel.sortOrder'),
      render: (text: any) =>
        text ? formatMessageApi({ Dropdown_COM_SubmissionChannel: text }) : '-',
    },
    {
      fieldName: 'Batch No', // configuration match
      width: width * 1.2,
      title: formatMessageApi({
        Label_BIZ_Claim: 'app.navigator.taskDetail.inquireForm.label.batch-no',
      }),
      dataIndex: 'batchNo',
      defaultSortOrder: lodash.get(orders, 'batchNo.sortOrder'),
      render: (text: any, item: any) => lodash.get(item, 'batchNo') || '-',
    },
    {
      fieldName: 'Case No', // configuration match
      width: width,
      title: formatMessageApi({
        Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.case-no',
      }),
      dataIndex: 'sortCaseNo',
      defaultSortOrder: lodash.get(orders, 'sortCaseNo.sortOrder'),
      render: (text: any, item: any) => lodash.get(item, 'procInstId') || '-',
    },
    {
      fieldName: 'Case Category', // configuration match
      width: width * 1.8,
      title: formatMessageApi({
        Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.case-category',
      }),
      dataIndex: 'caseCategory',
      defaultSortOrder: lodash.get(orders, 'caseCategory.sortOrder'),
      render: (text: string, item: any) =>
        formatMessageApi({ Label_BPM_CaseCategory: lodash.get(item, 'caseCategory') }) ||
        formatMessageApi({
          Label_BIZ_Claim: 'app.navigator.taskDetail.inquireForm.progress.claim-request',
        }),
    },
    {
      fieldName: 'Claim Type', // configuration match
      width: width * 1.4,
      title: formatMessageApi({
        Label_BIZ_Claim: 'app.navigator.taskDetail.inquireForm.label.claim-type',
      }),
      dataIndex: 'claimType',
      render: (text: any) =>
        (
          <Ellipsis tooltip lines={1}>
            {text}
          </Ellipsis>
        ) || '-',
    },
    {
      fieldName: 'Activity', // configuration match
      width: width * 1.6,
      title: formatMessageApi({
        Label_BIZ_Claim: 'app.navigator.taskDetail.inquireForm.label.activity-name',
      }),
      dataIndex: 'activityKey',
      defaultSortOrder: lodash.get(orders, 'activityKey.sortOrder'),
      render: (text: string, item: any) =>
        formatMessageApi({ activity: item.activityKey }) ||
        lodash.get(item, 'currentActivityName') ||
        text ||
        '-',
    },
    {
      fieldName: 'Status', // configuration match
      width: width * 1.2,
      title: formatMessageApi({ Label_BIZ_Claim: 'app.usermanagement.basicInfo.avatar.status' }),
      dataIndex: 'taskStatus',
      defaultSortOrder: lodash.get(orders, 'taskStatus.sortOrder'),
      render: (text: string, item: any) => lodash.get(item, 'taskStatus') || '-',
    },
    {
      fieldName: 'Assignee', // configuration match
      width: width * 1.4,
      title: formatMessageApi({
        Label_BIZ_Claim: 'app.navigator.taskDetail.inquireForm.label.assignee',
      }),
      dataIndex: 'assignee',
      defaultSortOrder: lodash.get(orders, 'assignee.sortOrder'),
      render: (text: any, item: any) =>
        lodash.get(item, 'assigneeName') || lodash.get(item, 'assignee') || '-',
    },
    {
      fieldName: 'Assign By', // configuration match
      width: width * 1.4,
      title: formatMessageApi({
        Label_COM_General: 'assignBy',
      }),
      id: 'Assign By',
      dataIndex: 'assignBy',
      defaultSortOrder: lodash.get(orders, 'assignee.sortOrder'),
      render: (text: any, item: any) =>
        lodash.get(item, 'assignByName') || lodash.get(item, 'assignBy') || '-',
    },
    {
      fieldName: 'Assign From', // configuration match
      width: width * 1.4,
      title: formatMessageApi({
        Label_COM_General: 'assignFrom',
      }),
      id: 'Assign From',
      dataIndex: 'assignFrom',
      defaultSortOrder: lodash.get(orders, 'assignee.sortOrder'),
      render: (text: any, item: any) =>
        lodash.get(item, 'assignFromName') || lodash.get(item, 'assignFrom') || '-',
    },
    {
      fieldName: 'Creation Date', // configuration match
      width: width * 1.4,
      title: formatMessageApi({
        Label_BIZ_Claim: 'app.navigator.taskDetail.inquireForm.label.creation-time',
      }),
      dataIndex: 'creationDate',
      defaultSortOrder: lodash.get(orders, 'creationDate.sortOrder'),
      render: (text: any, item: any) => {
        const startTime = lodash.get(item, 'creationDate');
        return startTime ? moment(startTime).format('L LT') : '-';
      },
    },
    {
      fieldName: 'Task Assignment Date', // configuration match
      width: width * 1.8,
      title: formatMessageApi({
        Label_BIZ_Claim: 'app.navigator.taskDetail.inquireForm.label.task-assignment-date',
      }),
      dataIndex: 'taskAssignmentDate',
      defaultSortOrder: lodash.get(orders, 'taskAssignmentDate.sortOrder'),
      render: (text: any) => text || '-',
    },
    {
      fieldName: 'Task Due Date', // configuration match
      width: width * 1.5,
      title: formatMessageApi({
        Label_BIZ_Claim: 'app.navigator.taskDetail.inquireForm.label.task-due-date',
      }),
      dataIndex: 'taskDueDate',
      defaultSortOrder: lodash.get(orders, 'taskDueDate.sortOrder'),
      render: (text: any, item: any) => {
        const taskDueDate = lodash.get(item, 'taskDueDate');
        return taskDueDate ? moment(taskDueDate).format('L LT') : '-';
      },
    },
    {
      fieldName: 'Task Remaining Time', // configuration match
      width: width * 2,
      title: formatMessageApi({
        Label_BIZ_Claim: 'app.navigator.taskDetail.inquireForm.label.task-remaining-time',
      }),
      dataIndex: 'taskRemainingTime',
      defaultSortOrder: lodash.get(orders, 'taskRemainingTime.sortOrder'),
      render: (text: number, item: any) => {
        // TODO 维护性很差
        const result = lodash
          .chain(item)
          .pick(['taskRemainingTime'])
          .toArray()
          .filter((e) => !isNaN(Number(e)) && Number(e) >= 0)
          .max()
          .value();
        const Color = styled.span`
          color: 'rgba(255, 255, 255, 0.65)';
        `;

        return (
          <Color>
            {lodash.isNil(result)
              ? getRemainingTimeStr(0)
              : getRemainingTimeStr(result, item?.slaUnit)}
          </Color>
        );
      },
    },
    {
      fieldName: 'Remaining Time', // configuration match
      width: width * 1.6,
      title: formatMessageApi({
        Label_BIZ_Claim: 'app.navigator.taskDetail.inquireForm.label.remaining-time',
      }),
      dataIndex: 'taskRemainingTime',
      defaultSortOrder: lodash.get(orders, 'taskRemainingTime.sortOrder'),
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
      fieldName: 'Case Remaining Time', // configuration match
      width: width * 2,
      title: formatMessageApi({
        Label_BIZ_Claim: 'app.navigator.taskDetail.inquireForm.label.case-remaining-time',
      }),
      dataIndex: 'caseRemainingTime',
      defaultSortOrder: lodash.get(orders, 'caseRemainingTime.sortOrder'),
      render: (text: number, item: any) => {
        // TODO 维护性很差
        const remain = Number(lodash.get(item, 'caseRemainingTime'));
        const effective = getEffectiveTime(remain);
        const Color = styled.span`
          color: ${remain < 1 ? '#fb5d71' : '#a1ca7c'};
        `;

        return <Color>{remain > 0 ? effective : 0}</Color>;
      },
    },
    {
      fieldName: 'Insured Name', // configuration match
      width: width * 2,
      title: formatMessageApi({
        Label_BIZ_Claim: 'ClientName',
      }),
      dataIndex: 'insured',
      defaultSortOrder: lodash.get(orders, 'insured.sortOrder'),
      key: 'insured',
      render: (text: any) =>
        (
          <Ellipsis tooltip lines={1} forceTooltip>
            {text}
          </Ellipsis>
        ) || '-',
    },
    {
      fieldName: 'Completed Time', // configuration match
      width: width * 1.8,
      title: formatMessageApi({
        Label_BIZ_Claim: 'app.navigator.caseDetail.table-column.completed-time',
      }),
      dataIndex: 'endTime',
      defaultSortOrder: lodash.get(orders, 'endTime.sortOrder'),
      render: (text: any, item: any) => {
        const endTime = lodash.get(item, 'endTime');
        return endTime ? moment(endTime).format('L LT') : '-';
      },
    },
    {
      fieldName: 'Collection Time', // configuration match
      width: width * 1.8,
      title: formatMessageApi({
        Label_BIZ_Claim: 'app.navigator.taskDetail.inquireForm.label.collection-time',
      }),
      dataIndex: 'favouriteTime',
      defaultSortOrder: lodash.get(orders, 'favouriteTime.sortOrder'),
      render: (text: any, item: any) => {
        const collectionTime = lodash.get(item, 'favoriteTime');
        return collectionTime ? moment(collectionTime).format('L LT') : '-';
      },
    },
    {
      fieldName: 'Update Date',
      title: formatMessageApi({
        Label_COM_General: 'UpdateDate',
      }),
      id: 'UpdateDate',
      dataIndex: 'operationDate',
      width: width * 1.5,
      defaultSortOrder: lodash.get(orders, 'operationDate.sortOrder'),
      render: (text: any, item: any) => {
        const operationDate = lodash.get(item, 'operationDate');
        return operationDate ? moment(operationDate).format('L LTS') : '-';
      },
    },
    {
      fieldName: 'Submission Date',
      title: formatMessageApi({
        Label_BIZ_Claim: 'app.navigator.task-detail-of-jpcr.label.submission-date',
      }),
      id: 'app.navigator.task-detail-of-jpcr.label.submission-date',
      dataIndex: 'submissionDate',
      defaultSortOrder: lodash.get(orders, 'submissionDate.sortOrder'),
      width: width * 1.8,
      render(text: any, item: any) {
        const submissionDate = lodash.get(item, 'submissionDate');
        return submissionDate ? moment(submissionDate).format('L LTS') : '-';
      },
    },
    {
      fieldName: 'Entity',
      title: formatMessageApi({
        Label_COM_Inquiry: 'Entity',
      }),
      id: 'entity',
      dataIndex: 'companyCode',
      defaultSortOrder: lodash.get(orders, 'entity.sortOrder'),
      width: width,
      render: (text: any) => text || '-',
    },
  ];
  const tableColumns = lodash
    .chain(resultField)
    .filter((item: any) => columns.find((c) => c.fieldName === item.fieldName))
    .map((item: any) => ({
      ...item,
      ...columns.find((c) => c.fieldName === item.fieldName),
    }))
    .map((item: any, index) => ({
      title:
        !!filterObj[item.dataIndex] &&
        lodash.isArray(filterObj[item.dataIndex]) &&
        !lodash.isEmpty(filterObj[item.dataIndex]) ? (
          <TableTitle
            title={item.title}
            list={filterObj[item.dataIndex]}
            value={filterParams[item?.dataIndex]}
            paramsKey={item.dataIndex}
            handleChange={handleTitleChange}
          />
        ) : (
          item.title
        ),
      key: item.dataIndex,
      dataIndex: item.dataIndex,
      width: item?.width,
      render:
        index === 0
          ? (text, rendertItem, all) => (
              <Label item={rendertItem} render={item?.render.bind(null, text, rendertItem, all)} />
            )
          : item.render,
      sorter: item.sortable && !item.filter,
      sortOrder: item.defaultSortOrder,
      className: item.className,
    }))
    .value();

  return tableColumns;
};

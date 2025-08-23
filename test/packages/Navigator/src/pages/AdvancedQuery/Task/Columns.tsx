import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import lodash, { toUpper } from 'lodash';
import { getRemainingTimeStr, getEffectiveTime, getMinFromRemainingTime } from '@/utils/utils';
import { filterConfig } from '@/utils/configUtil';
import { formatMessageApi, transCodesToNames } from '@/utils/dictFormatMessage';
import Ellipsis from '@/components/Ellipsis';
import { sorts } from '../TitleMap';
import resizeWindowHook from '../_models/hooks/resizeWindow';
import Label from '@/components/Label/LabelIcon';
import styles from './Table.less';
import { defaultSystem } from 'navigator/utils';

const { isNaN } = Number;

export default (orders: any, config: any, handleHeaderCell: any, saveSort: any) => {
  const { handleScale } = resizeWindowHook();

  const width = handleScale(130);

  const params = [
    {
      fieldName: 'Business Type', // configuration match
      labelTypeCode: 'Label_BIZ_Claim',
      id: 'BusinessType',
      dataIndex: 'businessType',
      defaultSortOrder: lodash.get(orders, 'businessType.sortOrder'),
      width: width,
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
      fieldName: 'Agent Channel', // configuration match
      width: width * 1.3,
      labelTypeCode: 'Label_BIZ_Policy',
      id: 'DistributionChannel',
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
      fieldName: 'Case No',
      labelTypeCode: 'Label_BIZ_Claim',
      id: 'app.navigator.task-detail-of-data-capture.label.case-no',
      dataIndex: 'procInstId',
      key: 'processInstanceId',
      sorter: true,
      defaultSortOrder: orders?.proc_inst_id?.sortOrder,
      width: width,
      render: (text: any, item: any) => lodash.get(item, 'procInstId'),
    },
    {
      fieldName: 'Agent Name', // configuration match
      labelTypeCode: 'Label_BIZ_Claim',
      id: 'AgentName',
      dataIndex: 'agentName',
      defaultSortOrder: lodash.get(orders, 'agentName.sortOrder'),
      width: width,
      render: (text: any) => text || '-',
    },
    {
      fieldName: 'Submission Channel', // configuration match
      labelTypeCode: 'Label_BIZ_Claim',
      id: 'SubmissionChannel',
      dataIndex: 'submissionChannel',
      defaultSortOrder: lodash.get(orders, 'submissionChannel.sortOrder'),
      width: width,
      render: (text: any) =>
        text ? formatMessageApi({ Dropdown_COM_SubmissionChannel: text }) : '-',
    },
    {
      fieldName: 'Claim No',
      labelTypeCode: 'Label_COM_General',
      id: 'BusinessNo',
      dataIndex: 'inquiryBusinessNo',
      defaultSortOrder: orders?.inquiryBusinessNo?.sortOrder,
      width: width * 1.2,
      className: styles.haveFlag,
      render: (text: any, item: any) => {
        return item?.inquiryBusinessNo || item?.inquiryClaimNo || item?.businessNo || '-';
      },
    },
    {
      fieldName: 'Entity',
      id: 'Entity',
      labelTypeCode: 'Label_COM_Inquiry',
      dataIndex: 'companyCode',
      sorter: true,
      defaultSortOrder: orders?.inquiryClaimNo?.sortOrder,
      width,
      render: (text: any, item: any) => {
        return formatMessageApi({ Label_BPM_Entity: lodash.get(item, 'entity') }) || text || '-';
      },
    },
    {
      fieldName: 'Case Category',
      labelTypeCode: 'Label_BIZ_Claim',
      id: 'app.navigator.task-detail-of-data-capture.label.case-category',
      dataIndex: 'caseCategory',
      width: width * 1.5,
      render: (text: any, item: any) =>
        formatMessageApi({ Label_BPM_CaseCategory: lodash.get(item, 'caseCategory') }) ||
        text ||
        '-',
    },
    {
      fieldName: 'Activity',
      labelTypeCode: 'Label_BIZ_Claim',
      id: 'app.navigator.taskDetail.inquireForm.label.activity-name',
      dataIndex: 'activityKey',
      width: width * 1.5,
      render: (text: any, item: any) =>
        formatMessageApi(
          { activity: item.activityKey, caseCategory: item.caseCategory },
          item.activityName
        ) || '-',
    },
    {
      fieldName: 'Status',
      labelTypeCode: 'Label_BIZ_Claim',
      id: 'app.usermanagement.basicInfo.avatar.status',
      dataIndex: 'taskStatus',
      width: width * 0.8,
      render: (text: any, item: any) =>
        formatMessageApi({ Label_BPM_TaskActivity: lodash.get(item, 'taskStatus') }) || text || '-',
    },
    {
      fieldName: 'Due Date',
      labelTypeCode: 'Label_BIZ_Claim',
      id: 'app.navigator.taskDetail.inquireForm.label.completed-time',
      dataIndex: 'taskDueDate',
      key: 'taskDueDate',
      sorter: true,
      defaultSortOrder: orders?.due_date?.sortOrder,
      width: width,
      render: (text: any, item: any) => {
        const result = lodash
          .chain(item)
          .pick(['taskDueDate', 'caseDueDate'])
          .toArray()
          .filter((e) => !!e && new Date(e).getTime() >= 0)
          .min()
          .value();
        return lodash.isNil(result) ? '-' : moment(result).format('L');
      },
    },
    {
      fieldName: 'Remaining Time', // configuration match
      width: width * 2,
      labelTypeCode: 'Label_BIZ_Claim',
      id: 'app.navigator.taskDetail.inquireForm.label.remaining-time',
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
      labelTypeCode: 'Label_BIZ_Claim',
      width: width * 2,
      id: 'app.navigator.taskDetail.inquireForm.label.case-remaining-time',
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
      fieldName: 'Task Remaining Time',
      labelTypeCode: 'Label_BIZ_Claim',
      id: 'app.navigator.taskDetail.inquireForm.label.task-remaining-time',
      key: 'taskRemainingTime',
      dataIndex: 'taskRemainingTime',
      width: width * 1.2,
      defaultSortOrder: orders?.taskRemainingTime?.sortOrder,
      render: (text: any, item: any) => {
        // Remain time = Min(Task Remain Time , Case Remain Time)

        // If Remain Time > 1 hour then display xx h xx m
        // If Remain Time < 1 hour then display xx m
        // If Remain Time <1 min,display xx s

        // If remain time < 0 or SLA percentage <0 , remain time display red color
        // If remain time >=5 min , remain time display normal color
        // If remain time < 5 min , remain time display orange color
        const getColor = (seconds: any) => {
          const COLOR_RED = '#dc6374';
          const COLOR_ORANGE = '#ffd44f';

          if (seconds <= 0) {
            return COLOR_RED;
          }
          if (seconds < 60 * 5) {
            return COLOR_ORANGE;
          }

          return '';
        };

        const result = lodash
          .chain(item)
          .pick(['taskRemainingTime'])
          .toArray()
          .filter((e) => !isNaN(Number(e)) && Number(e) >= 0)
          .max()
          .value();
        const Color = styled.span`
          color: ${getColor(lodash.isNil(result) ? 0 : result)};
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
      fieldName: 'Insured Name',
      labelTypeCode: 'Label_BIZ_Claim',
      id: 'ClientName',
      dataIndex: 'insured',
      width: width,
      render: (text: any) => text || '-',
    },
    {
      fieldName: 'Assignee',
      labelTypeCode: 'Label_BIZ_Claim',
      id: 'app.navigator.taskDetail.inquireForm.label.assignee',
      dataIndex: 'assignee',
      width: width * 1.2,
      render: (text: any, item: any) =>
        lodash.get(item, 'assigneeName') || lodash.get(item, 'assignee') || defaultSystem(text),
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
        lodash.get(item, 'assignByName') || lodash.get(item, 'assignBy') || defaultSystem(text),
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
        lodash.get(item, 'assignFromName') || lodash.get(item, 'assignFrom') || defaultSystem(text),
    },
    {
      fieldName: 'Batch No',
      labelTypeCode: 'Label_BIZ_Claim',
      id: 'app.navigator.taskDetail.inquireForm.label.batch-no',
      dataIndex: 'batchNo',
      key: 'batchNo',
      width: width,
      defaultSortOrder: orders?.batchNo?.sortOrder,
      render: (text: any, item: any) => lodash.get(item, 'batchNo') || '-',
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
      render: (text: any, item: any) => {
        return (
          <Ellipsis lines={3} tooltip forceTooltip>
            {lodash.get(item, 'policyNo') || '-'}
          </Ellipsis>
        );
      },
    },
    {
      fieldName: 'Other Policy',
      labelTypeCode: 'Label_BIZ_Claim',
      id: 'venus.navigator.label.other-policy',
      dataIndex: 'otherPolicy',
      key: 'otherPolicy',
      width,
      render: (text: any, item: any) =>
        (lodash.get(item, 'policyNo') || '').split(',').length > 1
          ? formatMessageApi({ Label_BIZ_Claim: 'venus.navigator.label.other-policy' })
          : '-',
    },
    {
      fieldName: 'Agency Code',
      labelTypeCode: 'Label_BIZ_Claim',
      id: 'venus.navigator.label.agency-code',
      dataIndex: 'agencyCodes',
      key: 'agencyCode',
      width: width * 1.5,
      render: (text: any, item: any) =>
        transCodesToNames(lodash.get(item, 'agencyCode') || '-', 'Agency', ','),
    },
    {
      fieldName: 'Gender',
      labelTypeCode: 'Label_BIZ_Claim',
      id: 'venus.navigator.label.insured-gender',
      dataIndex: 'gender',
      key: 'gender',
      width: width,
      render: (text: any, item: any) =>
        formatMessageApi({ Gender: lodash.get(item, 'gender') || '-' }),
    },
    {
      fieldName: 'Date Of Birth',
      labelTypeCode: 'Label_BIZ_Claim',
      id: 'venus.navigator.label.insured-date-of-birth',
      dataIndex: 'dateOfBirth',
      key: 'dateOfBirth',
      sorter: true,
      defaultSortOrder: orders?.dateOfBirth?.sortOrder,
      width: width * 1.5,
      render: (text: any, item: any) => {
        const date = lodash.get(item, 'dateOfBirth');
        return date ? moment(date).format('L') : '-';
      },
    },
    {
      fieldName: 'Adress',
      labelTypeCode: 'Label_BIZ_Claim',
      id: 'venus.navigator.label.insured-adress',
      dataIndex: 'address',
      key: 'address',
      width: width * 1.5,
      render: (text: any, item: any) => lodash.get(item, 'address') || '-',
    },
    {
      fieldName: 'Split Remark',
      labelTypeCode: 'Label_BIZ_Claim',
      id: 'venus.navigator.label.split-remark',
      dataIndex: 'remarks',
      key: 'remarks',
      width: width * 1.5,
      render: (text: any, item: any) => lodash.get(item, 'remarks') || '-',
    },
    {
      fieldName: 'Date of Eligibility Check',
      labelTypeCode: 'Label_BIZ_Claim',
      id: 'venus.navigator.label.date-of-eligibility-check',
      dataIndex: 'eligibilityCheckDate',
      key: 'eligibilityCheckDate',
      sorter: true,
      defaultSortOrder: orders?.eligibilityCheckDate?.sortOrder,
      width: width,
      render: (text: any, item: any) => {
        const date = lodash.get(item, 'eligibilityCheckDate');
        return date ? moment(date).format('L') : '-';
      },
    },
    {
      fieldName: 'Arrival Date',
      labelTypeCode: 'Label_BIZ_Claim',
      id: 'venus.navigator.label.arrival-date',
      dataIndex: 'firstFormReceiveDate',
      key: 'firstFormReceiveDate',
      sorter: true,
      defaultSortOrder: orders?.firstFormReceiveDate?.sortOrder,
      width: width,
      render: (text: any, item: any) => {
        const date = lodash.get(item, 'firstFormReceiveDate');
        return date ? moment(date).format('L') : '-';
      },
    },
    {
      fieldName: 'Creation Date',
      labelTypeCode: 'Label_BIZ_Claim',
      id: 'venus.navigator.label.creation-time',
      dataIndex: 'creationDate',
      key: 'creationDate',
      sorter: true,
      defaultSortOrder: orders?.creationDate?.sortOrder,
      width: width * 1.5,
      render: (text: any, item: any) => {
        const date = lodash.get(item, 'creationDate');
        return date ? moment(date).format('L LTS') : '-';
      },
    },
    {
      fieldName: 'Completed Date',
      labelTypeCode: 'Label_BIZ_Claim',
      id: 'venus.navigator.label.completed-time',
      dataIndex: 'endTime',
      key: 'endTime',
      sorter: true,
      defaultSortOrder: orders?.endTime?.sortOrder,
      width: width * 1.5,
      render: (text: any, item: any) => {
        const date = lodash.get(item, 'endTime');
        return date ? moment(date).format('L') : '-';
      },
    },
    {
      fieldName: 'Active Pending Item',
      labelTypeCode: 'Label_BIZ_Claim',
      id: 'app.navigator.label.Active-Pending-Item',
      dataIndex: 'active_pending_reason',
      key: 'activePendingReason',
      width: width * 1.5,
      render: (text: any, item: any) => item.activePendingReason || '-',
    },
    {
      fieldName: 'Reminder Send Date',
      labelTypeCode: 'Label_BIZ_Claim',
      id: 'app.navigator.label.Next-Reminder-Time',
      dataIndex: 'reminder_send_date',
      key: 'nextReminderTime',
      width: width * 1.5,
      render: (text: any, item: any) =>
        item.nextReminderTime ? moment(item.nextReminderTime).format('L') : '-',
    },
    {
      fieldName: 'Update Date',
      labelTypeCode: 'Label_COM_General',
      id: 'UpdateDate',
      dataIndex: 'operationDate',
      key: 'operationDate',
      sorter: true,
      defaultSortOrder: orders?.creationDate?.sortOrder,
      width: width * 1.5,
      render: (text: any, item: any) => (text && moment(text).format('L LTS')) || '-',
    },
    {
      fieldName: 'Submission Date',
      labelTypeCode: 'Label_BIZ_Claim',
      id: 'app.navigator.task-detail-of-jpcr.label.submission-date',
      dataIndex: 'submissionDate',
      key: 'submissionDate',
      sorter: true,
      defaultSortOrder: orders?.submissionDate?.sortOrder,
      width: width * 1.5,
      render: (text: any, item: any) => (text && moment(text).format('L LTS')) || '-',
    },
  ];
  const columns = filterConfig(config, params);

  return lodash.map(columns, (el: any, index: number) => {
    const tempParams = params.find((ele: any) => toUpper(ele.fieldName) === toUpper(el.fieldName));
    let sortOrder = tempParams?.defaultSortOrder || orders?.tempParams?.dataIndex?.sortOrder;
    if (tempParams?.dataIndex === saveSort.sortName) {
      sortOrder = sorts[saveSort.sortOrder];
    }
    return {
      title: formatMessageApi({ [tempParams?.labelTypeCode]: tempParams?.id }),
      dataIndex: tempParams?.dataIndex,
      key: tempParams?.key || tempParams?.dataIndex,
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
      width: tempParams?.width,
      className:
        (index === 0 ? 'guidance-adv-one' : tempParams?.className) || tempParams?.fieldName,

      onHeaderCell: (column: any) => ({
        onClick: (e: any) => handleHeaderCell(column, e), // 点击表头行
      }),
    };
  });
};

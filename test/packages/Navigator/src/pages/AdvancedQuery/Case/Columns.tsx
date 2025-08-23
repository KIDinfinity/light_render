import React from 'react';
import lodash, { toUpper } from 'lodash';
import moment from 'moment';
import { Tooltip } from 'antd';
import styled from 'styled-components';
import { filterConfig, filterConfigByBusinessCode } from '@/utils/configUtil';
import { getRemainingTimeStr } from '@/utils/utils';
import { formatMessageApi, transCodesToNames } from '@/utils/dictFormatMessage';
import { CaseStatus } from '@/enum';
import Ellipsis from '@/components/Ellipsis';
import { sorts } from '../TitleMap';
import Label from '@/components/Label/LabelIcon';
import styles from './index.less';

const { min, max } = Math;
const { isNaN } = Number;

export default (orders: any, config: any, handleHeaderCell: any, saveSort: any) => {
  // const { handleScale } = resizeWindowHook();

  const width = 130;
  const params = [
    {
      fieldName: 'Business Type', // configuration match
      id: 'BusinessType',
      dataIndex: 'businessType',
      defaultSortOrder: lodash.get(orders, 'businessType.sortOrder'),
      width,
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
      fieldName: 'Business Decision', // configuration match
      id: 'BusinessDecision',
      dataIndex: 'businessDecision',
      defaultSortOrder: lodash.get(orders, 'BusinessDecision.sortOrder'),
      width,
      render: (text: any) => {
        let viewText;
        if (lodash.isString(text)) {
          const textArr = lodash.split(text, ',');
          viewText = lodash.map(textArr, (item: string, idx: number) => {
            const i18nItem = formatMessageApi({ Dropdown_COM_BusinessDecision: item });
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
      fieldName: 'Agent Name', // configuration match
      id: 'AgentName',
      dataIndex: 'agentName',
      defaultSortOrder: lodash.get(orders, 'agentName.sortOrder'),
      width,
      render: (text: any) => text || '-',
    },
    {
      fieldName: 'Submission Channel', // configuration match
      id: 'SubmissionChannel',
      dataIndex: 'submissionChannel',
      defaultSortOrder: lodash.get(orders, 'submissionChannel.sortOrder'),
      width,
      render: (text: any) =>
        text ? formatMessageApi({ Dropdown_COM_SubmissionChannel: text }) : '-',
    },
    {
      fieldName: 'Assessment Decision', // configuration match
      id: 'AssessmentDecision',
      dataIndex: 'claimDecision',
      defaultSortOrder: lodash.get(orders, 'claimDecision.sortOrder'),
      width,
      render: (text: any) => text || '-',
    },
    {
      fieldName: 'Case No',
      id: 'app.navigator.task-detail-of-data-capture.label.case-no',
      dataIndex: 'procInstId',
      key: 'procInstId',
      defaultSortOrder: lodash.get(orders, 'proc_inst_id.sortOrder'),
      width,
      render: (text: any, item: any) => {
        const procInstId = lodash.get(item, 'procInstId');
        return <a style={{ color: 'inherit' }}>{procInstId}</a>;
      },
    },
    {
      fieldName: 'Claim No',
      id: 'BusinessNo',
      dataIndex: 'inquiryBusinessNo',
      key: 'businessNo',
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
      key: 'entity',
      sorter: true,
      defaultSortOrder: orders?.inquiryClaimNo?.sortOrder,
      width,
      render: (text: any, item: any) => {
        return formatMessageApi({ Label_BPM_Entity: lodash.get(item, 'entity') }) || text || '-';
      },
    },
    {
      fieldName: 'Case Category',
      id: 'app.navigator.task-detail-of-data-capture.label.case-category',
      dataIndex: 'caseCategory',
      key: 'caseCategory',
      width: width * 1.5,
      render: (text: any, item: any) =>
        formatMessageApi({ Label_BPM_CaseCategory: lodash.get(item, 'caseCategory') }) ||
        text ||
        '-',
    },
    {
      fieldName: 'Current Activity',
      id: 'CurrentActivity',
      dataIndex: 'currentActivityKey',
      key: 'currentActivityKey',
      width: width * 1.5,
      render: (text: any, item: any) => {
        if (
          [
            CaseStatus.COMPLETED,
            CaseStatus.CANCELLED,
            CaseStatus.WITHDRAWAL,
            CaseStatus.OVERDUE,
            CaseStatus.NTU,
            CaseStatus.HANDLEDINLOCALSYSTEM,
            CaseStatus.HANDLEDINHKLOCALSYSTEM,
            CaseStatus.HANDLEDINJPLOCALSYSTEM,
            CaseStatus.HANDLEDINTHLOCALSYSTEM,
            CaseStatus.HANDLEDINPHLOCALSYSTEM,
          ].includes(item.status)
        ) {
          return formatMessageApi({ Dropdown_CAS_CurrentActivity: item.status });
        }
        return formatMessageApi({
          activity: lodash.get(item, 'currentActivityKey') || '-',
          caseCategory: item.caseCategory,
        });
      },
    },
    {
      fieldName: 'Creation Date',
      id: 'app.navigator.taskDetail.inquireForm.label.creation-time',
      dataIndex: 'creationDate',
      width: width * 1.5,
      render(text: any, item: any) {
        const creationDate = lodash.get(item, 'creationDate');
        return creationDate ? moment(creationDate).format('L LTS') : '-';
      },
    },
    {
      fieldName: 'Submission Date',
      id: 'app.navigator.task-detail-of-jpcr.label.submission-date',
      dataIndex: 'submissionDate',
      width,
      render(text: any, item: any) {
        const submissionDate = lodash.get(item, 'submissionDate');
        return submissionDate ? moment(submissionDate).format('L LTS') : '-';
      },
    },
    {
      fieldName: 'Due Date',
      id: 'app.navigator.taskDetail.inquireForm.label.completed-time',
      dataIndex: 'dueDate',
      width,
      render(text: any, item: any) {
        const dueDate = lodash.get(item, 'dueDate');

        return dueDate ? moment(dueDate).format('L LT') : '-';
      },
    },
    {
      fieldName: 'Remaining Time',
      id: 'app.navigator.taskDetail.inquireForm.label.case-remaining-time',
      dataIndex: 'remainingTime',
      sorter: true,
      defaultSortOrder: lodash.get(orders, 'remainTime.sortOrder'),
      width: width * 1.5,
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

        // taskRemainingTime
        const taskRemainingTime = lodash.get(item, 'remainingTime', null);
        const taskRemaining = Number(taskRemainingTime); // NaN  or Number
        const taskRemain = max(0, isNaN(taskRemaining) ? 0 : taskRemaining); // range: [0, ...)

        // caseRemainingTime
        const caseRemainingTime = lodash.get(item, 'caseRemainingTime', null);
        const caseRemaining = Number(caseRemainingTime); // NaN  or Number
        const caseRemain = max(0, isNaN(caseRemaining) ? 0 : caseRemaining); // range: [0, ...)

        // remain
        const remainWithoutTask = caseRemainingTime === null ? 0 : caseRemain;
        const remainWithTask =
          caseRemainingTime === null ? taskRemain : min(caseRemain, taskRemain);
        const remain = taskRemainingTime === null ? remainWithoutTask : remainWithTask;

        const Color = styled.span`
          color: ${getColor(remain)};
        `;
        return <Color>{getRemainingTimeStr(remain, item?.slaUnit)}</Color>;
      },
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
      render: (text: any) => (text && moment(text).format('L LTS')) || '-',
    },
    {
      fieldName: 'Insured Name',
      id: 'InsuredName',
      dataIndex: 'insuredName',
      width: width * 1.2,
      render: (text: any, item: any) => lodash.get(item, 'insuredName') || '-',
    },
    {
      fieldName: 'Batch No',
      id: 'app.navigator.taskDetail.inquireForm.label.batch-no',
      dataIndex: 'batchNo',
      key: 'batchNo',
      width,
      render: (text: any, item: any) => {
        const batchNo = lodash.get(item, 'batchNo');
        return batchNo || '-';
      },
    },
    {
      fieldName: 'Split Remark',
      id: 'app.navigator.taskDetail.inquireForm.label.split-remark',
      dataIndex: 'remarks',
      key: 'remarks',
      width: width * 1.5,
      onCell: () => ({
        style: {
          maxWidth: 100,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          cursor: 'pointer',
        },
      }),
      render: (text: any, item: any) => {
        // TODO：这里的逻辑需要优化
        const remarks = lodash.get(item, 'remarks');

        if (!!remarks && remarks.length > 0) {
          const titleArr: any = [];
          Object.keys(remarks).forEach((i: any) => {
            titleArr.push(<p key={i}>{remarks[i]}</p>);
          });
          return (
            <Tooltip placement="topLeft" title={titleArr}>
              {remarks}
            </Tooltip>
          );
        }
        return remarks;
      },
    },
    {
      fieldName: 'Agency Code',
      id: 'venus.navigator.label.agency-code',
      dataIndex: 'agencyCodes',
      key: 'agencyCodes',
      width: width * 1.5,
      render: (text: any, item: any) =>
        transCodesToNames(lodash.get(item, 'agencyCodes') || '-', 'Agency', ','),
    },
    {
      fieldName: 'Gender',
      id: 'venus.navigator.label.insured-gender',
      dataIndex: 'gender',
      key: 'gender',
      width,
      render: (text: any, item: any) =>
        formatMessageApi({ Gender: lodash.get(item, 'gender') || '-' }),
    },
    {
      fieldName: 'Date Of Birth',
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
      id: 'venus.navigator.label.insured-adress',
      dataIndex: 'address',
      key: 'address',
      width: width * 1.5,
      render: (text: any, item: any) => lodash.get(item, 'address') || '-',
    },
    {
      fieldName: 'Policy No',
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
      fieldName: 'Assignee Of Manual Assessment',
      id: 'venus.navigator.label.assessment-assignee',
      dataIndex: 'manualAssessmentAssignee',
      width: width * 1.5,
      render: (text: any) => text || '-',
    },
    {
      fieldName: 'Date Of Eligibility Check',
      id: 'venus.navigator.label.date-of-eligibility-check',
      dataIndex: 'eligibilityCheckDate',
      key: 'eligibilityCheckDate',
      sorter: true,
      defaultSortOrder: orders?.eligibilityCheckDate?.sortOrder,
      width,
      render: (text: any, item: any) => {
        const date = lodash.get(item, 'eligibilityCheckDate');
        return date ? moment(date).format('L') : '-';
      },
    },
    {
      fieldName: 'Policy Owner Name',
      id: 'PolicyOwnerName',
      dataIndex: 'PolicyOwnerName',
      width: width * 1.2,
      render: (text: any, item: any) => lodash.get(item, 'policyOwnerName') || '-',
    },
    {
      fieldName: 'Client Name',
      id: 'ClientName',
      dataIndex: 'ClientName',
      width: width * 1.2,
      render: (text: any, item: any) => lodash.get(item, 'insuredName') || '-',
    },
    {
      fieldName: 'ID/Passport No',
      id: 'IDNo',
      dataIndex: 'ID/PassportNo',
      width: width * 1.2,
      render: (text: any, item: any) => lodash.get(item, 'identityNo') || '-',
    },
  ];

  const columns = filterConfigByBusinessCode(filterConfig(config, params));

  return (
    lodash.isArray(columns) &&
    lodash.map(columns, (el: any, index: number) => {
      const tempParams = params.find(
        (ele: any) => toUpper(ele.fieldName) === toUpper(el.fieldName)
      );
      let sortOrder = tempParams?.defaultSortOrder || orders?.tempParams?.dataIndex?.sortOrder;
      if (tempParams?.dataIndex === saveSort.sortName) {
        sortOrder = sorts[saveSort.sortOrder];
      }
      const titleFormat = () => {
        let formatTitle;
        if (lodash.includes(['BusinessNo', 'BusinessDecision', 'IDPassport'], tempParams?.id)) {
          formatTitle = formatMessageApi({
            Label_COM_General: tempParams?.id,
          });
        } else if (tempParams?.id === 'CurrentActivity') {
          formatTitle = formatMessageApi({
            Label_BPM_CaseInfo: tempParams?.id,
          });
        } else if (lodash.includes(['IdentityNumber', 'IDNo'], tempParams?.id)) {
          formatTitle = formatMessageApi({
            Label_BIZ_Individual: tempParams?.id,
          });
        } else if (
          lodash.includes(['DistributionChannel', 'PolicyOwnerName', 'InsuredName'], tempParams?.id)
        ) {
          formatTitle = formatMessageApi({
            Label_BIZ_Policy: tempParams?.id,
          });
        } else {
          formatTitle = formatMessageApi({
            Label_BIZ_Claim: tempParams?.id,
          });
        }
        return formatTitle;
      };

      return {
        title: titleFormat,
        dataIndex: tempParams?.dataIndex,
        key: tempParams?.key || tempParams?.dataIndex,
        onCell: tempParams?.onCell,
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
        className: tempParams?.className,
        onHeaderCell: (column: any) => ({
          onClick: (e: any) => handleHeaderCell(column, e), // 点击表头行
        }),
      };
    })
  );
};

import React from 'react';
import moment from 'moment';
import { toUpper, get, isArray, compact, map } from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { filterConfig } from '@/utils/configUtil';
import { safeParseUtil } from '@/utils/utils';
import { sorts } from '../TitleMap';
import Label from '@/components/Label/LabelIcon';
import styles from './index.less';

export default (orders: any, config: any, saveSort: any) => {
  // const { handleScale } = resizeWindowHook();

  const width = 130;
  const params = [
    {
      fieldName: 'Claim No',
      labelId: 'BusinessNo',
      labelTypeCode: 'Label_COM_General',
      dataIndex: 'inquiry_claim_no',
      key: 'inquiryClaimNo',
      sorter: true,
      defaultSortOrder: orders?.inquiryClaimNo?.sortOrder,
      width,
      className: styles.haveFlag,
      render: (text: any, item: any) => {
        return item?.inquiryBusinessNo || item?.inquiryClaimNo || item?.businessNo || '-';
      },
    },
    {
      fieldName: 'Entity',
      labelId: 'Entity',
      labelTypeCode: 'Label_COM_Inquiry',
      dataIndex: 'companyCode',
      key: 'entity',
      sorter: true,
      defaultSortOrder: orders?.inquiryClaimNo?.sortOrder,
      width,
      render: (text: any, item: any) => {
        return formatMessageApi({ Label_BPM_Entity: get(item, 'companyCode') }) || text || '-';
      },
    },
    {
      fieldName: 'Payment Amount',
      labelId: 'PaymentAmount',
      labelTypeCode: 'Label_BIZ_Claim',
      dataIndex: 'paymentAmount',
      key: 'paymentAmount',
      sorter: true,
      defaultSortOrder: orders?.inquiryClaimNo?.sortOrder,
      width,
      render: (text: any, item: any) => {
        return item?.paymentAmount || '-';
      },
    },
    {
      fieldName: 'Close Date',
      labelId: 'app.navigator.taskDetail.inquireForm.label.close-date',
      labelTypeCode: 'Label_BIZ_Claim',
      dataIndex: 'closeDate',
      width: width * 0.9,
      render: (text: any, item: any) => {
        const closeDate = item?.closeDate;
        return closeDate ? moment(closeDate).format('L') : '-';
      },
    },
    {
      fieldName: 'Contract Type',
      labelId: 'ContractType',
      labelTypeCode: 'Label_COM_Inquiry',
      dataIndex: 'contractType',
      key: 'contractType',
      sorter: true,
      defaultSortOrder: orders?.inquiryClaimNo?.sortOrder,
      width,
      render: (text: any, item: any) => {
        const formatedText = get(item, 'contractType') ? get(item, 'contractType') + ' - ' + formatMessageApi({ Dropdown_PRD_ContractType: get(item, 'contractType') }) : ''
        return formatedText || text || '-';
      },
    },
    // {
    //   fieldName: 'Case No',
    //   labelId: 'app.navigator.task-detail-of-data-capture.label.case-no',
    //   dataIndex: 'proc_inst_id',
    //   key: 'processInstanceId',
    //   sorter: true,
    //   defaultSortOrder: get(orders, 'proc_inst_id.sortOrder'),
    //   render: (text, item) => {
    //     const processInstanceId = get(item, 'processInstanceId');
    //     return <a style={{ color: 'inherit' }}>{processInstanceId}</a>;
    //   },
    // },
    {
      fieldName: 'Case Category',
      labelId: 'app.navigator.task-detail-of-data-capture.label.case-category',
      labelTypeCode: 'Label_BIZ_Claim',
      dataIndex: 'case_category',
      width,
      render: (text: any, item: any) =>
        formatMessageApi({ Label_BPM_CaseCategory: get(item, 'caseCategory') }) || text || '-',
    },
    {
      fieldName: 'Insured Name',
      labelId: 'app.navigator.taskDetail.inquireForm.label.insured-name',
      labelTypeCode: 'Label_BIZ_Claim',
      dataIndex: 'insured',
      width: width * 0.9,
      render: (text: any, item: any) => {
        const firstName = get(item, 'firstName') || '';
        const surName = get(item, 'surname') || '';
        return `${firstName} ${surName}` || '-';
      },
    },
    {
      fieldName: 'Claim Type',
      labelId: 'app.navigator.taskDetail.inquireForm.label.claim-type',
      labelTypeCode: 'Label_BIZ_Claim',
      dataIndex: 'claim_type',
      width: width * 0.85,
      render: (text: any, item: any) => {
        const claimTypes = get(item, 'claimType') || '';
        const types = compact(safeParseUtil(claimTypes)).toString();
        const claimTypeTxt = map(
          types.split(','),
          (claimType: any) => formatMessageApi({ ClaimType: claimType }) || '-'
        );

        return claimTypeTxt.join(',');
      },
    },
    {
      fieldName: 'Assessment Decision',
      labelId: 'app.navigator.taskDetail.inquireForm.label.assessment-decision',
      labelTypeCode: 'Label_BIZ_Claim',
      dataIndex: 'assessment_decision',
      width: width * 0.9,
      render: (text: any, item: any) =>
        formatMessageApi({ Dropdown_CLM_AssessmentDecision: get(item, 'assessmentDecision') }) ||
        '-',
    },
    {
      fieldName: 'Payment Amount',
      labelId: 'app.navigator.taskDetail.inquireForm.label.payment-amount',
      labelTypeCode: 'Label_BIZ_Claim',
      key: 'paymentAmount',
      dataIndex: 'total_payable_amount',
      defaultSortOrder: orders?.paymentAmount?.sortOrder,
      width: width * 0.9,
      render: (text: any, item: any) => {
        const paymentAmount = item?.paymentAmount;
        return paymentAmount === 0 ? '0' : item?.paymentAmount || '-';
      },
    },
    {
      fieldName: 'Payment Currency',
      labelId: 'payout_currency',
      labelTypeCode: 'Label_COM_ReportCenter',
      key: 'payoutCurrency',
      dataIndex: 'payoutCurrency',
      defaultSortOrder: orders?.payoutCurrency?.sortOrder,
      width: width * 0.9,
      render: (text: any, item: any) => {
        const payoutCurrency = item?.payoutCurrency;
        return payoutCurrency || '-';
      },
    },
    {
      fieldName: 'Submission Date',
      labelId: 'app.navigator.task-detail-of-data-capture.label.submission-date',
      labelTypeCode: 'Label_BIZ_Claim',
      key: 'submissionDate',
      dataIndex: 'submission_Date',
      defaultSortOrder: orders?.submission_Date?.sortOrder,
      width: width * 0.9,
      render: (text: any, item: any) => {
        const submissionDate = item?.submissionDate;
        return submissionDate ? moment(submissionDate).format('L') : '-';
      },
    },
    {
      fieldName: 'Close Date',
      labelId: 'app.navigator.taskDetail.inquireForm.label.close-date',
      labelTypeCode: 'Label_BIZ_Claim',
      key: 'closeDate',
      dataIndex: 'close_date',
      sorter: true,
      defaultSortOrder: orders?.close_date?.sortOrder,
      width: width * 0.9,
      render: (text: any, item: any) => {
        const closeDate = item?.closeDate;
        return closeDate ? moment(closeDate).format('L') : '-';
      },
    },
    {
      fieldName: 'Policy No',
      labelId: 'app.navigator.task-detail-of-claim-assessment.beneficiary.label.policy-no',
      labelTypeCode: 'Label_BIZ_Claim',
      dataIndex: 'policyNo',
      key: 'policyNo',
      sorter: true,
      width: width * 0.9,
      defaultSortOrder: orders?.policyNo?.sortOrder,
      render: (text: any, item: any) => get(item, 'policyNo') || '-',
    },
    {
      fieldName: 'Client ID',
      labelId: 'ClientID',
      labelTypeCode: 'Label_BIZ_Claim',
      dataIndex: 'clientId',
      width: width * 0.9,
      render: (text: any) => text || '-',
    },
    {
      fieldName: 'Final Status',
      labelId: 'FinalStatus',
      labelTypeCode: 'Label_COM_Inquiry',
      dataIndex: 'finalStatus',
      width: width * 0.9,
      render: (text: any, item: any) =>
        formatMessageApi({ Dropdown_CAS_FinalStatus: get(item, 'finalStatus') }) || text || '-',
    },
    {
      fieldName: 'Settlement Date',
      labelId: 'Settlement Date',
      labelTypeCode: 'Label_BIZ_Claim',
      dataIndex: 'settlementDate',
      width: width * 0.9,
      render: (text: any, item: any) => {
        const settlementDate = item?.settlementDate;
        return settlementDate ? moment(settlementDate).format('L') : '-';
      },
    },
    {
      fieldName: 'External Settled Date',
      labelId: 'Settlement Date',
      labelTypeCode: 'Label_BIZ_Claim',
      dataIndex: 'externalSettledDate',
      width: width * 0.9,
      render: (text: any, item: any) => {
        const externalSettledDate = item?.externalSettledDate;
        return externalSettledDate ? moment(externalSettledDate).format('L') : '-';
      },
    },
    {
      fieldName: 'Reverse Date',
      labelId: 'Reverse Date',
      labelTypeCode: 'Label_BIZ_Claim',
      dataIndex: 'reverseDate',
      width: width * 0.9,
      render: (text: any, item: any) => {
        const reverseDate = item?.reverseDate;
        return reverseDate ? moment(reverseDate).format('L') : '-';
      },
    },
    {
      fieldName: 'Date Of Incident',
      labelId: 'venus_claim.label.dateOfIncident',
      labelTypeCode: 'Label_BIZ_Claim',
      dataIndex: 'incidentDate',
      width: width * 0.9,
      render: (text: any, item: any) => {
        const incidentDate = item?.incidentDate;
        return incidentDate ? moment(incidentDate).format('L') : '-';
      },
    },
    {
      fieldName: 'Date Of Admission',
      labelId: 'app.navigator.task-detail-of-data-capture.label.date-of-admission',
      labelTypeCode: 'Label_BIZ_Claim',
      dataIndex: 'dateOfAdmission',
      width: width * 0.9,
      render: (text: any, item: any) => {
        const admissionDate = item?.dateOfAdmission;
        return admissionDate ? moment(admissionDate).format('L') : '-';
      },
    },
    {
      fieldName: 'Date Of Discharge',
      labelId: 'app.navigator.task-detail-of-data-capture.label.date-of-discharge',
      labelTypeCode: 'Label_BIZ_Claim',
      dataIndex: 'dateOfDischarge',
      width: width * 0.9,
      render: (text: any, item: any) => {
        const dischargeDate = item?.dateOfDischarge;
        return dischargeDate ? moment(dischargeDate).format('L') : '-';
      },
    },
    {
      fieldName: 'Diagnosis Code',
      labelId: 'app.navigator.task-detail-of-data-capture.label.diagnosis-code',
      labelTypeCode: 'Label_BIZ_Claim',
      dataIndex: 'diagnosisCode',
      width: width * 0.9,
      render: (text: any, item: any) => {
        const diagnosisCode = item?.diagnosisCode;
        return diagnosisCode ? diagnosisCode : '-';
      },
    },
    {
      fieldName: 'Assessor',
      labelId: 'app.navigator.drawer.pending.form.label.Assessor',
      labelTypeCode: 'Label_BIZ_Claim',
      dataIndex: 'assessor',
      width: width * 0.9,
      render: (text: any, item: any) => {
        const assessor = item?.assessor;
        return assessor ? assessor : '-';
      },
    },
  ];

  const columns = filterConfig(config, params);

  return (
    isArray(columns) &&
    map(columns, (el: any, index: number) => {
      const tempParams = params.find(
        (ele: any) => toUpper(ele.fieldName) === toUpper(el.fieldName)
      );
      let sortOrder = tempParams?.defaultSortOrder || orders?.tempParams?.dataIndex?.sortOrder;
      if (tempParams?.dataIndex === saveSort.sortName) {
        sortOrder = sorts[saveSort.sortOrder];
      }
      return {
        title: formatMessageApi({
          [tempParams?.labelTypeCode]: tempParams?.labelId,
        }),
        dataIndex: tempParams?.dataIndex,
        key: tempParams?.key || tempParams?.dataIndex,
        sorter: el.sortable,
        sortOrder,
        className: tempParams?.className,
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
      };
    })
  );
};

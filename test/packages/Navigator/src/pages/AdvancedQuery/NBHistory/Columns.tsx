import React from 'react';
import moment from 'moment';
import lodash, { toUpper, get } from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { filterConfig } from '@/utils/configUtil';
import Label from '@/components/Label/LabelIcon';
import { sorts } from '../TitleMap';
import styles from './index.less';

export default (caseCategory: string, orders: any, config: any, saveSort: any) => {
  // const { handleScale } = resizeWindowHook();

  const width = 130;
  const params = [
    {
      fieldName: 'Policy No.',
      title: formatMessageApi({
        Label_BIZ_Claim:
          'app.navigator.task-detail-of-claim-assessment.beneficiary.label.policy-no',
      }),
      dataIndex: 'policyNo',
      key: 'policyNo',
      sorter: true,
      defaultSortOrder: orders?.policyNo?.sortOrder,
      width,
      className: styles.haveFlag,
      render: (text: any, item: any) => get(item, 'policyNo') || '-',
    },
    {
      fieldName: 'Business No.',
      title: formatMessageApi({
        Label_COM_General: 'BusinessNo',
      }),
      dataIndex: 'business_no',
      key: 'businessNo',
      sorter: true,
      defaultSortOrder: orders?.businessNo?.sortOrder,
      width,
      render: (text: any, item: any) => lodash.get(item, 'inquiryBusinessNo') || '-',
    },
    {
      fieldName: 'Policy Owner',
      title: formatMessageApi({
        Label_BIZ_Individual: 'PolicyOwner',
      }),
      dataIndex: 'policy_owner',
      key: 'policyOwner',
      width,
      defaultSortOrder: orders?.policyOwner?.sortOrder,
      render: (text: any, item: any) => lodash.get(item, 'policyOwner') || '-',
    },
    {
      fieldName: 'Policy Owner ID',
      title: formatMessageApi({
        Label_BIZ_Individual: 'PolicyOwnerID',
      }),
      dataIndex: 'policy_owner_id',
      key: 'policyOwnerId',
      width,
      defaultSortOrder: orders?.policyOwnerId?.sortOrder,
      render: (text: any, item: any) => lodash.get(item, 'policyOwnerId') || '-',
    },
    {
      fieldName: 'Insured Name',
      title: formatMessageApi({
        Label_BIZ_Individual: 'InsuredName',
      }),
      dataIndex: 'insured_name',
      width,
      render: (text: any, item: any) => lodash.get(item, 'insuredName') || '-',
    },
    {
      fieldName: 'Submission Channel',
      title: formatMessageApi({
        Label_COM_Registration: 'SubmissionChannel',
      }),
      dataIndex: 'submission_channel',
      width: width * 1.2,
      render: (text: any, item: any) => {
        return (
          formatMessageApi({
            Dropdown_COM_SubmissionChannel: lodash.get(item, 'submissionChannel'),
            caseCategory,
          }) || '-'
        );
      },
    },
    {
      fieldName: 'Submission Date',
      title: formatMessageApi({
        Label_COM_Registration: 'SubmissionDate',
      }),
      key: 'submissionDate',
      dataIndex: 'submission_date',
      defaultSortOrder: orders?.submissionDate?.sortOrder,
      width: width * 1.2,
      render: (text: any, item: any) => {
        const submissionDate = item?.submissionDate;
        return submissionDate ? moment(submissionDate).format('L') : '-';
      },
    },
    {
      fieldName: 'Initial Payment',
      title: formatMessageApi({ Label_BIZ_Policy: 'InitialPremium' }),
      dataIndex: 'initial_payment',
      width,
      render: (text: any, item: any) => lodash.get(item, 'initialPremium') || '-',
    },
    {
      fieldName: 'UW Decision',
      title: formatMessageApi({ Label_BIZ_Underwriting: 'PolicyLevelDecision' }),
      dataIndex: 'UW_Decision',
      width,
      render: (text: any, item: any) =>
        formatMessageApi({ Dropdown_COM_BusinessDecision: get(item, 'uwDecision') }) || text || '-',
    },
    {
      fieldName: 'Basic Plan',
      title: formatMessageApi({ Label_BIZ_Policy: 'BasicPlan' }),
      dataIndex: 'basic_plan',
      width,
      render: (text: any, item: any) => lodash.get(item, 'basicPlan') || '-',
    },
    {
      fieldName: 'Payment Method',
      title: formatMessageApi({ Label_BIZ_Policy: 'PaymentMethod' }),
      dataIndex: 'payment_method',
      width,
      render: (text: any, item: any) => lodash.get(item, 'paymentMethod') || '-',
    },
    {
      fieldName: 'Final Status',
      title: formatMessageApi({ Label_COM_Inquiry: 'FinalStatus' }),
      dataIndex: 'final_status',
      width,
      render: (text: any, item: any) =>
        formatMessageApi({ Dropdown_CAS_FinalStatus: get(item, 'finalStatus') }) || text || '-',
    },
  ];

  const columns = filterConfig(config, params);

  return lodash.map(columns, (el: any, index: number) => {
    const tempParams = params.find((ele: any) => toUpper(ele.fieldName) === toUpper(el.fieldName));
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
      className: tempParams?.className,
    };
  });
};

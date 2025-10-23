import lodash, { toUpper } from 'lodash';
import moment from 'moment';
import { filterConfig } from '@/utils/configUtil';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { defaultSystem } from 'navigator/utils';

export default (configuration, caseCategory) => {
  const params = [
    {
      fieldName: 'Case No',
      id: 'app.navigator.task-detail-of-data-capture.label.case-no',
      dataIndex: 'related_proc_inst_id',
      key: 'relatedProcInstId',
      sorter: true,
      render: (text, item) => (item.relatedProcInstId ? item.relatedProcInstId : '-'),
    },
    {
      fieldName: 'Case Category',
      id: 'app.navigator.task-detail-of-data-capture.label.case-category',
      dataIndex: 'caseCategory',
      key: 'caseCategory',
      render: (text) => formatMessageApi({ Label_BPM_CaseCategory: text }) || text || '-',
    },
    {
      fieldName: 'Batch No',
      id: 'app.navigator.taskDetail.inquireForm.label.batch-no',
      dataIndex: 'batch_no',
      key: 'batchNo',
      sorter: true,
      render: (text, item) => (item.batchNo ? item.batchNo : '-'),
    },
    {
      fieldName: 'Activity',
      id: 'app.navigator.taskDetail.inquireForm.label.activity-name',
      dataIndex: 'processActivityKey',
      key: 'processActivityKey',
      render: (text) => formatMessageApi({ activity: text, caseCategory }) || '-',
    },
    {
      fieldName: 'Status',
      id: 'app.usermanagement.basicInfo.avatar.status',
      dataIndex: 'taskStatus',
      render: (text) => text || '-',
    },
    {
      fieldName: 'Assignee',
      id: 'app.navigator.taskDetail.inquireForm.label.assignee',
      dataIndex: 'assignee',
      render: (text: any, item: any) =>
        lodash.get(item, 'assigneeName') || lodash.get(item, 'assignee') || defaultSystem(text),
    },
    {
      fieldName: 'Assign By',
      id: 'Assign By',
      dataIndex: 'assignBy',
      render: (text: any, item: any) =>
        lodash.get(item, 'assignByName') || lodash.get(item, 'assignBy') || defaultSystem(text),
    },
    {
      fieldName: 'Assign From',
      id: 'Assign From',
      dataIndex: 'assignFrom',
      render: (text: any, item: any) =>
        lodash.get(item, 'assignFromName') || lodash.get(item, 'assignFrom') || defaultSystem(text),
    },
    {
      fieldName: 'Claim No',
      id: 'BusinessNo',
      dataIndex: 'claimNo',
      key: 'claimNo',
      render: (text) => text || '-',
    },
    {
      fieldName: 'Insured Name',
      id: 'app.navigator.taskDetail.inquireForm.label.insured-name',
      dataIndex: 'insured',
      key: 'insured',
      render: (text) => text || '-',
    },
    {
      fieldName: 'Claim Type',
      id: 'app.navigator.taskDetail.inquireForm.label.claim-type',
      dataIndex: 'claimType',
      render: (text) => text || '-',
    },
    {
      fieldName: 'Identity Type',
      id: 'app.usermanagement.basicInfo.label.identity-type',
      dataIndex: 'identityType',
      render: (text) => text || '-',
    },
    {
      fieldName: 'Identity No',
      id: 'app.usermanagement.basicInfo.label.identity-no',
      dataIndex: 'identityNo',
      render: (text) => text || '-',
    },
    {
      fieldName: 'Date of Incident',
      id: 'app.navigator.task-detail-of-data-capture.label.date-of-incident',
      dataIndex: 'dateOfIncident',
      key: 'dateOfIncident',
      render: (text, item) => {
        const dateOfIncident = lodash.get(item, 'dateOfIncident');
        return dateOfIncident ? moment(dateOfIncident).format('L LT') : '-';
      },
    },
    {
      fieldName: 'Relationship',
      id: 'app.usermanagement.basicInfo.label.relationship',
      dataIndex: 'relationship',
      render: (text) => text || '-',
    },
  ];

  const resultField = [
    { fieldName: 'Case No', sortable: true },
    { fieldName: 'Case Category', sortable: false },
    { fieldName: 'Batch No', sortable: true },
    { fieldName: 'Activity', sortable: false },
    { fieldName: 'Status', sortable: false },
    { fieldName: 'Assignee', sortable: false },
    { fieldName: 'Assign By', sortable: false },
    { fieldName: 'Assign From', sortable: false },
    { fieldName: 'Relationship', sortable: false },
  ];
  const config = configuration?.relationship?.resultField || resultField;
  const columns = filterConfig(config, params);

  return lodash.map(columns, (el: any) => {
    const tempParams = params.find((ele: any) => toUpper(ele.fieldName) === toUpper(el.fieldName));
    return {
      title: ['assignBy', 'assignFrom', 'BusinessNo'].includes(tempParams.id)
        ? formatMessageApi({
            Label_COM_General: tempParams.id,
          })
        : formatMessageApi({
            Label_BIZ_Claim: tempParams.id,
          }),
      dataIndex: tempParams.dataIndex,
      key: tempParams.key || tempParams.dataIndex,
      sorter: el.sortable,
      defaultSortOrder: tempParams?.defaultSortOrder,
      render: tempParams.render,
    };
  });
};

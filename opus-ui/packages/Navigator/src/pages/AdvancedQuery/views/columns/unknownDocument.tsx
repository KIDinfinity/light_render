import lodash from 'lodash';
import moment from 'moment';
import { filterConfig } from '@/utils/configUtil';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { sorts } from '../../TitleMap';

export default (orders: any, config: any, saveSort: any) => {
  const width = 130;
  const params = [
    {
      fieldName: 'Document ID',
      id: 'app.navigator.taskDetail.inquireForm.unknowDoc.doc-id',
      dataIndex: 'doc_id',
      width: width * 3,
      render: (text: string, item: any) => lodash.get(item, 'docId') || '-',
    },
    {
      fieldName: 'Source Document ID',
      id: 'app.navigator.taskDetail.inquireForm.unknowDoc.srcDocId',
      dataIndex: 'src_doc_id',
      width,
      render: (text: string, item: any) => lodash.get(item, 'srcDocId') || '-',
    },
    {
      fieldName: 'Document Type',
      id: 'app.navigator.taskDetail.inquireForm.unknowDoc.doc-type',
      dataIndex: 'doc_type_code',
      width,
      render: (text: string, item: any) =>
        formatMessageApi({
          documentType_i18n: lodash.get(item, 'docTypeCode'),
        }) || '-',
    },
    {
      fieldName: 'Document Classification',
      id: 'app.navigator.taskDetail.inquireForm.unknowDoc.doc-classification',
      width,
      dataIndex: 'classification',
      render: (text: string, item: any) =>
        formatMessageApi({
          Label_DOC_Document: lodash.get(item, 'classification'),
        }) || '-',
    },
    {
      fieldName: 'Case No',
      id: 'app.navigator.task-detail-of-data-capture.label.case-no',
      dataIndex: 'case_no',
      width,
      render: (text, item) => lodash.get(item, 'caseNo'),
    },
    {
      fieldName: 'Case Category',
      id: 'app.navigator.task-detail-of-data-capture.label.case-category',
      dataIndex: 'case_category',
      width,
      render: (text, item) =>
        formatMessageApi({ Label_BPM_CaseCategory: lodash.get(item, 'caseCategory') }) ||
        text ||
        '-',
    },
    {
      fieldName: 'Creation Date',
      id: 'app.navigator.inquire.filters.creation-date',
      dataIndex: 'creation_date',
      render: (text: string, item: any) => {
        const date = lodash.get(item, 'creationDate');
        return date ? moment(date).format('L LTS') : '-';
      },
    },
    {
      fieldName: 'Last Updated Date',
      id: 'app.navigator.taskDetail.inquireForm.unknowDoc.last-updated-date',
      dataIndex: 'gmt_modified',
      render: (text: string, item: any) => {
        const date = lodash.get(item, 'gmtModified');
        return date ? moment(date).format('L') : '-';
      },
    },
    {
      fieldName: 'Import Channel',
      id: 'app.navigator.taskDetail.inquireForm.unknowDoc.import-channel',
      dataIndex: 'submission_channel',
      width,
      render: (text: string, item: any) => lodash.get(item, 'submissionChannel') || '-',
    },
    {
      fieldName: 'Submission Batch',
      id: 'app.navigator.taskDetail.inquireForm.unknowDoc.submission-batch',
      dataIndex: 'batch_no',
      render: (text: string, item: any) => lodash.get(item, 'batchNo') || '-',
    },
  ];

  const columns = filterConfig(config, params);

  return (
    lodash.isArray(columns) &&
    lodash.map(columns, (el) => {
      const temp: any = params.find((ele) => ele.fieldName === el.fieldName);
      let sortOrder =
        lodash.get(temp, 'defaultSortOrder') || lodash.get(orders, 'temp.dataIndex.sortOrder');
      if (temp?.dataIndex === saveSort.sortName) {
        sortOrder = sorts[saveSort.sortOrder];
      }
      return {
        title: formatMessageApi({
          Label_BIZ_Claim: temp.id,
        }),
        dataIndex: temp.dataIndex,
        key: temp.key || temp.dataIndex,
        sorter: el.sortable,
        sortOrder,
        render: temp.render,
      };
    })
  );
};

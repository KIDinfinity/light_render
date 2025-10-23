import React from 'react';
import { Form } from 'antd';
import moment from 'moment';
import FormLayout from 'basic/components/Form/FormLayout';
import { FormItemInput } from 'basic/components/Form/FormItem';
import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';

export default Form.create({
  mapPropsToFields({ caseRelevantSubmissionBatchInfo = {} }: any) {
    return formUtils.mapObjectToFields({
      requestType: caseRelevantSubmissionBatchInfo.requestType || '-',
      submissionChannel: formatMessageApi({
        Dropdown_COM_SubmissionChannel: caseRelevantSubmissionBatchInfo.submissionChannel || '-',
      }),
      submissionDate: caseRelevantSubmissionBatchInfo.submissionDate
        ? moment(caseRelevantSubmissionBatchInfo.submissionDate).format('L')
        : '-',
      submissionTime: caseRelevantSubmissionBatchInfo.submissionTime
        ? moment(caseRelevantSubmissionBatchInfo.submissionTime).format('LTS')
        : '-',
      clientId: caseRelevantSubmissionBatchInfo.clientId || '-',
      clientName: caseRelevantSubmissionBatchInfo.clientName || '-',
    });
  },
})(({ form, caseRelevantSubmissionBatchInfo = {} }: any) => {
  return (
    <div>
      <FormLayout
        json={{
          fieldLayout: {
            xs: { span: 24 },
            sm: { span: 12 },
            md: { span: 12 },
            lg: { span: 12 },
          },
          clientId: {
            layout: {
              xs: { span: 24 },
              sm: { span: 24 },
              md: { span: 24 },
              lg: { span: 24 },
            },
          },
          clientName: {
            layout: {
              xs: { span: 24 },
              sm: { span: 24 },
              md: { span: 24 },
              lg: { span: 24 },
            },
          },
        }}
      >
        <FormItemInput
          form={form}
          disabled
          formName="requestType"
          labelTypeCode="Label_COM_Registration"
          labelId="RequestType"
        />
        <FormItemInput
          form={form}
          disabled
          formName="submissionChannel"
          labelTypeCode="Label_COM_Registration"
          labelId="SubmissionChannel"
        />
        <FormItemInput
          form={form}
          disabled
          formName="submissionDate"
          labelTypeCode="Label_COM_Registration"
          labelId="SubmissionDate"
        />
        <FormItemInput
          form={form}
          disabled
          formName="submissionTime"
          labelTypeCode="Label_COM_Registration"
          labelId="SubmissionTime"
        />
        {caseRelevantSubmissionBatchInfo.clientId && (
          <FormItemInput
            form={form}
            disabled
            name="clientId"
            formName="clientId"
            labelTypeCode="Label_BIZ_Individual"
            labelId="ClientId"
          />
        )}
        {caseRelevantSubmissionBatchInfo.clientName && (
          <FormItemInput
            form={form}
            disabled
            name="clientName"
            formName="clientName"
            labelTypeCode="Label_BIZ_Individual"
            labelId="ClientName"
          />
        )}
      </FormLayout>
    </div>
  );
});

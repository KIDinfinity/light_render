import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import { connect } from 'dva';
import React from 'react';
import Section, { Fields } from '../Sections';

const VoiceRecord = ({ form, showOnly = true, data }) => {
  return (
    <Section
      form={form}
      showOnly={showOnly}
      register={!showOnly}
      editable={false}
      section="VoiceRecord-Field"
      formId="VoiceRecord-Field"
    >
      <Fields.ErrorCode />
      <Fields.Remark />
      <Fields.VoiceRecordingLink link={data?.voiceRecordingLink} />
      <Fields.VoiceResult />
    </Section>
  );
};
export default connect()(
  Form.create<any>({
    onFieldsChange() {},
    mapPropsToFields(props: any) {
      const { data } = props;
      return formUtils.mapObjectToFields({
        ...data,
        remark: data?.voiceRemark,
        errorCode: data?.voiceErrorCode,
        voiceRecordingLink: 'Voice Recording Link',
      });
    },
  })(VoiceRecord)
);

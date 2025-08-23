import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import { connect } from 'dva';
import React from 'react';
import Section, { Fields } from '../Sections';

const VoiceRecord = ({ form, showOnly = true, data }: any) => {
  return (
    <Section
      form={form}
      showOnly={showOnly}
      register={!showOnly}
      editable={false}
      section="VoiceRecord-Field"
      formId="VoiceRecord-Field"
    >
      <Fields.VoiceResult />
      <Fields.ErrorCode />
      <Fields.VoiceRecordingLink
        link={data?.voiceRecordingLink}
        applicationNo={data?.applicationNo}
      />
      <Fields.VoiceLinkEnrollment agentId={data?.agentNo} applicationNo={data?.applicationNo} />
      <Fields.Remark />
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
        voiceRecordingLink: 'Audio Link Online',
        voiceLinkEnrollment: 'Audio Link Enrollment',
      });
    },
  })(VoiceRecord)
);

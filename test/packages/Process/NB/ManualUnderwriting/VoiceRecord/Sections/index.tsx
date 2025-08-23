/*
 * @Author: Hugo 224311@hk.fwd.com
 * @Date: 2024-04-26 09:54:24
 * @LastEditors: Hugo 224311@hk.fwd.com
 * @LastEditTime: 2024-04-29 11:38:28
 * @FilePath: /Venus-UI/packages/Process/NewBusiness/ManualUnderwriting/Pages/VoiceRecord/Sections/Fields/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Form } from 'antd';
import { FixedFieldLayout, FormRegister } from 'basic/components/Form';
import useGetSectionConfigWithCondition from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetSectionConfigWithCondition';
import React from 'react';
import ErrorCode, { fieldConfig as errorCodeConfig } from './Fields/ErrorCode';
import Remark, { fieldConfig as remarkConfig } from './Fields/Remark';
import VoiceRecordingLink, {
  fieldConfig as voiceRecordingLinkConfig,
} from './Fields/VoiceRecordingLink';
import VoiceResult, { fieldConfig as voiceResultConfig } from './Fields/VoiceResult';
import VoiceLinkEnrollment, {
  fieldConfig as voiceLinkEnrollmentConfig,
} from './Fields/VoiceLinkEnrollment';

const Fields = {
  ErrorCode,
  Remark,
  VoiceRecordingLink,
  VoiceResult,
  VoiceLinkEnrollment,
};

const localSectionConfig = {
  section: 'VoiceRecord-Field',
  'section-props': {
    label: {
      dictTypeCode: '',
      dictCode: '',
    },
    visible: 'Y',
    'x-layout': {
      xs: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 576px
      sm: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 768px
      md: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 992px
      lg: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1200px
      xl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1600px
      xxl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 1,
      },
    },
  },
};

const localConfig = {
  configs: [
    localSectionConfig,
    voiceRecordingLinkConfig,
    errorCodeConfig,
    voiceResultConfig,
    remarkConfig,
    voiceLinkEnrollmentConfig,
  ],
  remote: false,
};
const SectionLayout = ({ form, showOnly, config, layoutName, children }: any) => (
  <FixedFieldLayout form={form} showOnly={showOnly} config={config} layoutName={layoutName}>
    {children}
  </FixedFieldLayout>
);

const FormSection = ({ form, showOnly, section, layoutName, children, register, formId }: any) => {
  const config = useGetSectionConfigWithCondition({
    section,
    localConfig,
    condition: !showOnly ? 'proposal' : 'mw',
  });

  return (
    <div>
      <FormRegister form={form} register={register} formId={formId} showOnly={showOnly}>
        <Form layout="vertical">
          <SectionLayout layoutName={layoutName} form={form} config={config} showOnly={showOnly}>
            {children}
          </SectionLayout>
        </Form>
      </FormRegister>
    </div>
  );
};
const Section = ({
  form,
  showOnly,
  editable,
  children,
  layoutName,
  section,
  register,
  id,
  formId,
}: any) => (
  <FormSection
    section={section}
    showOnly={showOnly}
    layoutName={layoutName}
    form={form}
    register={register}
    formId={formId}
  >
    {React.Children.map(children, (child: any) =>
      React.cloneElement(child, { form, editable, section, id, showOnly })
    )}
  </FormSection>
);

export { Fields, localConfig };
export default Section;

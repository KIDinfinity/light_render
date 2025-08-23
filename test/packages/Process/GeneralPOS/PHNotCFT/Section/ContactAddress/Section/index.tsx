import React from 'react';
import { Form } from 'antd';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import { FixedFieldLayout, FormRegister } from 'basic/components/Form';
import Fields, { localFieldConfigs as FieldConfigs } from './Fields';
import { formatMessageApi } from '@/utils/dictFormatMessage';

const localSectionConfig = {
  // atomGroupCode: 'PH_POS_CTG001.PH_POS_ACT001',
  // caseCategory: 'PH_POS_CTG001',
  // activityCode: 'PH_POS_ACT001',
  section: 'ContactAddress',
  'section-props': {
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'venus_claim.phowb.dataCapture.label.currentContactAddress.insuredInformation',
    },
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 576px
      sm: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 768px
      md: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 992px
      lg: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1200px
      xl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1600px
      xxl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 1,
      },
    },
  },
};

const localConfig = {
  configs: [localSectionConfig, ...FieldConfigs],
  remote: false,
};

const SectionLayout = ({ config, layoutName, form, children }: any) => (
  <FixedFieldLayout config={config} layoutName={layoutName} form={form}>
    {children}
  </FixedFieldLayout>
);

const FormSection = ({ form, section, layoutName, register, children }: any) => {
  const config = useGetSectionAtomConfig({
    section,
    localConfig,
  });
  return (
    <div>
      <FormRegister form={form} register={register}>
        <Form layout="vertical">
          <SectionLayout layoutName={layoutName} form={form} config={config}>
            {children}
          </SectionLayout>
        </Form>
      </FormRegister>
    </div>
  );
};

const SectionTitle = () => {
  return formatMessageApi({ 'Label_BIZ_Claim': 'venus_claim.phowb.dataCapture.label.currentContactAddress.insuredInformation'})
};

const Section = ({
  form,
  editable,
  children,
  layoutName,
  section,
}: any) => (
  <FormSection
    section={section}
    layoutName={layoutName}
    form={form}
  >
    {React.Children.map(children, (child: any) =>
      React.cloneElement(child, { form, editable, section })
    )}
  </FormSection>
);

export { Fields, localConfig, SectionTitle };

export default Section;

import React from 'react';
import { Form } from 'antd';
import { FormRegister, FixedFieldLayout } from 'basic/components/Form';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import Productname, { fieldConfig as productNameConfig } from './Fields/Productname';
import Name, { fieldConfig as nameConfig } from './Fields/Name';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';

const localSectionConfig = {
  section: 'Exclusion-Popup',
  'section-props': {
    label: {
      dictTypeCode: '',
      dictCode: '',
    },
    visible: 'N',
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
  configs: [localSectionConfig, productNameConfig, nameConfig],
  remote: true,
};
const SectionLayout = ({ config, layoutName, form, children }: any) => (
  <FixedFieldLayout config={config} layoutName={layoutName} form={form}>
    {children}
  </FixedFieldLayout>
);
const FormSection = ({ section, form, layoutName, children, register }: any) => {
  const config = useGetSectionAtomConfig({
    section,
    localConfig,
  });
  return (
    <div>
      <FormRegister form={form} register={register} namespace={NAMESPACE}>
        <Form layout="vertical">
          <SectionLayout layoutName={layoutName} form={form} config={config}>
            {children}
          </SectionLayout>
        </Form>
      </FormRegister>
    </div>
  );
};

const Section = ({ form, editable, children, layoutName, section, register }: any) => (
  <FormSection section={section} form={form} layoutName={layoutName} register={register}>
    {React.Children.map(children, (child: any) =>
      React.cloneElement(child, { form, editable, section })
    )}
  </FormSection>
);

const Exclusionpopup = ({ form, editable, children }: any) => (
  <Section section="Exclusion-Popup" form={form} editable={editable}>
    {React.Children.map(children, (child: any) =>
      React.cloneElement(child, { form, editable, section: 'Exclusion-Popup' })
    )}
  </Section>
);
const Fields = {
  Productname,

  Name,
};

export { Fields, localConfig };
export default Exclusionpopup;

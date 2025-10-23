import React from 'react';
import { Form } from 'antd';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';

import { FormRegister, FixedFieldLayout } from 'basic/components/Form';

import Fields, { localFieldConfigs as FieldConfigs } from './Fields';

const localSectionConfig = {
  section: 'CharityOrganization-Table',
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
  configs: [localSectionConfig, ...FieldConfigs],
  remote: true,
};

const SectionLayout = ({ form, showOnly, config, layoutName, children }: any) => (
  <FixedFieldLayout form={form} showOnly={showOnly} config={config} layoutName={layoutName}>
    {children}
  </FixedFieldLayout>
);

const FormSection = ({ form, showOnly, section, layoutName, children, register, formId }: any) => {
  const config = useGetSectionAtomConfig({
    section,
    localConfig,
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
      React.cloneElement(child, { form, editable, section, id })
    )}
  </FormSection>
);

export { Fields, localConfig };
export default Section;

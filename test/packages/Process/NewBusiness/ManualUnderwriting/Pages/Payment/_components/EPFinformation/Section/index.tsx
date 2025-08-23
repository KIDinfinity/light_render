import React from 'react';
import { Form } from 'antd';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import { FormRegister, ElementConfig, FixedFieldLayout } from 'basic/components/Form';

import Fields, { localFieldConfigs as FieldConfigs } from './Fields';

const localSectionConfig = {
  section: 'EPFInformation-Field',
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
  console.log('config', section,localConfig,config);
  return (
    <div>
      <FormRegister form={form} register={register} formId={formId}>
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

const SectionColumns = ({
  render,
  layoutName,
  defaultExpand = false,
  showArrow,
  onArrow,
  expand,
}: any) => (
  <ElementConfig.SectionColumns
    section={localSectionConfig.section}
    config={localConfig}
    render={render}
    layoutName={layoutName}
    showArrow={showArrow}
    defaultExpand={defaultExpand}
    onArrow={onArrow}
    expand={expand}
  />
);

export { Fields, localConfig, SectionColumns };
export default Section;

import React from 'react';
import { Form } from 'antd';
import { ElementConfig, TableLayout, TableRowLayout, FormRegister } from 'basic/components/Form';
import Fields, { localFieldConfigs as FieldConfigs } from './Fields';

const localSectionConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'BeneficiaryChange',
  'section-props': {
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'AddressChangeInfo',
    },
    visible: 'C',
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
  remote: true,
};
const SectionLayout = ({ config, layoutName, form, children, tableCollect }: any) => (
  <TableRowLayout config={config} layoutName={layoutName} form={form} tableCollect={tableCollect}>
    {children}
  </TableRowLayout>
);

const FormSection = ({ form, section, layoutName, children, tableCollect }: any) => (
  <div>
    <FormRegister form={form}>
      <Form layout="vertical">
        <ElementConfig.Section section={section} config={localConfig}>
          <SectionLayout layoutName={layoutName} form={form} tableCollect={tableCollect}>
            {children}
          </SectionLayout>
        </ElementConfig.Section>
      </Form>
    </FormRegister>
  </div>
);

const SectionTitle = ({ prefix, suffix }: any) => {
  return (
    <ElementConfig.SectionTitle
      section={localSectionConfig.section}
      config={localConfig}
      prefix={prefix}
      suffix={suffix}
    />
  );
};

const Section = ({ form, editable, children, layoutName, section, tableCollect }: any) => (
  <FormSection section={section} layoutName={layoutName} form={form} tableCollect={tableCollect}>
    {React.Children.map(children, (child: any) =>
      React.cloneElement(child, { form, editable, section })
    )}
  </FormSection>
);

const SectionTable = ({
  section,
  config,
  dataSource,
  onChange,
  children,
  check,
  disabled,
  className,
  classNameHeader,
}: any) => (
  <ElementConfig.Section section={section} config={config}>
    <TableLayout
      dataSource={dataSource}
      onChange={onChange}
      check={check}
      disabled={disabled}
      classNameHeader={classNameHeader}
    >
      <TableLayout.Row className={className}>{children}</TableLayout.Row>
    </TableLayout>
  </ElementConfig.Section>
);

export { Fields, SectionTitle, SectionTable, localConfig, localSectionConfig };

export default Section;

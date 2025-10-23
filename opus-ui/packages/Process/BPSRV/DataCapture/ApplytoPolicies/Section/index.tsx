import React from 'react';
import { Form } from 'antd';
import { ElementConfig, TableLayout, TableRowLayout, FormRegister } from 'basic/components/Form';
import Fields, { localFieldConfigs as FieldConfigs, whiteList } from './Fields';
import { localSectionConfig, remote } from './Section.config';

const localConfig = {
  configs: [localSectionConfig, ...FieldConfigs],
  whiteList,
  remote,
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
  initCheck,
  check,
  disabled,
}: any) => (
  <ElementConfig.Section section={section} config={config}>
    <TableLayout
      dataSource={dataSource}
      onChange={onChange}
      initCheck={initCheck}
      check={check}
      disabled={disabled}
    >
      <TableLayout.Row>{children}</TableLayout.Row>
    </TableLayout>
  </ElementConfig.Section>
);

export { Fields, SectionTitle, SectionTable, localConfig, localSectionConfig };

export default Section;

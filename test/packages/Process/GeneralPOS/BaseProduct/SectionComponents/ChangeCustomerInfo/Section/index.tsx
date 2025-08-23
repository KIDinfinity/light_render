import React from 'react';
import { Form } from 'antd';
import {
  ElementConfig,
  TableLayout,
  TableRowLayout,
  FormRegister,
  FixedFieldLayout,
} from 'basic/components/Form';
import Fields, { localFieldConfigs as FieldConfigs } from './Fields';
import useGetSectionAtomConfigByRemote from 'basic/components/Elements/hooks/useGetSectionAtomConfigByRemote';

const localSectionConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'ChangeCustomerInformation',
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

const FormSectionDefault = ({ form, section, layoutName, children, layout, formId }: any) => {
  const config = useGetSectionAtomConfigByRemote({
    section,
    localConfig,
  });
  return (
    <div>
      <FormRegister formId={formId} form={form}>
        <Form layout={!!layout ? layout : 'vertical'}>
          <FixedFieldLayout config={config} layoutName={layoutName} form={form}>
            {children}
          </FixedFieldLayout>
        </Form>
      </FormRegister>
    </div>
  );
};

const FormSection = ({ form, section, layoutName, children, tableCollect, formId }: any) => {
  const config = useGetSectionAtomConfigByRemote({
    section,
    localConfig,
  });

  return (
    <div>
      <FormRegister formId={formId} form={form}>
        <Form layout="vertical">
          <TableRowLayout
            config={config}
            layoutName={layoutName}
            form={form}
            tableCollect={tableCollect}
          >
            {children}
          </TableRowLayout>
        </Form>
      </FormRegister>
    </div>
  );
};

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

const Section = ({ form, editable, children, layoutName, section, tableCollect, formId }: any) => (
  <FormSection
    section={section}
    layoutName={layoutName}
    form={form}
    formId={formId}
    tableCollect={tableCollect}
  >
    {React.Children.map(children, (child: any) =>
      React.cloneElement(child, { form, editable, section })
    )}
  </FormSection>
);

const SectionDafault = ({
  form,
  editable,
  children,
  layoutName,
  section,
  tableCollect,
  layout,
  formId,
}: any) => (
  <FormSectionDefault
    section={section}
    layoutName={layoutName}
    form={form}
    layout={layout}
    tableCollect={tableCollect}
    formId={formId}
  >
    {React.Children.map(children, (child: any) =>
      React.cloneElement(child, { form, editable, section })
    )}
  </FormSectionDefault>
);
const SectionTable = ({
  section,
  dataSource,
  onChange,
  children,
  check,
  disabled,
  className,
  classNameHeader,
  classNameHeaderRow,
  rowKey,
  ...props
}: any) => {
  const config = useGetSectionAtomConfigByRemote({
    section,
    localConfig,
  });

  return (
    <TableLayout
      dataSource={dataSource}
      onChange={onChange}
      check={check}
      disabled={disabled}
      classNameHeader={classNameHeader}
      classNameHeaderRow={classNameHeaderRow}
      {...props}
      config={config}
    >
      <TableLayout.Row className={className} rowKey={rowKey}>
        {children}
      </TableLayout.Row>
    </TableLayout>
  );
};

export { Fields, SectionTitle, SectionTable, localConfig, localSectionConfig, SectionDafault };

export default Section;

import React from 'react';
import { Form, Icon } from 'antd';
import { FormRegister, FixedFieldLayout, TableLayout, TableRowLayout } from 'basic/components/Form';
import lodash from 'lodash';
import styles from './index.less';
import classNames from 'classnames';

const FormSection = ({ form, formId, layoutName, children, config, register, readOnly }: any) => {
  return (
    <div className={classNames({ [styles.readOnly]: readOnly })}>
      <FormRegister
        form={form}
        register={lodash.isBoolean(register) ? register : !readOnly}
        formId={formId}
      >
        <Form layout="vertical">
          <FixedFieldLayout config={config} layoutName={layoutName} form={form} showOnly={readOnly}>
            {children}
          </FixedFieldLayout>
        </Form>
      </FormRegister>
    </div>
  );
};

const TableFormSection = ({
  form,
  formId,
  layoutName,
  children,
  config,
  register,
  readOnly,
  tableCollect,
}: any) => {
  return (
    <div className={classNames({ [styles.readOnly]: readOnly })}>
      <FormRegister
        form={form}
        register={lodash.isBoolean(register) ? register : !readOnly}
        formId={formId}
      >
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

const SectionIcon = ({ icon }: any) => {
  if (lodash.isEmpty(icon)) {
    return null;
  }

  let Content: any = <></>;
  if (lodash.isString(icon)) {
    Content = () => <Icon type={icon} />;
  }
  if (React.isValidElement(icon)) {
    Content = () => icon;
  }
  return (
    <div className={styles.icon}>
      <Content />
    </div>
  );
};

const BusinessSection = ({
  config,
  form,
  editable,
  children,
  layoutName,
  section,
  formId,
  readOnly,
  icon,
  register,
}: any) => {
  return (
    <div className={styles.formContainer}>
      <SectionIcon icon={icon} />
      <div className={styles.infoWrap}>
        <FormSection
          section={section}
          layoutName={layoutName}
          form={form}
          formId={formId}
          config={config}
          register={register}
          readOnly={readOnly}
        >
          {React.Children.map(children, (child: any) =>
            React.cloneElement(child, { form, editable, section, readOnly })
          )}
        </FormSection>
      </div>
    </div>
  );
};
const TableBusinessSection = ({
  config,
  form,
  editable,
  children,
  layoutName,
  section,
  formId,
  readOnly,
  icon,
  register,
  tableCollect,
}: any) => {
  return (
    <TableFormSection
      section={section}
      layoutName={layoutName}
      form={form}
      formId={formId}
      config={config}
      register={register}
      readOnly={readOnly}
      tableCollect={tableCollect}
    >
      {React.Children.map(children, (child: any) =>
        React.cloneElement(child, { form, editable, section, readOnly })
      )}
    </TableFormSection>
  );
};

const TableSection = ({
  config,
  dataSource,
  onChange,
  children,
  check,
  disabled,
  className,
  classNameHeader,
  classNameHeaderRow,
  tableCollect = () => {},
  rowKey,
  ...props
}: any) => (
  <TableLayout
    tableCollect={tableCollect}
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

export { TableSection, BusinessSection, TableFormSection, TableBusinessSection };
export default BusinessSection;

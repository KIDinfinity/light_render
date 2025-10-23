import React from 'react';
import { Col } from 'antd';
import { Authority, Editable, FormItemNumber, Required } from 'basic/components/Form';

const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'JPAC',
  field: 'expense',
  'field-props': {
    editable: 'Y',
    label: {
      dictTypeCode: 'Label_COM_Opus',
      dictCode: 'Expense',
    },
    required: 'Y',
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 3,
        offset: 15,
        pull: 15,
        order: 4,
      },
      // 576px
      sm: {
        span: 3,
        offset: 15,
        pull: 15,
        order: 4,
      },
      // 768px
      md: {
        span: 3,
        offset: 15,
        pull: 15,
        order: 4,
      },
      // 992px
      lg: {
        span: 3,
        offset: 15,
        pull: 15,
        order: 4,
      },
      // 1200px
      xl: {
        span: 3,
        offset: 15,
        pull: 15,
        order: 4,
      },
      // 1600px
      xxl: {
        span: 3,
        offset: 15,
        pull: 15,
        order: 4,
      },
    },
  },
};

export { localFieldConfig };

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  return (
    isShow && (
      <Col {...layout}>
        <FormItemNumber
          disabled={(config.editable || fieldProps.editable) === Editable.No || !editable}
          form={form}
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={(config.required || fieldProps.required) === Required.Yes}
          precision={0}
        />
      </Col>
    )
  );
};

const Expense = ({ field, config, form, editable, layout, isShow }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
    />
  </Authority>
);
Expense.displayName = localFieldConfig.field;

export default Expense;

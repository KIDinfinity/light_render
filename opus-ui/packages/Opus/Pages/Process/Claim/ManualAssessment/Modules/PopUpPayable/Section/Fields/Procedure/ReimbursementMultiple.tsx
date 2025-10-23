import React from 'react';
import { Col } from 'antd';
import { Authority, Visible, Editable, Required, FormItemNumber } from 'basic/components/Form';

const localFieldConfig = {
  section: 'PopUpPayable.Procedure',
  field: 'reimbursementMultiple',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'N',
    label: {
      dictTypeCode: 'Label_CLM_Opus',
      dictCode: 'reimbursementPercentage',
    },
    'x-layout': {
      //  TODO: 动态layout
      // 480px
      xs: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 576px
      sm: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 768px
      md: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 992px
      lg: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 1200px
      xl: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 1600px
      xxl: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 4,
      },
    },
  },
};

export { localFieldConfig };

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = true;
  const editableConditions = true;
  const requiredConditions = true;

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemNumber
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? !editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={
            config?.required === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          precision={2}
          min={-Number.MAX_VALUE}
          max={100}
          pattern={
            /^(-\d{1,9}(\.99|\.9[0-8]*|\.[0-8]\d*)?)|(\d{1,9}(\.99|\.9[0-8]*|\.[0-8]\d*)?)$/g
          }
          labelType="inline"
        />
      </Col>
    )
  );
};

const ReimbursementMultiple = ({ field, config, isShow, layout, form, editable }: any) => (
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

ReimbursementMultiple.displayName = 'ReimbursementMultiple';

export default ReimbursementMultiple;

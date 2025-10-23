import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemNumber,
  Required,
  Visible,
  Rule,
} from 'basic/components/Form';
import lodash from 'lodash';

export const fieldConfig = {
  section: 'OtherProcedure.Payable',
  field: 'numberOfReasonMonths',
  'field-props': {
    visible: 'C',
    'visible-condition': {
      combine: '&&',
      conditions: [
        {
          left: {
            domain: 'field',
            field: 'benefitItemCode',
          },
          operator: '===',
          right: '464',
        },
      ],
    },
    editable: 'N',
    required: 'N',
    label: {
      dictTypeCode: 'Label_CLM_Opus',
      dictCode: 'numberOfReasonMonths',
    },
    expand: 'N',
    // 'x-rules': ['VLD_000755'],
    'x-layout': {
      //  TODO: 动态layout
      // 480px
      xs: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 576px
      sm: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 768px
      md: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 992px
      lg: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 1200px
      xl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 1600px
      xxl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 7,
      },
    },
  },
};

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  otherProcedureId,
}: any) => {
  const fieldProps: any = fieldConfig['field-props'];

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = true;
  const requiredConditions = true;

  const Rules = {};

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
          pattern={/^[1-9]\d*$/}
          hiddenPrefix
          precision={0}
          rules={lodash.compact(
            (config?.rules || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
        />
      </Col>
    )
  );
};

const NumberOfReasonMonths = ({
  field,
  config,
  isShow,
  layout,
  form,
  editable,
  otherProcedureId,
}: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      otherProcedureId={otherProcedureId}
    />
  </Authority>
);

NumberOfReasonMonths.displayName = fieldConfig.field;

export default NumberOfReasonMonths;

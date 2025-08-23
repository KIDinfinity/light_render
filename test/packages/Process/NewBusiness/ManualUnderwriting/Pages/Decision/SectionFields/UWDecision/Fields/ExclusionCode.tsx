import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemSelect,
  Required,
  Visible,
  RuleByForm,
} from 'basic/components/Form';

export const fieldConfig = {
  section: 'UWDecision',
  field: 'code',
  'field-props': {
    label: {
      dictTypeCode: 'Label_BIZ_Policy',
      dictCode: 'ExclusionCode',
    },
    expand: 'Y',
    editable: 'Y',
    required: 'Y',
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 52,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 52,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 52,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 52,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 52,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 52,
      },
    },
    'x-dict': {
      dictTypeCode: '',
    },
  },
};

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const visibleConditions = true;
  const editableConditions = !RuleByForm(fieldProps['editable-condition'], form);
  const requiredConditions = true;

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          dicts={[
            {
              typeCode: 'Dropdown_POL_ExclusionCode',
              dictCode: '001',
              dictName: '001',
            },
            {
              typeCode: 'Dropdown_POL_ExclusionCode',
              dictCode: '002',
              dictName: '002',
            },
            {
              typeCode: 'Dropdown_POL_ExclusionCode',
              dictCode: '003',
              dictName: '003',
            },
            {
              typeCode: 'Dropdown_POL_ExclusionCode',
              dictCode: '004',
              dictName: '004',
            },
          ]}
          form={form}
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={
            config?.required === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          isInline
          hiddenPrefix
          precision={0}
          placeholder=" "
        />
      </Col>
    )
  );
};

const ExclusionCode = ({ field, config, form, editable, layout, isShow }: any) => (
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

ExclusionCode.displayName = 'Code';

export default ExclusionCode;

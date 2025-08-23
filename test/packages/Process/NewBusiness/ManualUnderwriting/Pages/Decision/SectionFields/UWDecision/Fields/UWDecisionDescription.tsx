import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemAutoSizeTextArea,
  Required,
  Visible,
  RuleByForm,
} from 'basic/components/Form';
import useGetPreDefineDecision from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useGetPreDefineDecision';

export const fieldConfig = {
  section: 'UWDecision',
  field: 'reasonDescription',
  'field-props': {
    visible: 'C',
    'visible-condition': {
      combine: '||',
      conditions: [
        {
          left: { domain: '', field: 'decisionCode' },
          operator: 'in',
          right: ['D', 'P'],
        },
      ],
    },
    editable: 'Y',
    required: 'C',
    'required-condition': {
      combine: '||',
      conditions: [
        {
          left: { domain: '', field: 'decisionCode' },
          operator: 'in',
          right: ['D', 'P'],
        },
      ],
    },
    label: {
      dictTypeCode: 'Label_BIZ_Underwriting',
      dictCode: 'UWDecisionDescription',
    },
    expand: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 9,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 576px
      sm: {
        span: 9,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 768px
      md: {
        span: 9,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 992px
      lg: {
        span: 9,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 1200px
      xl: {
        span: 9,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 1600px
      xxl: {
        span: 9,
        offset: 0,
        pull: 0,
        order: 4,
      },
    },
    'x-dict': {
      dictTypeCode: '',
    },
  },
};

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = fieldConfig['field-props'];

  const visibleConditions = RuleByForm(fieldProps['visible-condition'], form, '');
  const editableConditions = !RuleByForm(fieldProps['editable-condition'], form);
  const requiredConditions = RuleByForm(fieldProps['required-condition'], form, '');
  const preDefineDecision = useGetPreDefineDecision();
  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemAutoSizeTextArea
          disabled={
            preDefineDecision ||
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? editableConditions
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
          hiddenPrefix
          precision={0}
          placeholder=" "
          maxLength={1000}
          autoSize={true}
        />
      </Col>
    )
  );
};

const UWDecisionDescription = ({ field, config, form, editable, layout, isShow }: any) => (
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

UWDecisionDescription.displayName = 'reasonDescription';

export default UWDecisionDescription;

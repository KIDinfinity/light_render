import React from 'react';
import { Col } from 'antd';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import {
  Authority,
  Editable,
  FormItemSelect,
  Required,
  Visible,
  RuleByForm,
} from 'basic/components/Form';
import useGetPreDefineDecision from 'process/NB/ManualUnderwriting/_hooks/useGetPreDefineDecision';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import useHandlePolicyReasonChangeCallback from 'process/NB/ManualUnderwriting/_hooks/useHandlePolicyReasonChangeCallback';

export const fieldConfig = {
  section: 'UWDecision',
  field: 'reason',
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
      dictCode: 'UWDecisionReason',
    },
    expand: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 576px
      sm: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 768px
      md: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 992px
      lg: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1200px
      xl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1600px
      xxl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 2,
      },
    },
    'x-dict': {
      dictTypeCode: '',
    },
  },
};

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const allReasonConfigList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.allReasonConfigList,
    shallowEqual
  );
  const preDefineDecision = useGetPreDefineDecision();

  const visibleConditions = RuleByForm(fieldProps['visible-condition'], form, '');
  const editableConditions = !RuleByForm(fieldProps['editable-condition'], form);
  const requiredConditions = RuleByForm(fieldProps['required-condition'], form, '');
  const handleChange = useHandlePolicyReasonChangeCallback();
  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={allReasonConfigList}
          dictCode="reasonCode"
          dictName="reasonName"
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
          optionShowType="both"
          required={
            config?.required === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          hiddenPrefix
          precision={0}
          placeholder=" "
          onChange={handleChange}
        />
      </Col>
    )
  );
};

const Reason = ({ field, config, form, editable, layout, isShow }: any) => (
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

Reason.displayName = 'reason';

export default Reason;

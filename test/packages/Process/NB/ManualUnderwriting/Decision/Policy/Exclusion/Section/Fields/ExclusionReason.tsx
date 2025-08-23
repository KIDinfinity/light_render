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
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import { fieldConfig } from './ExclusionReason.config';

export { fieldConfig } from './ExclusionReason.config';

const FormItem = ({ isShow, editable, field, config, layout, form }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const exclusionReasonList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.exclusionReasonList,
    shallowEqual
  );

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
          dicts={exclusionReasonList}
          disabled={
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
          dictCode={fieldProps['x-dict'].dictTypeCode}
          dictName={fieldProps['x-dict'].dictTypeName}
          optionShowType="both"
        />
      </Col>
    )
  );
};

const ExclusionReason = ({ field, config, form, editable, isShow, layout }: any) => {
  return (
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
};

ExclusionReason.displayName = fieldConfig.field;

export default ExclusionReason;

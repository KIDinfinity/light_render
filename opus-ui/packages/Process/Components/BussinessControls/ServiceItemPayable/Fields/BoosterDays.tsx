import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Visible,
  Editable,
  Required,
  FormItemNumber,
  Rule,
} from 'basic/components/Form';
import HandleRecoverHook from '../Hook/HandleRecoverHook';

import { localFieldConfig } from './BoosterDays.config';

export { localFieldConfig } from './BoosterDays.config';

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  NAMESPACE,
  boosterEditable,
  booster,
}: any) => {
  const fieldProps: any = config || localFieldConfig['field-props'];

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '') && !boosterEditable;
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  const handleRecover = HandleRecoverHook({ NAMESPACE, id: booster?.id });

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
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label?.dictTypeCode}
          required={
            config?.required === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          labelType="inline"
          placeholder
          precision={0}
          recoverValue={booster?.systemPayableDays || 0}
          OnRecover={() => handleRecover(field, booster?.id)}
          onHover={true}
          max={config?.max || fieldProps.max}
          min={config?.min || fieldProps.min}
        />
      </Col>
    )
  );
};

const BoosterDays = ({ field, config,
  isShow,
  layout,
  form,
  editable,
  NAMESPACE,
  id,
  boosterEditable,
  booster,
}: any) => (
  <Authority>
    <FormItem
      field={field} config={config} isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      NAMESPACE={NAMESPACE}
      id={id}
      boosterEditable={boosterEditable}
      booster={booster}
    />
  </Authority>
);

BoosterDays.displayName = 'boosterDays';

export default BoosterDays;

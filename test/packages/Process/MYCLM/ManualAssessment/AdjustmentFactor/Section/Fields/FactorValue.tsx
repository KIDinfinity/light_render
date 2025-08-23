import React from 'react';
import { NAMESPACE } from '../../../activity.config';

import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemNumber,
  Required,
  Rule,
  Visible,
} from 'basic/components/Form';
import { localFieldConfig } from './FactorValue.config';

export { localFieldConfig } from './FactorValue.config';

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = Rule(fieldProps['visible-condition'], form, NAMESPACE);
  const editableConditions = false;
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
          maxLength={config?.maxLength || fieldProps.maxLength}
          required={
            (config.required || fieldProps.required) === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          labelType="inline"
          placeholder=""
          min={0}
          max={100}
          suffix={<div className={'calculationSvg'}>%</div>}
        />
      </Col>
    )
  );
};

const CriticalIllnessName = ({ field, config, isShow, layout, form, editable, }: any) => (
  <Authority>
    <FormItem field={field} config={config} isShow={isShow} layout={layout} form={form} editable={editable} />
  </Authority>
);

CriticalIllnessName.displayName = localFieldConfig.field;

export default CriticalIllnessName;

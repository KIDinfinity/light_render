import React from 'react';
import { Col } from 'antd';
import { Authority, Visible, Editable, Required, FormItemSelect, Rule } from 'basic/components/Form';
import { useSelector } from 'dva';

import { localFieldConfig } from './CostCentre.config';

export { localFieldConfig } from './CostCentre.config';

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = config || localFieldConfig['field-props'];

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');
  const isAssurance = useSelector(
    ({ processTask }: any) => processTask.getTask?.companyCode === 'Assurance'
  );
  const dicts = isAssurance? [{
    dictCode: 'PCP',
    dictName: 'PCP'
  }] : [{
    dictCode:'020112',
    dictName:'020112'
  }]
  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={dicts}
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
        />
      </Col>
    )
  );
};

const CostCentre = ({ field, config, isShow, layout, form, editable, id, NAMESPACE }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      id={id}
      NAMESPACE={NAMESPACE}
    />
  </Authority>
);

CostCentre.displayName = 'CostCentre';

export default CostCentre;

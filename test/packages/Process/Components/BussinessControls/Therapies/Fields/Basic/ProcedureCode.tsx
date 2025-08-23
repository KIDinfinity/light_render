import React from 'react';

import { useDispatch } from 'dva';
import { Col } from 'antd';
import {
  Authority,
  Visible,
  Editable,
  Required,
  FormItemSelectPlus,
  Rule,
} from 'basic/components/Form';
import { localFieldConfig } from './ProcedureCode.config';

export { localFieldConfig } from './ProcedureCode.config';

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  NAMESPACE,
  procedureId,
}: any) => {
  const fieldProps: any = config || localFieldConfig['field-props'];
  const dispatch = useDispatch();

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelectPlus
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
          onSelectCallback={(value: any) => {
            dispatch({
              type: `${NAMESPACE}/getCategoryByProcedureCode`,
              payload: {
                surgeryCode: value,
                procedureId,
              },
            });
          }}
          searchName="surgeryProcedure"
          dropdownCode="claim_dict007"
          optionShowType="both"
          labelType={config.label?.type || fieldProps.label.type}
        />
      </Col>
    )
  );
};

const ProcedureCode = ({ field, config,
  isShow,
  layout,
  form,
  editable,
  NAMESPACE,
  procedureId,
}: any) => (
  <Authority>
    <FormItem
      field={field} config={config} isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      NAMESPACE={NAMESPACE}
      procedureId={procedureId}
    />
  </Authority>
);

ProcedureCode.displayName = 'ProcedureCode';

export default ProcedureCode;

import React from 'react';
import { NAMESPACE } from '../../../../activity.config';

import { useDispatch } from 'dva';
import { Col } from 'antd';
import {
  Authority,
  Visible,
  Editable,
  Required,
  FormItemSelectPlus,
} from 'basic/components/Form';
import { TherapiesType } from 'claim/pages/Enum';
import { localFieldConfig } from './ProcedureCode.config';

export { localFieldConfig } from './ProcedureCode.config';

export const FormItem = ({ isShow, layout, form, editable, field, config, procedureId }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const dispatch = useDispatch();

  const onSelect = (value: any) => {
    dispatch({
      type: `${NAMESPACE}/getCategoryByProcedureCode`,
      payload: {
        surgeryCode: value,
        procedureId,
      },
    });
  };
  const TherapiesTypeValue = form.getFieldValue('therapiesType');

  const visibleConditions = TherapiesTypeValue === TherapiesType.Surgery;
  const editableConditions = true;
  const requiredConditions = true;

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
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={
            config?.required === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          onSelectCallback={onSelect}
          searchName="surgeryProcedure"
          dropdownCode="claim_dict007"
          optionShowType="both"
          labelType="inline"
        />
      </Col>
    )
  );
};

const ProcedureCode = ({ field, config, isShow, layout, form, editable, procedureId }: any) => (
  <Authority>
    <FormItem
      field={field} config={config} isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      procedureId={procedureId}
    />
  </Authority>
);

ProcedureCode.displayName = 'ProcedureCode';

export default ProcedureCode;

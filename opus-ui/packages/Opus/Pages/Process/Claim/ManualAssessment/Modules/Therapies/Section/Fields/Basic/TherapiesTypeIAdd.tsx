import React from 'react';

import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemSelect,
  Required,
  Visible,
} from 'basic/components/Form';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import { EProcedureType } from 'process/Enum';

import { localFieldConfig } from './TherapiesTypeIAdd.config';

export { localFieldConfig } from './TherapiesTypeIAdd.config';

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  isAdd,
  treatmentId,
}: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const dicts = getDrowDownList(config['x-dict']?.dictTypeCode || localFieldConfig?.['field-props']?.['x-dict']?.dictTypeCode)

  const visibleConditions = true;
  const editableConditions = true;
  const requiredConditions = !isAdd;
  const exist = [EProcedureType.DG1, EProcedureType.DG2];

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={dicts}
          existCodes={exist}
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
            (config.required || fieldProps.required) === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          labelType={config.label?.type || fieldProps.label.type}
        />
      </Col>
    )
  );
};

const TherapiesTypeAdd = ({
  field,
  config,
  isShow,
  layout,
  form,
  editable,
  treatmentId,
  isAdd,
}: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      treatmentId={treatmentId}
      isAdd={isAdd}
    />
  </Authority>
);

TherapiesTypeAdd.displayName = localFieldConfig.field;

export default TherapiesTypeAdd;

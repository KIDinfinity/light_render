import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemSelectPlus,
  Required,
  Visible,
  Rule,
} from 'basic/components/Form';

import { localFieldConfig } from './MedicalProvider.config';

export { localFieldConfig } from './MedicalProvider.config';

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

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
          form={form}
          disabled={
            !editable ||
            (config?.editable === Editable.Conditions
              ? !editableConditions
              : config?.editable === Editable.No)
          }
          required={
            config?.required === Required.Conditions
              ? requiredConditions
              : config?.required === Required.Yes
          }
          formName={field || localFieldConfig.field}
          searchName="medicalProvider"
          labelId=""
          dropdownCode="claim_dict005"
          labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          optionShowType="name"
          name={config?.name}
        />
      </Col>
    )
  );
};

const MedicalProvider = ({ field, config, form, editable, layout, isShow }: any) => (
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

MedicalProvider.displayName = localFieldConfig.field;

export default MedicalProvider;

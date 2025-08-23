import React from 'react';
import useGetClientNameDictForDPRemark from 'process/NB/ManualUnderwriting/_hooks/useGetClientNameDictForDPRemark';
import useResetProductByNameChange from 'process/NB/ManualUnderwriting/_hooks/useResetDPRProductByNameChange';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemSelect,
  Required,
  Visible,
  Rule,
} from 'basic/components/Form';
import lodash from 'lodash';
import { fieldConfig } from './Name.config';
import useGetNameEditable from 'process/NB/ManualUnderwriting/_hooks/useGetNameEditable';
export { fieldConfig } from './Name.config';

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const dicts = useGetClientNameDictForDPRemark();

  const visibleConditions = true;
  const editableConditions = !Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = true;
  const disabled = useGetNameEditable();
  const handleChange = useResetProductByNameChange();
  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={dicts}
          disabled={
            disabled ||
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
          onChange={handleChange}
          precision={0}
        />
      </Col>
    )
  );
};

const Name = ({ form, editable, layout, isShow, config }: any) => (
  <Authority>
    <FormItem
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      config={lodash.get(config, 'field-props')}
      field={fieldConfig?.field}
    />
  </Authority>
);

Name.displayName = 'name';

export default Name;

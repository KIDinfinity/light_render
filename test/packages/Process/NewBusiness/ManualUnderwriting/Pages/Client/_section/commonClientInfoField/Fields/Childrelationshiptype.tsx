import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemSelect,
  Required,
  Visible,
  Rule
} from 'basic/components/Form';
import { fieldConfig } from './Childrelationshiptype.config';
import {useFamilyGroupIndInclude} from 'process/NewBusiness/ManualUnderwriting/Pages/Payment/_hooks'
import { getDrowDownList } from '@/utils/dictFormatMessage';

export { fieldConfig } from './Childrelationshiptype.config';

const FormItem = ({ isShow, layout, form, editable, field, config,readOnly }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const dicts = getDrowDownList({ config, fieldConfig });

  const visibleConditions = useFamilyGroupIndInclude({groupInd: ['P']})
  const editableConditions = !Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = true;
  console.log('visibleConditions', visibleConditions);
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
          precision={0}
        />
      </Col>
    )
  );
};

const Childrelationshiptype = ({ field, form, editable, readOnly, layout, isShow, config }: any) => (
  <Authority>
    <FormItem
      field={field}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      config={config}
      field={fieldConfig?.field}
      readOnly={readOnly}
    />
  </Authority>
);

Childrelationshiptype.displayName = 'childRelationshipType';

export default Childrelationshiptype;

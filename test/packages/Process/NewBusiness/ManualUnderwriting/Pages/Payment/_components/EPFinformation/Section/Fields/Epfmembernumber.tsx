import React from 'react';
import { Col } from 'antd';
import { Authority, Editable, FormItemInput, Required,   Visible, Rule } from 'basic/components/Form';
import { fieldConfig } from './Epfmembernumber.config';

export { fieldConfig } from './Epfmembernumber.config';
import { useFamilyGroupIndInclude } from '../../../../_hooks/index';

const FormItem = ({ isShow, layout, form, editable, field, config, showOnly }: any) => {
  const fieldProps: any = fieldConfig['field-props'];


  const visibleConditions = useFamilyGroupIndInclude({groupInd: ['P']});
  const editableConditions = !Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = true;


  return (
    isShow &&
    ((config?.['field-props']?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.['field-props']?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemInput
          disabled={
            !editable ||
            ((config?.['field-props']?.visible || fieldProps.editable) === Editable.Conditions
              ? editableConditions
              : (config?.['field-props']?.visible || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config?.['field-props']?.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={
            config?.['field-props']?.label?.dictTypeCode || fieldProps.label.dictTypeCode
          }
          required={
            config?.['field-props']?.required === Required.Conditions
              ? requiredConditions
              : (config?.['field-props']?.required || fieldProps.required) === Required.Yes
          }
          hiddenPrefix
          precision={0}
        />
      </Col>
    )
  );
};

const Epfmembernumber = ({ field, form, editable, layout, isShow, config, showOnly}: any) => (
  <Authority>
      <FormItem field={field} isShow={isShow} layout={layout} form={form} editable={editable} config={config} showOnly={showOnly}/>
  </Authority>
);

Epfmembernumber.displayName = 'epfMemberNumber';

export default Epfmembernumber;

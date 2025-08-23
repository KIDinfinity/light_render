import React from 'react';
import { Col } from 'antd';
import { useSelector } from 'dva';
import { Authority, Editable, FormItemSelect, Required, Visible } from 'basic/components/Form';
import { localFieldConfig } from './IdentityType.config';

export { localFieldConfig } from './IdentityType.config';

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const dicts = useSelector(({ dictionaryController }: any) => {
    const isOrganization = form.getFieldValue('organization');
    return isOrganization
      ? dictionaryController.OrganizationIdentityType
      : dictionaryController.IdentityType;
  });

  const visibleConditions = !form.getFieldValue('organization');
  const editableConditions = true;
  const requiredConditions = true;
  //
  // dictsOfIdentityType: dictionaryController.IdentityType,
  //   dictsOrgIdentityType: dictionaryController.OrganizationIdentityType,
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
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={
            (config.required || fieldProps.required) === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
        />
      </Col>
    )
  );
};

const IdentityType = ({ field, config, isShow, layout, form, editable }: any) => (
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

IdentityType.displayName = localFieldConfig.field;

export default IdentityType;

import React from 'react';
import { Col } from 'antd';
import useGetAddrTypeDictsByRole from 'process/NB/ManualUnderwriting/_hooks/useGetAddrTypeDictsByRole';
import useGetEditableByRole from 'process/NB/ManualUnderwriting/_hooks/useGetEditableByRole';
import { Authority, Required, FormItemSelect, Visible } from 'basic/components/Form';
import { fieldConfig } from './AddressType.config';

export { fieldConfig } from './AddressType.config';

const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  isDropEmptyData,
  id,
  addressInfoId,
}: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const dicts = useGetAddrTypeDictsByRole({ config, id, addressInfoId });

  const visibleConditions = true;
  const editableConditions = true;
  const editableByRole = useGetEditableByRole({
    editableConditions,
    config,
    localConfig: fieldConfig,
  });
  const requiredConditions = false;
  return (
    isShow &&
    ((config?.['field-props']?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.['field-props']?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={dicts}
          disabled={!editable || !editableByRole}
          form={form}
          formName={config.name || field}
          labelId={config?.['field-props']?.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={
            config?.['field-props']?.label?.dictTypeCode || fieldProps.label.dictTypeCode
          }
          required={
            !isDropEmptyData &&
            (config?.['field-props']?.required === Required.Conditions
              ? requiredConditions
              : (config?.['field-props']?.required || fieldProps.required) === Required.Yes)
          }
          hiddenPrefix
          precision={0}
        />
      </Col>
    )
  );
};

const AddressType = ({
  form,
  editable,
  layout,
  isShow,
  id,
  config,
  isDropEmptyData,
  addressInfoId,
}: any) => {
  return (
    <Authority>
      <FormItem
        field={fieldConfig?.field}
        config={config}
        isShow={isShow}
        layout={layout}
        form={form}
        editable={editable}
        id={id}
        isDropEmptyData={isDropEmptyData}
        addressInfoId={addressInfoId}
      />
    </Authority>
  );
};

AddressType.displayName = 'addrType';

export default AddressType;

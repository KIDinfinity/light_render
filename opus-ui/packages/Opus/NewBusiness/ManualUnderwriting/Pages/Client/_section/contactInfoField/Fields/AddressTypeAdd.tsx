import React from 'react';
import { Col } from 'antd';

import {
  Authority,
  Editable,
  FormItemSelect,
  Visible,
  RuleByForm,
} from 'basic/components/Form';

import { useGetAddrTypeDicts, useGetExistCodes } from '../../../_hooks/useAddressType';
import { fieldConfig } from './AddressTypeAdd.config';
export { fieldConfig } from './AddressTypeAdd.config';


const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  isDropEmptyData,
  id,
  readOnly,
  addressId,
}: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const dicts = useGetAddrTypeDicts({ id, readOnly, config });
  const existCodes = useGetExistCodes({ addressId, id, readOnly , field});

  const visibleConditions = true;
  const editableConditions = !RuleByForm(config?.['editable-condition'], form);

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
          existCodes={existCodes}
          form={form}
          formName={config.name || field}
          labelId={config?.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          isInline
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
  readOnly,
  addressId,
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
        readOnly={readOnly}
        addressId={addressId}
      />
    </Authority>
  );
};

AddressType.displayName = 'addrType';

export default AddressType;

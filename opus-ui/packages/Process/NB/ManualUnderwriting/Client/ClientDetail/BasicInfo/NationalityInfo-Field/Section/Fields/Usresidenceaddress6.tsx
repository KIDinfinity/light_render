import React from 'react';
import useGetRequiredByRole from 'process/NB/ManualUnderwriting/_hooks/useGetRequiredByRole';
import { Col } from 'antd';

import { Authority, Editable, FormItemSelect, Visible, RuleByForm } from 'basic/components/Form';
import useGetCurrentLevelAddress from 'process/NB/ManualUnderwriting/_hooks/useGetCurrentLevelAddress';
import AddressType from 'process/NB/ManualUnderwriting/Enum/AddressType';
import AddressLevel from 'process/NB/ManualUnderwriting/Enum/AddressLevel';
import useLoadSubAddress from 'process/NB/ManualUnderwriting/_hooks/useLoadSubAddress';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { fieldConfig } from './Usresidenceaddress6.config';

export { fieldConfig } from './Usresidenceaddress6.config';

const FormItem = ({ isShow, layout, form, editable, field, config, id }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const dicts = useGetCurrentLevelAddress({
    id,
    addressType: AddressType.Residence,
    addressLevel: AddressLevel.Province,
  });
  const handleLoadSubAddress = useLoadSubAddress({
    addressLevel: AddressLevel.Province,
  });

  const visibleConditions = true;
  const editableConditions = !RuleByForm(fieldProps['editable-condition'], form);
  const requiredConditions = false;
  const requiredByRole = useGetRequiredByRole({
    requiredConditions,
    config,
    localConfig: fieldConfig,
  });

  return (
    isShow &&
    ((config?.['field-props']?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.['field-props']?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={dicts}
          disabled={
            !editable ||
            ((config?.['field-props']?.editable || fieldProps.editable) === Editable.Conditions
              ? editableConditions
              : (config?.['field-props']?.editable || fieldProps.editable) === Editable.No)
          }
          dictCode="subCode"
          dictName="subName"
          form={form}
          formName={config.name || field}
          labelId={config?.['field-props']?.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={
            config?.['field-props']?.label?.dictTypeCode || fieldProps.label.dictTypeCode
          }
          required={requiredByRole}
          hiddenPrefix
          precision={0}
          onChange={handleLoadSubAddress}
          placeholder={formatMessageApi({
            Label_BIZ_Individual: 'AddressLine6',
          })}
        />
      </Col>
    )
  );
};

const Usresidenceaddress6 = ({ form, editable, layout, isShow, id, config }: any) => {
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
      />
    </Authority>
  );
};

Usresidenceaddress6.displayName = 'usResidenceAddress6';

export default Usresidenceaddress6;

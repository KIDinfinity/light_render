import React from 'react';
import useGetRequiredByRole from '../../../_hooks/useGetRequiredByRole';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { Col } from 'antd';

import { Authority, Editable, FormItemSelect, Visible, RuleByForm } from 'basic/components/Form';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import useLoadSubAddress from 'process/NB/ManualUnderwriting/_hooks/useLoadSubAddress';
import AddressLevel from 'process/NB/ManualUnderwriting/Enum/AddressLevel';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { fieldConfig } from './EntityPolicyOwnerBusinessAddress.config';

export { fieldConfig } from './EntityPolicyOwnerBusinessAddress.config';

const FormItem = ({ isShow, layout, form, editable, field, config, id }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const dicts = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.parentCodeAddress?.country,
    shallowEqual
  );
  const handleLoadSubAddress = useLoadSubAddress({
    addressLevel: AddressLevel.Country,
  });
  const visibleConditions = true;
  const editableConditions = !RuleByForm(config?.['editable-condition'], form);
  const requiredConditions = false;
  const requiredByRole = useGetRequiredByRole({
    requiredConditions,
    config,
    localConfig: fieldConfig,
    clientId: id,
  });

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={dicts}
          dictCode="subCode"
          dictName="subName"
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config?.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={requiredByRole}
          hiddenPrefix
          precision={0}
          onChange={handleLoadSubAddress}
          placeholder={formatMessageApi({
            Label_BIZ_Individual: 'AddressLine7',
          })}
        />
      </Col>
    )
  );
};

const EntityPolicyOwnerBusinessAddress = ({ form, editable, layout, isShow, id, config }: any) => {
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

EntityPolicyOwnerBusinessAddress.displayName = 'entityPolicyOwnerBusinessAddress';

export default EntityPolicyOwnerBusinessAddress;

import React from 'react';
import useGetRequiredByRole from 'process/NB/ManualUnderwriting/_hooks/useGetRequiredByRole';
import useGetEditableByRole from 'process/NB/ManualUnderwriting/_hooks/useGetEditableByRole';
import { Col } from 'antd';

import {
  Authority,
  Editable,
  FormItemSelect,
  FormItemInput,
  Visible,
  RuleByForm,
} from 'basic/components/Form';
import useGetCurrentLevelAddress from 'process/NB/ManualUnderwriting/_hooks/useGetCurrentLevelAddress';
import useGetCurrentCountry from 'process/NB/ManualUnderwriting/_hooks/useGetCurrentCountry';
import useGetCurrentRegion from 'process/NB/ManualUnderwriting/_hooks/useGetCurrentRegion';
import AddressLevel from 'process/NB/ManualUnderwriting/Enum/AddressLevel';
import { fieldConfig } from './Address3.config';
import { tenant, Region } from '@/components/Tenant';

export { fieldConfig } from './Address3.config';

const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  id,
  addressInfoList,
  isDropEmptyData,
}: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const addrType = form.getFieldValue('addrType');
  const dicts = useGetCurrentLevelAddress({
    id,
    addressType: addrType,
    addressLevel: AddressLevel.Commune,
  });
  const currentCountry = useGetCurrentCountry({ addrType, addressInfoList });
  const isCurrentRegion = useGetCurrentRegion({
    currentCountry,
  });
  const visibleConditions = !isDropEmptyData || RuleByForm(fieldProps['visible-condition'], form);
  const editableConditions = true;
  const editableByRole = useGetEditableByRole({
    editableConditions,
    config,
    localConfig: fieldConfig,
  });
  const requiredConditions = false;
  const requiredByRole = useGetRequiredByRole({
    requiredConditions,
    config,
    localConfig: fieldConfig,
  });
  const regionCode = tenant.region();

  return (
    isShow &&
    ((config?.['field-props']?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.['field-props']?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        {isCurrentRegion && ![Region.TH, Region.MY, Region.ID].includes(regionCode) ? (
          <FormItemSelect
            dicts={dicts}
            dictCode="subCode"
            dictName="subName"
            disabled={
              !editable ||
              ((config?.['field-props']?.editable || fieldProps.editable) === Editable.Conditions
                ? !editableConditions
                : (config?.['field-props']?.editable || fieldProps.editable) === Editable.No)
            }
            form={form}
            formName={config.name || field}
            labelId={config?.['field-props']?.label?.dictCode || fieldProps.label.dictCode}
            labelTypeCode={
              config?.['field-props']?.label?.dictTypeCode || fieldProps.label.dictTypeCode
            }
            required={requiredByRole}
            hiddenPrefix
            precision={0}
          />
        ) : (
          <FormItemInput
            disabled={!editable || !editableByRole}
            form={form}
            formName={config.name || field}
            labelId={config?.['field-props']?.label?.dictCode || fieldProps.label.dictCode}
            labelTypeCode={
              config?.['field-props']?.label?.dictTypeCode || fieldProps.label.dictTypeCode
            }
            required={requiredByRole}
            hiddenPrefix
            maxLength={config?.['field-props']?.maxLength || fieldProps.maxLength}
            precision={0}
          />
        )}
      </Col>
    )
  );
};

const Address3 = ({
  form,
  editable,
  layout,
  isShow,
  id,
  addressInfoList,
  config,
  isDropEmptyData,
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
        addressInfoList={addressInfoList}
        id={id}
        isDropEmptyData={isDropEmptyData}
      />
    </Authority>
  );
};

Address3.displayName = 'address3';

export default Address3;

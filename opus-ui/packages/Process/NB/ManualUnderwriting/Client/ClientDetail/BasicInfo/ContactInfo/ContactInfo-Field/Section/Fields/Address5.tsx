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
import { tenant, Region } from '@/components/Tenant';
import useGetCascadeAdress from 'process/NB/ManualUnderwriting/_hooks/useGetCascadeAdress';
import useGetCurrentLevelAddress from 'process/NB/ManualUnderwriting/_hooks/useGetCurrentLevelAddress';
import useGetCurrentCountry from 'process/NB/ManualUnderwriting/_hooks/useGetCurrentCountry';
import useLoadSubAddress from 'process/NB/ManualUnderwriting/_hooks/useLoadSubAddress';
import useGetCurrentRegion from 'process/NB/ManualUnderwriting/_hooks/useGetCurrentRegion';
import AddressLevel from 'process/NB/ManualUnderwriting/Enum/AddressLevel';
import { fieldConfig } from './Address5.config';

export { fieldConfig } from './Address5.config';

const ItemSelectTH = ({
  editable,
  config,
  fieldProps,
  editableConditions,
  form,
  field,
  requiredByRole,
}: any) => {
  const dicts2 = useGetCascadeAdress({ level: 1, form, type: 'address' });
  return (
    <FormItemSelect
      dicts={dicts2}
      dictCode="code"
      dictName="description"
      disabled={
        !editable ||
        ((config?.['field-props']?.editable || fieldProps.editable) === Editable.Conditions
          ? !editableConditions
          : (config?.['field-props']?.editable || fieldProps.editable) === Editable.No)
      }
      form={form}
      formName={config.name || field}
      labelId={config?.['field-props']?.label?.dictCode || fieldProps.label.dictCode}
      labelTypeCode={config?.['field-props']?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
      required={requiredByRole}
      hiddenPrefix
      precision={0}
    />
  );
};

const ItemSelect = ({
  editable,
  config,
  fieldProps,
  editableConditions,
  form,
  field,
  requiredByRole,
  id,
}: any) => {
  const addrType = form.getFieldValue('addrType');
  const dicts = useGetCurrentLevelAddress({
    id,
    addressType: addrType,
    addressLevel: AddressLevel.City,
  });
  const handleLoadSubAddress = useLoadSubAddress({
    addressLevel: AddressLevel.City,
  });

  return (
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
      labelTypeCode={config?.['field-props']?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
      required={requiredByRole}
      hiddenPrefix
      precision={0}
      onChange={handleLoadSubAddress}
    />
  );
};

const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  id,
  isDropEmptyData,
  addressInfoList,
}: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const addrType = form.getFieldValue('addrType');

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

  return (
    isShow &&
    ((config?.['field-props']?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.['field-props']?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        {isCurrentRegion ? (
          tenant.region({
            [Region.ID]: (
              <FormItemInput
                disabled={
                  !editable ||
                  ((config?.['field-props']?.editable || fieldProps.editable) ===
                  Editable.Conditions
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
            ),
            [Region.TH]: (
              <ItemSelectTH
                editable={editable}
                form={form}
                config={config}
                fieldProps={fieldProps}
                editableConditions={editableConditions}
                field={field}
                requiredByRole={requiredConditions}
                id={id}
              />
            ),
            notMatch: (
              <ItemSelect
                editable={editable}
                form={form}
                config={config}
                fieldProps={fieldProps}
                editableConditions={editableConditions}
                field={field}
                requiredByRole={requiredConditions}
                id={id}
              />
            ),
          })
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
            precision={0}
          />
        )}
      </Col>
    )
  );
};

const Address5 = ({
  form,
  editable,
  layout,
  isShow,
  id,
  addressInfoList,
  isDropEmptyData,
  config,
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
        addressInfoList={addressInfoList}
        isDropEmptyData={isDropEmptyData}
      />
    </Authority>
  );
};

Address5.displayName = 'address5';

export default Address5;

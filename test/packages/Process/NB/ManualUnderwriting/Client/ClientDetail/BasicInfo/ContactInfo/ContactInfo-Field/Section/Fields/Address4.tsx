import React from 'react';
import useGetRequiredByRole from 'process/NB/ManualUnderwriting/_hooks/useGetRequiredByRole';
import useGetEditableByRole from 'process/NB/ManualUnderwriting/_hooks/useGetEditableByRole';
import { Col } from 'antd';
import { useDispatch } from 'dva';
import lodash from 'lodash';

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
import useLoadSubAddress from 'process/NB/ManualUnderwriting/_hooks/useLoadSubAddress';
import useGetCurrentCountry from 'process/NB/ManualUnderwriting/_hooks/useGetCurrentCountry';
import useGetCurrentRegion from 'process/NB/ManualUnderwriting/_hooks/useGetCurrentRegion';
import AddressLevel from 'process/NB/ManualUnderwriting/Enum/AddressLevel';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import { fieldConfig } from './Address4.config';

export { fieldConfig } from './Address4.config';

const ItemSelectTH = ({
  editable,
  config,
  fieldProps,
  editableConditions,
  form,
  field,
  requiredByRole,
  id,
  addressInfoId,
}: any) => {
  const dicts = useGetCascadeAdress({ level: 2, form, type: 'address' });
  const dispatch = useDispatch();

  const handlerChange = (value) => {
    const item = lodash.find(dicts, { code: value });
    if (!item) return;
    dispatch({
      type: `${NAMESPACE}/handleChangeContactAddressInfoField`,
      payload: {
        changedFields: { zipCode: item.postalCode },
        id,
        addressInfoId,
      },
    });
  };

  return (
    <FormItemSelect
      dicts={dicts}
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
      onChange={handlerChange}
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
    addressLevel: AddressLevel.District,
  });
  const handleLoadSubAddress = useLoadSubAddress({
    addressLevel: AddressLevel.District,
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
  addressInfoList,
  isDropEmptyData,
  addressInfoId,
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
            [Region.MY]: (
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
                maxLength={config?.['field-props']?.maxLength || fieldProps.maxLength}
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
                addressInfoId={addressInfoId}
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
            maxLength={config?.maxLength || fieldProps.maxLength}
            precision={0}
          />
        )}
      </Col>
    )
  );
};

const Address4 = ({
  form,
  editable,
  layout,
  isShow,
  id,
  isDropEmptyData,
  addressInfoList,
  config,
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
        addressInfoList={addressInfoList}
        id={id}
        isDropEmptyData={isDropEmptyData}
        addressInfoId={addressInfoId}
      />
    </Authority>
  );
};

Address4.displayName = 'address4';

export default Address4;

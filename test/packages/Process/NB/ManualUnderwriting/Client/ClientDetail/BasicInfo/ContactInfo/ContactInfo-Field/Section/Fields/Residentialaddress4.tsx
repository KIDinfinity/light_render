import React from 'react';
import useGetRequiredByRole from 'process/NB/ManualUnderwriting/_hooks/useGetRequiredByRole';
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
import useGetCurrentLevelAddress from 'process/NB/ManualUnderwriting/_hooks/useGetCurrentLevelAddress';
import useGetCascadeAdress from 'process/NB/ManualUnderwriting/_hooks/useGetCascadeAdress';
import useLoadSubAddress from 'process/NB/ManualUnderwriting/_hooks/useLoadSubAddress';
import useGetCurrentCountry from 'process/NB/ManualUnderwriting/_hooks/useGetCurrentCountry';
import useGetCurrentRegion from 'process/NB/ManualUnderwriting/_hooks/useGetCurrentRegion';
import AddressLevel from 'process/NB/ManualUnderwriting/Enum/AddressLevel';
import AddressType from 'process/NB/ManualUnderwriting/Enum/AddressType';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import { fieldConfig } from './Residentialaddress4.config';

export { fieldConfig } from './Residentialaddress4.config';

const ItemSelectTH = ({
  editable,
  config,
  fieldProps,
  editableConditions,
  form,
  field,
  requiredByRole,
  id,
}: any) => {
  const dicts = useGetCascadeAdress({ level: 2, form, type: 'residentiala' });
  const dispatch = useDispatch();

  const handlerChange = (value) => {
    const item = lodash.find(dicts, { code: value });
    if (!item) return;
    dispatch({
      type: `${NAMESPACE}/handleChangeContactInfoField`,
      payload: {
        changedFields: { residentialZipCode: item.postalCode },
        id,
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
          ? editableConditions
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
  const dicts = useGetCurrentLevelAddress({
    id,
    addressType: AddressType.Residence,
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
          ? editableConditions
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

  addressInfoList,
  id,
}: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const dicts = useGetCurrentLevelAddress({
    id,
    addressType: AddressType.Residence,
    addressLevel: AddressLevel.District,
  });
  const currentCountry = useGetCurrentCountry({ addrType: 'R', addressInfoList });
  const isCurrentRegion = useGetCurrentRegion({
    currentCountry,
  });
  const handleLoadSubAddress = useLoadSubAddress({
    addressLevel: AddressLevel.District,
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
        {isCurrentRegion ? (
          tenant.region({
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
            disabled={
              !editable ||
              ((config?.['field-props']?.editable || fieldProps.editable) === Editable.Conditions
                ? editableConditions
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
        )}
      </Col>
    )
  );
};

const Residentialaddress4 = ({
  form,
  editable,
  layout,
  isShow,
  id,

  addressInfoList,
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
        addressInfoList={addressInfoList}
        id={id}
      />
    </Authority>
  );
};

Residentialaddress4.displayName = 'residentialAddress4';

export default Residentialaddress4;

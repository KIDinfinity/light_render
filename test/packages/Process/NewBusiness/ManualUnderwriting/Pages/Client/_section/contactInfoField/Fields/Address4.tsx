import React from 'react';
import useGetRequiredByRole from '../../../_hooks/useGetRequiredByRole';
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
  formUtils,
} from 'basic/components/Form';
import { tenant, Region } from '@/components/Tenant';

import useGetCascadeAdress from 'process/NB/ManualUnderwriting/_hooks/useGetCascadeAdress';
import useGetCurrentRegion from 'process/NB/ManualUnderwriting/_hooks/useGetCurrentRegion';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

import useSubAddressList from '../../../_hooks/useSubAddressList';
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
  const { dicts, handleLoadSubAddress } = useSubAddressList({ form, field });

  return (
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
  addressInfoId,
}: any) => {
  const fieldProps: any = fieldConfig['field-props'];

  const currentCountry = formUtils.queryValue(form.getFieldValue('country'));
  const isCurrentRegion = useGetCurrentRegion({
    currentCountry,
  });

  const visibleConditions = !isDropEmptyData || RuleByForm(fieldProps['visible-condition'], form);
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
        {isCurrentRegion ? (
          tenant.region({
            [Region.MY]: (
              <FormItemInput
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
            [Region.ID]: (
              <FormItemInput
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
  addressItem,
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
        addressItem={addressItem}
        id={id}
        isDropEmptyData={isDropEmptyData}
        addressInfoId={addressInfoId}
      />
    </Authority>
  );
};

Address4.displayName = 'address4';

export default Address4;

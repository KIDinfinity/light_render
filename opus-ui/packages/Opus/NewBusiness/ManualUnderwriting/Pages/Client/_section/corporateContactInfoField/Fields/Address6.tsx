import React from 'react';
import { Col } from 'antd';

import {
  Authority,
  Editable,
  FormItemSelect,
  FormItemInput,
  Visible,
  RuleByForm,
  Required,
} from 'basic/components/Form';
import { tenant, Region } from '@/components/Tenant';

import useGetCascadeAdress from 'process/NB/ManualUnderwriting/_hooks/useGetCascadeAdress';
import useGetCurrentRegion from 'process/NB/ManualUnderwriting/_hooks/useGetCurrentRegion';

import useSubAddressList from '../../../_hooks/useSubAddressList';
import { fieldConfig } from './Address6.config';
export { fieldConfig } from './Address6.config';

const ItemSelectTH = ({
  editable,
  config,
  fieldProps,
  editableConditions,
  form,
  field,
  required,
}: any) => {
  const dicts2 = useGetCascadeAdress({ level: 0, form, type: 'address' });
  return (
    <FormItemSelect
      dicts={dicts2}
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
      required={required}
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
  required,
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
      required={required}
      hiddenPrefix
      precision={0}
      onChange={handleLoadSubAddress}
    />
  );
};

const FormItem = ({ isShow, layout, form, editable, field, config, isDropEmptyData, id }: any) => {
  const fieldProps: any = fieldConfig['field-props'];

  const currentCountry = form.getFieldValue('country');
  const isCurrentRegion = useGetCurrentRegion({
    currentCountry,
  });

  const visibleConditions = !isDropEmptyData || RuleByForm(fieldProps['visible-condition'], form);
  const editableConditions = !RuleByForm(config?.['editable-condition'], form);
  const requiredConditions = RuleByForm(config?.['required-condition'], form);
  const required =
    config?.required === Required.Conditions
      ? requiredConditions
      : (config.required || fieldProps.required) === Required.Yes;

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
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
                required={required}
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
                required={required}
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
            required={required}
            hiddenPrefix
            precision={0}
          />
        )}
      </Col>
    )
  );
};

const Address6 = ({ form, editable, layout, isShow, id, isDropEmptyData, config }: any) => {
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
      />
    </Authority>
  );
};

Address6.displayName = 'address6';

export default Address6;

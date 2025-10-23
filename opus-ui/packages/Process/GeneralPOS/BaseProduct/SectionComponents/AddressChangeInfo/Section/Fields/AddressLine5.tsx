import { Region, tenant } from '@/components/Tenant';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemInput,
  FormItemSelect,
  formUtils,
  Required,
  Rule,
  Visible,
} from 'basic/components/Form';
import lodash from 'lodash';
import useGetCurrentLevelAddress from 'process/GeneralPOS/BaseProduct/_hooks/useGetCurrentLevelAddress';
import useLoadSubAddress from 'process/GeneralPOS/BaseProduct/_hooks/useLoadSubAddress';
import { AddressLevelEnum } from 'process/GeneralPOS/common/Enum';
import React from 'react';
import { localFieldConfig } from './AddressLine5.config';

export { localFieldConfig } from './AddressLine5.config';

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  recoverObj,
  OnRecover,
  transactionId,
}: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const regionCode = tenant.region();
  const addressLevel = tenant.region({
    [Region.PH]: AddressLevelEnum.Country,
    [Region.MY]: AddressLevelEnum.Province,
    [Region.TH]: AddressLevelEnum.Province,
    notMatch: AddressLevelEnum.Country,
  });
  const varLevel = tenant.region({
    [Region.PH]: 'country',
    [Region.MY]: 'province',
    notMatch: 'country',
  });
  useLoadSubAddress({
    addressLevel,
    parentCode: form.getFieldValue(field),
    transactionId,
  });

  const dicts = useGetCurrentLevelAddress({
    addressLevel,
    transactionId,
  });

  const otherParams = tenant.region({
    [Region.PH]: {
      recoverValue: recoverObj[localFieldConfig.field],
      OnRecover,
    },
    [Region.MY]: {},
    notMatch: {},
  });
  const selectDicts = tenant.region({
    [Region.TH]: {
      dicts,
      dictCode: 'code',
      dictName: 'description',
    },
    notMatch: { dicts, dictCode: 'subCode', dictName: 'subName' },
  });
  const currentCountry = formUtils.queryValue(form.getFieldValue('countryCode'));
  const isCurrentRegion = regionCode === Region.TH && currentCountry === Region.TH;
  const visibleConditions = true;
  const editableConditions = !Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  const Rules = {};
  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        {isCurrentRegion ? (
          <FormItemSelect
            {...selectDicts}
            disabled={
              !editable ||
              ((config?.editable || fieldProps.editable) === Editable.Conditions
                ? !editableConditions
                : (config?.editable || fieldProps.editable) === Editable.No)
            }
            form={form}
            formName={config.name || field}
            labelId={config.label?.dictCode || fieldProps.label.dictCode}
            labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
            required={
              (config.required || fieldProps.required) === Required.Conditions
                ? requiredConditions
                : (config.required || fieldProps.required) === Required.Yes
            }
            rules={lodash.compact(
              (config?.['x-rules'] || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
            )}
            {...otherParams}
          />
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
            required={
              (config.required || fieldProps.required) === Required.Conditions
                ? requiredConditions
                : (config.required || fieldProps.required) === Required.Yes
            }
            precision={0}
          />
        )}
      </Col>
    )
  );
};

const AddressLine5 = ({
  isShow,
  layout,
  form,
  editable,
  recoverObj,
  OnRecover,
  transactionId,
  config,
}: any) => (
  <Authority>
    <FormItem
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      recoverObj={recoverObj}
      OnRecover={OnRecover}
      transactionId={transactionId}
      field={localFieldConfig.field}
      config={config}
    />
  </Authority>
);

AddressLine5.displayName = localFieldConfig.field;

export default AddressLine5;

import { Region, tenant } from '@/components/Tenant';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemSelect,
  Required,
  Rule,
  Visible,
} from 'basic/components/Form';
import { useSelector } from 'dva';
import lodash from 'lodash';
import useLoadSubAddress from 'process/GeneralPOS/BaseProduct/_hooks/useLoadSubAddress';
import { AddressLevelEnum } from 'process/GeneralPOS/common/Enum';
import React from 'react';
import { NAMESPACE } from '../../../../activity.config';
import { localFieldConfig } from './CountryCode.config';

export { localFieldConfig } from './CountryCode.config';

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
  useLoadSubAddress({
    addressLevel: AddressLevelEnum.Country,
    parentCode: form.getFieldValue(field),
    transactionId,
  });
  const dicts = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.address?.country
  );
  const configDicts = useSelector(
    ({ dictionaryController }: any) =>
      dictionaryController[
        config['x-dict']?.dictTypeCode || localFieldConfig['field-props']['x-dict'].dictTypeCode
      ]
  );
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
      dicts: configDicts,
    },
    notMatch: { dicts, dictCode: 'subCode', dictName: 'subName' },
  });
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
      </Col>
    )
  );
};

const CountryCode = ({
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

CountryCode.displayName = localFieldConfig.field;

export default CountryCode;

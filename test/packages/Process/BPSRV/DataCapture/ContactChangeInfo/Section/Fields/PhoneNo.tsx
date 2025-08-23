import React, { useMemo } from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  ElementConfig,
  FormItemInput,
  Required,
  Visible,
  Rule,
  Validator,
} from 'basic/components/Form';
import lodash from 'lodash';
import { tenant, Region } from '@/components/Tenant';
import { useSelector } from 'dva';
import { findSubTypeCodeByTransactionType } from 'process/BPSRV/common/findSubTypeCodeByTransactionType';

import { localConfig } from '../index';
import { NAMESPACE } from '../../../activity.config';
import { localFieldConfig } from './PhoneNo.config';

export { localFieldConfig } from './PhoneNo.config';

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  recoverObj,
  OnRecover,
  id,
}: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const subTypeCode = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.entities?.transactionTypesMap?.[id]?.contactInfo?.subTypeCode
  );
  const transactionTypeCodeMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.transactionTypeCodeMap
  );

  const emailSubTypeCode = useMemo(
    () =>
      findSubTypeCodeByTransactionType(
        transactionTypeCodeMap,
        'SRV001',
        /changeofemail/gi,
        'SRV_SUB004'
      ),
    [transactionTypeCodeMap]
  );

  const visibleConditions = true;
  const editableConditions = !Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = tenant.region({
    [Region.ID]: form.getFieldValue(config.name || field)?.length > 0 ? true : false,
    notMatch: Rule(fieldProps['required-condition'], form, ''),
  });

  const required = tenant.region({
    [Region.ID]:
      subTypeCode === emailSubTypeCode &&
      (config.required || fieldProps.required) === Required.Conditions
        ? requiredConditions
        : (config.required || fieldProps.required) === Required.Yes,
    notMatch: () =>
      (config.required || fieldProps.required) === Required.Conditions
        ? requiredConditions
        : (config.required || fieldProps.required) === Required.Yes,
  });

  const Rules = tenant.region({
    [Region.ID]: {},
    notMatch: () => ({
      VLD_000621: Validator.VLD_000621(),
    }),
  });

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemInput
          allowClear
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
          required={required}
          rules={lodash.compact(
            (config?.rules || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
          maxLength={10}
          recoverValue={recoverObj[localFieldConfig.field]}
          OnRecover={OnRecover}
          onChange={(e: any) => {
            const hasLetter = new RegExp(/[a-zA-Z]+/);
            if (hasLetter.test(e)) {
              form.setFieldsValue({ [localFieldConfig.field]: e.replace(/[a-zA-Z]+/g, '') });
            }
          }}
        />
      </Col>
    )
  );
};

const PhoneNo = ({ isShow, layout, form, editable, section, recoverObj, OnRecover, id }: any) => (
  <Authority>
    <ElementConfig.Field config={localConfig} section={section} field={localFieldConfig.field}>
      <FormItem
        isShow={isShow}
        layout={layout}
        form={form}
        editable={editable}
        recoverObj={recoverObj}
        OnRecover={OnRecover}
        id={id}
      />
    </ElementConfig.Field>
  </Authority>
);

PhoneNo.displayName = localFieldConfig.field;

export default PhoneNo;

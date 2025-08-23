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
import { localFieldConfig } from './Email.config';

export { localFieldConfig } from './Email.config';

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

  const visibleConditions = true;
  const editableConditions = !Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions =
    Rule(fieldProps['required-condition'], form, '') &&
    form.getFieldValue(config.name || field)?.length > 0;

  const phoneNoSubTypeCode = useMemo(() => {
    findSubTypeCodeByTransactionType(
      transactionTypeCodeMap,
      'SRV001',
      /changeofphoneno/gi,
      'SRV_SUB002'
    );
  }, [transactionTypeCodeMap]);

  const required = tenant.region({
    [Region.ID]:
      subTypeCode === phoneNoSubTypeCode &&
      (config.required || fieldProps.required) === Required.Conditions
        ? requiredConditions
        : (config.required || fieldProps.required) === Required.Yes,
    notMatch: () =>
      (config.required || fieldProps.required) === Required.Conditions
        ? requiredConditions
        : (config.required || fieldProps.required) === Required.Yes,
  });

  const Rules = {
    VLD_000618: Validator.VLD_000618(),
  };

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
          recoverValue={recoverObj[localFieldConfig.field]}
          OnRecover={OnRecover}
        />
      </Col>
    )
  );
};

const Email = ({ isShow, layout, form, editable, section, recoverObj, OnRecover, id }: any) => (
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

Email.displayName = localFieldConfig.field;

export default Email;

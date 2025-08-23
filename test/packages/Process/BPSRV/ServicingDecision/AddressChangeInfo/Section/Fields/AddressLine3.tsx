import React, { useEffect } from 'react';
import { Col } from 'antd';
import { useSelector, useDispatch } from 'dva';
import {
  Authority,
  Editable,
  ElementConfig,
  FormItemSelect,
  Required,
  Visible,
  Rule,
  formUtils,
} from 'basic/components/Form';
import lodash from 'lodash';
import { localConfig } from '../index';
import { localFieldConfig } from './AddressLine3.config';
import { NAMESPACE } from '../../../activity.config';

export { localFieldConfig } from './AddressLine3.config';

export const FormItem = ({ isShow, layout, form, editable, field, config, id }: any) => {
  const dispatch = useDispatch();
  const fieldProps: any = localFieldConfig['field-props'];

  const countryCode = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.entities?.transactionTypesMap?.[id]?.policyAddr?.countryCode
  );
  const addressLine5 = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.entities?.transactionTypesMap?.[id]?.policyAddr?.addressLine5
  );
  const addressLine4 = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.entities?.transactionTypesMap?.[id]?.policyAddr?.addressLine4
  );

  const cities =
    useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.address?.city) || [];

  useEffect(() => {
    if (
      formUtils.queryValue(countryCode) &&
      formUtils.queryValue(addressLine5) &&
      formUtils.queryValue(addressLine4)
    ) {
      dispatch({
        type: `${NAMESPACE}/getAddress`,
        payload: {
          countryCode: formUtils.queryValue(countryCode),
          provinceCode: formUtils.queryValue(addressLine5),
          districtCode: formUtils.queryValue(addressLine4),
        },
      });
    }
  }, [formUtils.queryValue(addressLine4)]);

  const dicts = cities.map((city: any) => ({
    dictCode: city.code,
    dictName: city.description,
  }));

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
          dicts={formUtils.queryValue(addressLine4) ? dicts : []}
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
            (config?.rules || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
        />
      </Col>
    )
  );
};

const AddressLine3 = ({ isShow, layout, form, editable, section, id }: any) => (
  <Authority>
    <ElementConfig.Field config={localConfig} section={section} field={localFieldConfig.field}>
      <FormItem isShow={isShow} layout={layout} form={form} editable={editable} id={id} />
    </ElementConfig.Field>
  </Authority>
);

AddressLine3.displayName = localFieldConfig.field;

export default AddressLine3;

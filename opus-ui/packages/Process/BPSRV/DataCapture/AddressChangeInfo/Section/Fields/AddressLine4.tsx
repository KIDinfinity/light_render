import React, { useEffect, useMemo } from 'react';
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
  FormItemInput,
} from 'basic/components/Form';
import lodash from 'lodash';
import { tenant, Region } from '@/components/Tenant';
import { localConfig } from '../index';
import { localFieldConfig } from './AddressLine4.config';
import { NAMESPACE } from '../../../activity.config';

export { localFieldConfig } from './AddressLine4.config';

export const FormItem = ({ isShow, layout, form, editable, field, config, id }: any) => {
  const dispatch = useDispatch();
  const fieldProps: any = localFieldConfig['field-props'];
  const regionCode = tenant.region();

  const countryCode = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.entities?.transactionTypesMap?.[id]?.policyAddr?.countryCode
  );

  const addressLine5 = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.entities?.transactionTypesMap?.[id]?.policyAddr?.addressLine5
  );
  const districts =
    useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.address?.district) || [];

  const dicts = useMemo(() => {
    return tenant.region({
      [Region.ID]: [],
      notMatch: () =>
        districts.map((district: any) => ({
          dictCode: district.code,
          dictName: district.description,
        })),
    });
  }, [regionCode, districts]);

  useEffect(() => {
    tenant.region({
      [Region.ID]: null,
      notMatch: () => {
        if (formUtils.queryValue(countryCode) && formUtils.queryValue(addressLine5)) {
          dispatch({
            type: `${NAMESPACE}/getAddress`,
            payload: {
              countryCode: formUtils.queryValue(countryCode),
              provinceCode: formUtils.queryValue(addressLine5),
            },
          });
        }
      },
    });
  }, [formUtils.queryValue(addressLine5), regionCode]);

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
        {regionCode !== Region.ID ? (
          <FormItemSelect
            dicts={formUtils.queryValue(addressLine5) ? dicts : []}
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
        ) : (
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
            required={
              (config.required || fieldProps.required) === Required.Conditions
                ? requiredConditions
                : (config.required || fieldProps.required) === Required.Yes
            }
            rules={lodash.compact(
              (config?.rules || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
            )}
          />
        )}
      </Col>
    )
  );
};

const AddressLine4 = ({ isShow, layout, form, editable, section, id }: any) => (
  <Authority>
    <ElementConfig.Field config={localConfig} section={section} field={localFieldConfig.field}>
      <FormItem isShow={isShow} layout={layout} form={form} editable={editable} id={id} />
    </ElementConfig.Field>
  </Authority>
);

AddressLine4.displayName = localFieldConfig.field;

export default AddressLine4;

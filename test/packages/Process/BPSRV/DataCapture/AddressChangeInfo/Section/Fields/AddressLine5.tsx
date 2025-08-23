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
import { localFieldConfig } from './AddressLine5.config';
import { NAMESPACE } from '../../../activity.config';

export { localFieldConfig } from './AddressLine5.config';

export const FormItem = ({ isShow, layout, form, editable, field, config, id }: any) => {
  const dispatch = useDispatch();
  const fieldProps: any = localFieldConfig['field-props'];
  const regionCode = tenant.region();

  const countryCode = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.entities?.transactionTypesMap?.[id]?.policyAddr?.countryCode
  );

  const provinces =
    useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.address?.province) || [];

  const dicts = useMemo(() => {
    return tenant.region({
      [Region.ID]: [],
      notMatch: () =>
        provinces.map((province: any) => ({
          dictCode: province.code,
          dictName: province.description,
        })),
    });
  }, [regionCode, provinces]);

  useEffect(() => {
    tenant.region({
      ID: null,
      notMatch: () => {
        if (formUtils.queryValue(countryCode)) {
          dispatch({
            type: `${NAMESPACE}/getAddress`,
            payload: {
              countryCode: formUtils.queryValue(countryCode),
            },
          });
        }
      },
    });
  }, [formUtils.queryValue(countryCode), regionCode]);

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
            dicts={formUtils.queryValue(countryCode) ? dicts : []}
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

const AddressLine5 = ({ isShow, layout, form, editable, section, id }: any) => (
  <Authority>
    <ElementConfig.Field config={localConfig} section={section} field={localFieldConfig.field}>
      <FormItem isShow={isShow} layout={layout} form={form} editable={editable} id={id} />
    </ElementConfig.Field>
  </Authority>
);

AddressLine5.displayName = localFieldConfig.field;

export default AddressLine5;

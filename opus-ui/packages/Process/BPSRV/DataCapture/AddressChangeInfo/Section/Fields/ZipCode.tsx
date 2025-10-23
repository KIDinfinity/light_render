import React from 'react';
import { Col, Icon } from 'antd';
import { useSelector, useDispatch } from 'dva';
import {
  Authority,
  Editable,
  ElementConfig,
  FormItemInput,
  Required,
  Visible,
  Rule,
} from 'basic/components/Form';
import lodash from 'lodash';
import { tenant, Region } from '@/components/Tenant';
import { localConfig } from '../index';
import { localFieldConfig } from './ZipCode.config';
import { NAMESPACE } from '../../../activity.config';

export { localFieldConfig } from './ZipCode.config';

let prevAbortController: any = null;

export const FormItem = ({ isShow, layout, form, editable, field, config, id }: any) => {
  const dispatch = useDispatch();
  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = true;
  const editableConditions = !Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  const Rules = {};

  const isLoading = useSelector(
    ({ loading }: any) => loading.effects[`${NAMESPACE}/getAddressByCode`]
  );

  const applyToPolicyBOList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.entities?.transactionTypesMap?.[id]?.policyAddr
  );

  const onBlur = (e: any) => {
    tenant.region({
      [Region.ID]: null,
      notMatch: async () => {
        if (!applyToPolicyBOList && !e.currentTarget.value) {
          return;
        }

        const abortController = new AbortController();
        if (prevAbortController) {
          prevAbortController.abort();
        }
        prevAbortController = abortController;

        await dispatch({
          type: `${NAMESPACE}/getAddressByCode`,
          signal: abortController.signal,
          payload: {
            postalCode: e.target.value,
            id,
          },
        });
      },
    });
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
          required={
            (config.required || fieldProps.required) === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          rules={lodash.compact(
            (config?.rules || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
          onBlur={onBlur}
          suffix={isLoading && <Icon type="loading" />}
        />
      </Col>
    )
  );
};

const ZipCode = ({ isShow, layout, form, editable, section, id }: any) => (
  <Authority>
    <ElementConfig.Field config={localConfig} section={section} field={localFieldConfig.field}>
      <FormItem isShow={isShow} layout={layout} form={form} editable={editable} id={id} />
    </ElementConfig.Field>
  </Authority>
);

ZipCode.displayName = localFieldConfig.field;

export default ZipCode;

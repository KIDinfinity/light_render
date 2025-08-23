import React, { useMemo } from 'react';
import { Col } from 'antd';
import lodash from 'lodash';
import {
  Editable,
  Required,
  Visible,
  Rule,
  FormItemSelect,
} from 'basic/components/Form';
import { localFieldConfig } from './ClientId.config';

export { localFieldConfig } from './ClientId.config';
import { useSelector } from 'dva';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';

export const FormItem = ({ isShow, layout, form, editable, field, config, sclale }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const policyClientRoleList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.processData?.policyInfo?.policyClientRoleList
  );
  const clientInfoList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.policyInfo?.clientInfoList
  );
  const mainPolicyId = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.mainPolicyId
  );
  const dicts = useMemo(() => {
    const insuredClientIdList = lodash
      .chain(policyClientRoleList)
      .filter((item) => item.policyId === mainPolicyId && item.customerRole === 'CUS002')
      .map('clientId')
      .value();
    return lodash
      .chain(clientInfoList)
      .filter((item) => lodash.includes(insuredClientIdList, item.clientId))
      .map((item) => {
        return {
          dictCode: item?.clientId,
          dictName: lodash
            .chain([item?.firstName, item?.middleName, item?.surname])
            .compact()
            .join(' ')
            .value(),
        };
      })
      .value();
  }, [clientInfoList, mainPolicyId, policyClientRoleList]);

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col
        {...layout}
        style={{
          width: `calc((1443px * ${sclale || 0.96} - 32px) / 24 * ${
            config?.['x-layout']?.lg?.span || fieldProps?.['x-layout']?.lg?.span
          })`,
          padding: 8,
        }}
      >
        <FormItemSelect
          getPopupContainer={() => document.querySelector('.AddNewRiders') || document.body}
          dicts={dicts}
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config?.name || field}
          labelId={config?.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={
            config?.required === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          hiddenPrefix
          precision={0}
          isInline
        />
      </Col>
    )
  );
};

FormItem.displayName = localFieldConfig.field;

export default FormItem;

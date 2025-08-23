import React from 'react';
import { Col } from 'antd';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';

import { Authority, Editable, FormItemInput, RuleByForm, formUtils } from 'basic/components/Form';
import useGetVisibleByConfigUseFormRule from 'basic/hooks/useGetVisibleByConfigUseFormRule';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

import useGetRequiredByRole from '../../../_hooks/useGetRequiredByRole';
import useJudgeIsTargetRelationOfInsured from '../../../_hooks/useJudgeIsTargetRelationOfInsured';
import { fieldConfig } from './Trusteename.config';
export { fieldConfig } from './Trusteename.config';

const FormItem = ({ isShow, layout, form, editable, field, config, id, readOnly }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const relationOfInsured = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      lodash.get(
        modelnamepsace,
        readOnly
          ? `entities.clientMap.${id}.personalInfo.relationOfInsured`
          : `modalData.entities.clientMap.${id}.personalInfo.relationOfInsured`
      ),
    shallowEqual
  );
  const customerType = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      lodash.get(
        modelnamepsace,
        readOnly
          ? `entities.clientMap.${id}.personalInfo.customerType`
          : `modalData.entities.clientMap.${id}.personalInfo.customerType`
      ),
    shallowEqual
  );
  const customerRole = useSelector(({ [NAMESPACE]: modelnamepsace }: any) =>
    lodash.get(
      modelnamepsace,
      readOnly
        ? `entities.clientMap.${id}.personalInfo?.customerRole`
        : `modalData.entities.clientMap.${id}.personalInfo?.customerRole`
    )
  );

  const isTargetRelationOfInsured = useJudgeIsTargetRelationOfInsured({
    relationOfInsuredOut: formUtils.queryValue(relationOfInsured),
    customerRoleOut: formUtils.queryValue(customerRole),
    customerTypeOut: formUtils.queryValue(customerType),
  });
  const visible = useGetVisibleByConfigUseFormRule({ config, fieldConfig });
  const trusteeNameVisible = isTargetRelationOfInsured ? false : visible;

  const editableConditions = !RuleByForm(config?.['editable-condition'], form);
  // const requiredConditions = RuleByForm(config?.['editable-condition'].filter((condition: any) => {
  //   return !lodash.isEqual(condition?.left, { domain: 'field', field: 'customerRole' });
  // }), form);
  const requiredConditions = false
  const requiredByRole = useGetRequiredByRole({
    requiredConditions,
    config,
    localConfig: fieldConfig,
    clientId: id,
  });

  return (
    isShow &&
    trusteeNameVisible && (
      <Col {...layout}>
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
          required={requiredByRole}
          hiddenPrefix
          precision={0}
        />
      </Col>
    )
  );
};

const Trusteename = ({ form, editable, config, layout, isShow, id, readOnly }: any) => (
  <Authority>
    <FormItem
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      field={fieldConfig?.field}
      config={config}
      id={id}
      readOnly={readOnly}
    />
  </Authority>
);

Trusteename.displayName = 'trusteeName';

export default Trusteename;

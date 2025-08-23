import React from 'react';
import { Col } from 'antd';

import { Authority, Editable, FormItemNumber, RuleByForm } from 'basic/components/Form';
import useGetVisibleByConfigUseFormRule from 'basic/hooks/useGetVisibleByConfigUseFormRule';

import useGetRequiredByRole from '../../../_hooks/useGetRequiredByRole';
import useJudgeIsTargetRelationOfInsured from '../../../_hooks/useJudgeIsTargetRelationOfInsured';
import { fieldConfig } from './Customerage.config';
import { useGetCustomerAgeTitle } from '../../../_hooks/useGetCustomerAgeTitle';
export { fieldConfig } from './Customerage.config';

export const FormItem = ({ isShow, layout, form, editable, field, config, id }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const isTargetRelationOfInsured = useJudgeIsTargetRelationOfInsured({ form });
  const visible = useGetVisibleByConfigUseFormRule({ config, fieldConfig });
  const customerAgeVisible = isTargetRelationOfInsured ? false : visible;

  const editableConditions = !RuleByForm(config?.['editable-condition'], form);
  const requiredConditions = false;
  const requiredByRole = useGetRequiredByRole({
    requiredConditions,
    config,
    localConfig: fieldConfig,
    clientId: id,
  });
  const title = useGetCustomerAgeTitle({
    clientId: id,
    labelId: config?.label?.dictCode || fieldProps.label.dictCode,
    labelTypeCode: config?.label?.dictTypeCode || fieldProps.label.dictTypeCode,
  });

  return (
    isShow &&
    customerAgeVisible && (
      <Col {...layout}>
        <FormItemNumber
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          title={title}
          required={requiredByRole}
          hiddenPrefix
          precision={0}
          loading
        />
      </Col>
    )
  );
};

const Customerage = ({ form, editable, layout, isShow, config, id }: any) => {
  return (
    <Authority>
      <FormItem
        field={fieldConfig?.field}
        config={config}
        isShow={isShow}
        layout={layout}
        form={form}
        editable={editable}
        id={id}
      />
    </Authority>
  );
};

Customerage.displayName = 'customerAge';

export default Customerage;

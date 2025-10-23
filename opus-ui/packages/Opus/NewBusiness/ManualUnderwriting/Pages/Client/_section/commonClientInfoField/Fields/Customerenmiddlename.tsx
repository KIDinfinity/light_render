import React from 'react';
import { Col } from 'antd';

import { Authority, Editable, FormItemInput, RuleByForm } from 'basic/components/Form';
import useGetVisibleByConfigUseFormRule from 'basic/hooks/useGetVisibleByConfigUseFormRule';

import useGetRequiredByRole from '../../../_hooks/useGetRequiredByRole';
import useJudgeIsTargetRelationOfInsured from '../../../_hooks/useJudgeIsTargetRelationOfInsured';
import { fieldConfig } from './Customerenmiddlename.config';

export { fieldConfig } from './Customerenmiddlename.config';

const FormItem = ({ isShow, layout, form, editable, field, config, id }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const isTargetRelationOfInsured = useJudgeIsTargetRelationOfInsured({ form });
  const visible = useGetVisibleByConfigUseFormRule({ config, fieldConfig });
  const customerEnMiddleNameVisible = isTargetRelationOfInsured ? false : visible;

  const editableConditions = !RuleByForm(config?.['editable-condition'], form);
  const requiredConditions = false;
  const requiredByRole = useGetRequiredByRole({
    requiredConditions,
    config,
    localConfig: fieldConfig,
    clientId: id
  });

  return (
    isShow &&
    customerEnMiddleNameVisible && (
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
          labelTypeCode={
            config?.label?.dictTypeCode || fieldProps.label.dictTypeCode
          }
          required={requiredByRole}
          hiddenPrefix
          precision={0}
          labelType="inline"
        />
      </Col>
    )
  );
};

const Customerenmiddlename = ({ field, config, form, editable, layout, isShow, id }: any) => (
  <Authority>
    <FormItem
      field={fieldConfig.field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      id={id}
    />
  </Authority>
);

Customerenmiddlename.displayName = 'customerEnMiddleName';

export default Customerenmiddlename;

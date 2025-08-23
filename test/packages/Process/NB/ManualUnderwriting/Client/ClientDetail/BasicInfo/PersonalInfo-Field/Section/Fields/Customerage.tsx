import React from 'react';
import useGetRequiredByRole from 'process/NB/ManualUnderwriting/_hooks/useGetRequiredByRole';
import useGetEditableByRole from 'process/NB/ManualUnderwriting/_hooks/useGetEditableByRole';
import { Col } from 'antd';
import { Authority, FormItemNumber } from 'basic/components/Form';
import useJudgeIsTargetRelationOfInsured from 'process/NB/ManualUnderwriting/_hooks/useJudgeIsTargetRelationOfInsured';
import useGetVisibleByConfigUseFormRule from 'basic/hooks/useGetVisibleByConfigUseFormRule';
import { fieldConfig } from './Customerage.config';
import { useGetCustomerAgeTitle } from 'process/NB/ManualUnderwriting/_hooks/useGetCustomerAgeTitle';

export { fieldConfig } from './Customerage.config';

export const FormItem = ({ isShow, layout, form, editable, field, config, id }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const isTargetRelationOfInsured = useJudgeIsTargetRelationOfInsured({ id });
  const visible = useGetVisibleByConfigUseFormRule({ config, fieldConfig });
  const customerAgeVisible = isTargetRelationOfInsured ? false : visible;

  const editableConditions = true;
  const editableByRole = useGetEditableByRole({
    editableConditions,
    config,
    localConfig: fieldConfig,
  });
  const requiredConditions = false;
  const requiredByRole = useGetRequiredByRole({
    requiredConditions,
    config,
    localConfig: fieldConfig,
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
          disabled={!editable || !editableByRole}
          form={form}
          formName={config.name || field}
          title={title}
          required={requiredByRole}
          hiddenPrefix
          precision={0}
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

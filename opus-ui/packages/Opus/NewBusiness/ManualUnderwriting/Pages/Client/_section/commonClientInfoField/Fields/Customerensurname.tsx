import React from 'react';
import { Col } from 'antd';

import { formatMessageApi } from '@/utils/dictFormatMessage';
import { Authority, Editable, FormItemInput, RuleByForm } from 'basic/components/Form';
import useGetVisibleByConfigUseFormRule from 'basic/hooks/useGetVisibleByConfigUseFormRule';

import useGetRequiredByRole from '../../../_hooks/useGetRequiredByRole';
import useJudgeIsTargetRelationOfInsured from '../../../_hooks/useJudgeIsTargetRelationOfInsured';
import { fieldConfig } from './Customerensurname.config';
export { fieldConfig } from './Customerensurname.config';

const FormItem = ({ isShow, layout, form, editable, field, config, id }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const isTargetRelationOfInsured = useJudgeIsTargetRelationOfInsured({ form });
  const customerType = form.getFieldValue('customerType');

  const visible = useGetVisibleByConfigUseFormRule({ config, fieldConfig });
  const customerEnSurnameVisible = isTargetRelationOfInsured ? false : visible;

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
    customerEnSurnameVisible && (
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
          placeholder={customerType === 'C' ? formatMessageApi({Label_BIZ_Entity: 'EntityName'}) : null}
        />
      </Col>
    )
  );
};

const Customerensurname = ({ field, config, form, editable, layout, isShow, id }: any) => (
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

Customerensurname.displayName = 'customerEnSurname';

export default Customerensurname;

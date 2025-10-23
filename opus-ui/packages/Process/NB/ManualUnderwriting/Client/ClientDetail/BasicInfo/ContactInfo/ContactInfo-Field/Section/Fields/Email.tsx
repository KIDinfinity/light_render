import React from 'react';
import { Col } from 'antd';

import { Authority, Editable, FormItemInput, Visible, RuleByForm } from 'basic/components/Form';
import { fieldConfig } from './Email.config';
import useGetBeneficiaryRole from 'process/NB/ManualUnderwriting/_hooks/useGetBeneficiaryRole';
import useGetRequiredByRole from 'process/NB/ManualUnderwriting/_hooks/useGetRequiredByRole';
import { tenant, Region } from '@/components/Tenant';
import useJudgeIsGBSN from 'basic/components/CaseContainer/hooks/useJudgeIsGBSN';

export { fieldConfig } from './Email.config';

const FormItem = ({ isShow, layout, form, editable, field, config, id }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const isSelectBeneficiary = useGetBeneficiaryRole({ id });
  const regionCode = tenant.region();
  const isGBSN = useJudgeIsGBSN();

  const visibleConditions = true;
  const editableConditions = !RuleByForm(fieldProps['editable-condition'], form);
  const requiredConditions =
    regionCode === Region.MY && !isGBSN
      ? isSelectBeneficiary
        ? RuleByForm(config?.['field-props']?.['required-condition'], form)
        : false
      : isSelectBeneficiary;
  const requiredByRole = useGetRequiredByRole({
    requiredConditions,
    config,
    localConfig: fieldConfig,
  });

  return (
    isShow &&
    ((config?.['field-props']?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.['field-props']?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemInput
          disabled={
            !editable ||
            ((config?.['field-props']?.editable || fieldProps.editable) === Editable.Conditions
              ? editableConditions
              : (config?.['field-props']?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config?.['field-props']?.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={
            config?.['field-props']?.label?.dictTypeCode || fieldProps.label.dictTypeCode
          }
          required={requiredByRole}
          hiddenPrefix
          precision={0}
          rules={[
            {
              type: 'email',
              message: 'The email address you supplied is invalid.',
            },
          ]}
        />
      </Col>
    )
  );
};

const Email = ({ form, editable, layout, isShow, id, config }: any) => {
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

Email.displayName = 'email';

export default Email;

import React from 'react';
import FormSection, { FormItemInput, FormItemNumber } from 'basic/components/Form/FormSection';

export default ({ form, taskNotEditable }: any) => {
  return (
    <FormSection
      layConf={{
        default: 8,
        ruleDescription: 16,
      }}
      isMargin={false}
    >
      <FormItemInput
        form={form}
        labelId="RuleName"
        labelTypeCode="Label_RUL_Rule"
        formName="ruleName"
        name="ruleName"
        disabled={taskNotEditable}
        required
      />
      <FormItemInput
        form={form}
        formName="ruleDescription"
        labelId="RuleDesc"
        labelTypeCode="Label_RUL_Rule"
        name="ruleDescription"
        disabled={taskNotEditable}
      />
      <FormItemNumber
        form={form}
        formName="rulePriority"
        labelId="RulePriority"
        labelTypeCode="Label_RUL_Rule"
        pattern={/^(-\d{1,9})|(\d{1,9})$/g}
        min={Number.MIN_SAFE_INTEGER}
        precision={0}
        disabled={taskNotEditable}
      />
      <FormItemInput
        form={form}
        formName="ruleRegion"
        labelId="RuleRegion"
        labelTypeCode="Label_RUL_Rule"
        name="ruleRegion"
        disabled={taskNotEditable}
      />
      <FormItemInput
        form={form}
        formName="ruleRemarkTranslator"
        labelId="RuleRemarkTranslator"
        labelTypeCode="Label_RUL_Rule"
        name="ruleRemarkTranslator"
        disabled={taskNotEditable}
      />
    </FormSection>
  );
};

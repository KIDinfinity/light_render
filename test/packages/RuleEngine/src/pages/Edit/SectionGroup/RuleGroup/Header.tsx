import React from 'react';
import FormSection, { FormItemInput, FormItemNumber } from 'basic/components/Form/FormSection';

export default ({ form, taskNotEditable }: any) => {
  return (
    <FormSection
      layConf={{
        default: 8,
        basicRuleId: 6,
        ruleName: 18,
        ruleDescription: 24,
      }}
      isMargin={false}
    >
      <FormItemInput
        form={form}
        formName="basicRuleId"
        name="basicRuleId"
        labelId="venus_claim.ruleEngine.label.ruleId"
        disabled
      />
      <FormItemInput
        form={form}
        formName="ruleName"
        labelId="venus_claim.ruleEngine.label.ruleName"
        name="ruleName"
        disabled={taskNotEditable}
        required
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

      <FormItemInput
        form={form}
        formName="ruleDescription"
        labelId="venus_claim.ruleEngine.label.ruleDescription"
        name="ruleDescription"
        disabled={taskNotEditable}
        required
      />
    </FormSection>
  );
};

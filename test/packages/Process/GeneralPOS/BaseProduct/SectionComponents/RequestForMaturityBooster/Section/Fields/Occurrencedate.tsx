import React, { useMemo } from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemDatePicker,
  Required,
  Visible,
  Validator,
  Rule,
  formUtils,
} from 'basic/components/Form';
import { fieldConfig } from './Occurrencedate.config';
import { NAMESPACE } from '../../../../activity.config';
import { DecisionEnum } from 'process/GeneralPOS/common/Enum';
import { isDecision } from 'process/GeneralPOS/common/utils';
import { useSelector, useDispatch } from 'dva';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';

export { fieldConfig } from './Occurrencedate.config';

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const visibleConditions = true;
  const editableConditions = !Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = true;
  const dispatch = useDispatch();
  const decision = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.decision
  );
  const mainPolicyId = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.mainPolicyId
  );
  const sourceSystem = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.sourceSystem
  );
  const policyInfo = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.policyInfo
  );
  const issueEffectiveDate = useMemo(() => {
    const { policyInfoList } = policyInfo || {};
    const info =
      lodash.find(
        policyInfoList,
        (item: any) => item.policyId === mainPolicyId && item.sourceSystem === sourceSystem
      ) || {};
    return info?.issueEffectiveDate;
  }, [mainPolicyId, policyInfo, sourceSystem]);
  const cleanDecision = formUtils.queryValue(decision);
  const { caseCategory, activityKey } = useSelector(({ processTask }: any) => processTask?.getTask);
  const validating = useSelector(
    ({ formCommonController }: any) => formCommonController?.validating
  );
  const riskDateName = formatMessageApi({
    Label_BIZ_Policy: 'PolicyIssueDate',
  });
  const occurrenceDate = form.getFieldValue('occurrenceDate');
  const validity = !!Number(form.getFieldValue('validity') || 0);

  const mustRule = {
    VLD_001012: Validator.VLD_001012(
      { form, fieldName: 'occurrenceDate' },
      issueEffectiveDate,
      riskDateName
    ),
  };

  const Rules =
    validity && isDecision({ caseCategory, activityKey }) && cleanDecision === DecisionEnum.A
      ? mustRule
      : {};

  const handleChange = () => {
    // 判断数据出现错误的时候才校验在非validating得时候
    if (
      validating ||
      !isDecision({ caseCategory, activityKey }) ||
      cleanDecision !== DecisionEnum.A
    )
      return;
    const hasError = form.getFieldError('occurrenceDate');
    if (hasError) {
      form.validateFields(['occurrenceDate'], { force: true });
    }
  };
  return (
    isShow &&
    ((config?.['field-props']?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.['field-props']?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemDatePicker
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
          required={
            config?.['field-props']?.required === Required.Conditions
              ? requiredConditions
              : (config?.['field-props']?.required || fieldProps.required) === Required.Yes
          }
          rules={lodash.compact(
            (config?.['x-rules'] || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
          onChange={handleChange}
          hiddenPrefix
          isInline
        />
      </Col>
    )
  );
};

const Occurrencedate = ({ field, form, editable, layout, isShow, config }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
    />
  </Authority>
);

Occurrencedate.displayName = 'occurrenceDate';

export default Occurrencedate;

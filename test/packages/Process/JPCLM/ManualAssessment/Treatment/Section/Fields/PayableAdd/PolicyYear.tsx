import React from 'react';
import { Col } from 'antd';
import lodash from 'lodash';
import { useSelector } from 'dva';
import {
  Authority,
  Visible,
  Editable,
  Required,
  FormItemNumber,
} from 'basic/components/Form';

import { localFieldConfig } from './PolicyYear.config';

export { localFieldConfig } from './PolicyYear.config';

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const listPolicy = useSelector(
    ({ JPCLMOfClaimAssessment }: any) => JPCLMOfClaimAssessment.listPolicy
  );

  const policyNo = form.getFieldValue('policyNo');
  const productCode = form.getFieldValue('productCode');
  const benefitTypeCode = form.getFieldValue('benefitTypeCode');

  const calculateByPolicyYear = lodash.find(listPolicy, {
    policyNo,
    benefitTypeCode,
    coreProductCode: productCode,
  })?.calculateByPolicyYear;

  const visibleConditions = lodash.includes(['Y', 'F'], calculateByPolicyYear);
  const editableConditions = true;
  const requiredConditions = true;

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemNumber
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? !editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={
            config?.required === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          precision={0}
          min={0}
          max={999999999.99}
        />
      </Col>
    )
  );
};

const PolicyYear = ({ field, config, isShow, layout, form, editable, }: any) => (
  <Authority>
    <FormItem field={field} config={config} isShow={isShow} layout={layout} form={form} editable={editable} />
  </Authority>
);

PolicyYear.displayName = localFieldConfig.field;

export default PolicyYear;

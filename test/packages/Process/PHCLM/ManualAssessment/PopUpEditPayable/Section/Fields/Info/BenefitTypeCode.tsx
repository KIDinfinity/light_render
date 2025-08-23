import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Visible,
  Editable,
  Required,
  FormItemSelect,
} from 'basic/components/Form';
import { getPolicyList, getPolicyForBenefitTypeList } from 'basic/utils/PolicyUtils';
import { NAMESPACE } from '../../../../activity.config';
import { localFieldConfig } from './BenefitTypeCode.config';

export { localFieldConfig } from './BenefitTypeCode.config';

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const listPolicy = getPolicyList(NAMESPACE);

  const policyList = getPolicyForBenefitTypeList({
    listPolicy,
    policyNo: form.getFieldValue('policyNo'),
    coverageKey: false,
  });

  const visibleConditions = true;
  const editableConditions = false;
  const requiredConditions = false;

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={policyList} // TODO: 动态下拉
          dictCode={config?.['x-dict']?.dictCode || fieldProps['x-dict'].dictCode}
          dictName={config?.['x-dict']?.dictName || fieldProps['x-dict'].dictName}
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
          labelType="inline"
          bordered
        />
      </Col>
    )
  );
};

const BenefitTypeCode = ({ field, config,
  isShow,
  layout,
  form,
  editable,
  incidentId,
  policyNo,
  existBenefitType,
}: any) => (
  <Authority>
    <FormItem
      field={field} config={config} isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      incidentId={incidentId}
      policyNo={policyNo}
      existBenefitType={existBenefitType}
    />
  </Authority>
);

BenefitTypeCode.displayName = 'BenefitTypeCode';

export default BenefitTypeCode;

import React, { useMemo } from 'react';

import { NAMESPACE } from '../../../../activity.config';

import { Col } from 'antd';
import {
  Authority,
  Visible,
  Editable,
  Required,
  FormItemSelect,
} from 'basic/components/Form';
import { getPolicyList, getPolicyForBenefitTypeList } from 'basic/utils/PolicyUtils';
import { localFieldConfig } from './BenefitTypeCode.config';

export { localFieldConfig } from './BenefitTypeCode.config';

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const listPolicy = getPolicyList(NAMESPACE);

  const policyNo = form.getFieldValue('policyNo');
  const dicts = useMemo(() => {
    return getPolicyForBenefitTypeList({ policyNo, listPolicy, coverageKey: true });
  }, [listPolicy, policyNo]);

  const visibleConditions = true;
  const editableConditions = true;
  const requiredConditions = true;

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={dicts} // TODO: 动态下拉
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
        />
      </Col>
    )
  );
};

const BenefitTypeCode = ({ field, config, isShow, layout, form, editable, }: any) => (
  <Authority>
    <FormItem field={field} config={config} isShow={isShow} layout={layout} form={form} editable={editable} />
  </Authority>
);

BenefitTypeCode.displayName = 'oldBenefitTypeCode';

export default BenefitTypeCode;

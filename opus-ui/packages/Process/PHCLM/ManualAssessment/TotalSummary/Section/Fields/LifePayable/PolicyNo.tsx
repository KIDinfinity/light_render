import React, { useMemo } from 'react';
import { NAMESPACE } from '../../../../activity.config';
import lodash from 'lodash'
import { Col } from 'antd';
import {
  Authority,
  Visible,
  Editable,
  Required,
  FormItemSelect,
  Rule,
} from 'basic/components/Form';
import { getPolicyList } from 'basic/utils/PolicyUtils';

import { localFieldConfig } from './PolicyNo.config';

export { localFieldConfig } from './PolicyNo.config';

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  existBenefitType,
}: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const listPolicy = getPolicyList(NAMESPACE);

  const dicts = useMemo(() => {
    return lodash.uniqBy(listPolicy, 'policyNo');
  }, [listPolicy]);

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

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
          existCodes={existBenefitType}
        />
      </Col>
    )
  );
};

const PolicyNo = ({ field, config, isShow, layout, form, editable, existBenefitType }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      existBenefitType={existBenefitType}
    />
  </Authority>
);

PolicyNo.displayName = localFieldConfig.field;

export default PolicyNo;

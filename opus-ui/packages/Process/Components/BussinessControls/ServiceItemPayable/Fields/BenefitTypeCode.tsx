import React from 'react';

import { Col } from 'antd';
import { useSelector } from 'dva';
import lodash from 'lodash';
import {
  Authority,
  Visible,
  Editable,
  Required,
  FormItemSelect,
  Rule,
} from 'basic/components/Form';

import { localFieldConfig } from './BenefitTypeCode.config';

export { localFieldConfig } from './BenefitTypeCode.config';

export const FormItem = ({ isShow, layout, form, editable, field, config, NAMESPACE }: any) => {
  const fieldProps: any = config || localFieldConfig['field-props'];

  const listPolicy = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.listPolicy
  );

  const policyList = lodash
    .chain(listPolicy)
    .filter(
      (item) =>
        lodash.toUpper(item.policyNo) === lodash.toUpper(form.getFieldValue('policyNo')) &&
        item.booster !== 'Y'
    )
    .map((item) => ({
      benefitTypeCode: item.benefitTypeCode,
      benefitTypeName:
        lodash.isString(item?.coverageKey) && item?.coverageKey.slice(2, 3)
          ? `${item?.coverageKey.slice(2, 4)}-${item.benefitTypeName}`
          : item.benefitTypeName,
    }))
    .uniqBy('benefitTypeCode')
    .value();

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
          dicts={policyList} // TODO: 动态下拉
          dictCode={'benefitTypeCode'}
          dictName={'benefitTypeName'}
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? !editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label?.dictTypeCode}
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

const BenefitTypeCode = ({ field, config, isShow, layout, form, editable, NAMESPACE, id }: any) => (
  <Authority>
    <FormItem
      field={field} config={config} isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      id={id}
      NAMESPACE={NAMESPACE}
    />
  </Authority>
);

BenefitTypeCode.displayName = 'BenefitTypeCode';

export default BenefitTypeCode;

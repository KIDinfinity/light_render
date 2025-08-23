import React from 'react';

import { Col } from 'antd';
import {
  Authority,
  Visible,
  Editable,
  Required,
  FormItemSelect,
} from 'basic/components/Form';
import { useSelector } from 'dva';
import lodash from 'lodash';
import { checkServicePayableList } from 'claimBasicProduct/pages/validators';
import { localFieldConfig } from './BenefitItemCode.config';

export { localFieldConfig } from './BenefitItemCode.config';

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  NAMESPACE,
  curServicePayableList,
  serviceItemPayableItem,
}: any) => {
  const fieldProps: any = config || localFieldConfig['field-props'];
  const listPolicy = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.listPolicy
  );

  const getPolicyList = () => {
    const policyList = lodash.filter(
      listPolicy,
      (item) =>
        item.policyNo === form.getFieldValue('policyNo') &&
        item.coreProductCode === form.getFieldValue('productCode') &&
        item.benefitTypeCode === form.getFieldValue('benefitTypeCode')
    );

    return policyList;
  };

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
          dicts={getPolicyList()} // TODO: 动态下拉
          dictCode={'benefitItemCode'}
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
          rules={[
            {
              validator: (rule: any, value: any, callback: Function) =>
                checkServicePayableList(
                  rule,
                  value,
                  callback,
                  curServicePayableList,
                  serviceItemPayableItem
                ),
            },
          ]}
          optionShowType="both"
          labelType={config.label?.type || fieldProps.label.type}
        />
      </Col>
    )
  );
};

const BenefitItemCode = ({ field, config, isShow, layout, form, editable, NAMESPACE, }: any) => (
  <Authority>
    <FormItem
      field={field} config={config} isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      NAMESPACE={NAMESPACE}
    />
  </Authority>
);

BenefitItemCode.displayName = 'BenefitItemCode';

export default BenefitItemCode;

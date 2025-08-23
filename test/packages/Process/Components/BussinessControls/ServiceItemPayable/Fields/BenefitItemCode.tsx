import React, { useMemo } from 'react';
import { Col } from 'antd';
import {
  Authority,
  Visible,
  Editable,
  Required,
  FormItemSelect,
  Rule,
  Validator,
  formUtils,
} from 'basic/components/Form';
import { useSelector } from 'dva';
import lodash from 'lodash';
import { localFieldConfig } from './BenefitItemCode.config';

export { localFieldConfig } from './BenefitItemCode.config';

export const FormItem = ({ isShow, layout, form, editable, field, config, id, NAMESPACE }: any) => {
  const fieldProps: any = config || localFieldConfig['field-props'];

  const serviceItemPayableItem = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.serviceItemPayableListMap?.[id]
  );
  const listPolicy = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.listPolicy
  );
  const { policyNo, productCode, benefitTypeCode } = formUtils.cleanValidateData(
    serviceItemPayableItem
  );
  const policyList = useMemo(() => {
    return (
      lodash
        .chain(listPolicy)
        .filter(
          (item) =>
            item.policyNo === policyNo &&
            item.coreProductCode === productCode &&
            item.benefitTypeCode === benefitTypeCode
        )
        .uniqBy('benefitItemCode')
        .value() || []
    );
  }, [policyNo, productCode, benefitTypeCode, listPolicy]);

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  const curServicePayableList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.invoicePayableListMap?.[
        serviceItemPayableItem?.invoicePayableId
      ]?.serviceItemPayableList
  );
  const Rules = {
    VLD_000617: Validator.checkServicePayableList(curServicePayableList, serviceItemPayableItem),
  };

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={policyList}
          dictCode={'benefitItemCode'}
          dictName={'benefitItemName'}
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
          rules={lodash.compact(
            (config?.rules || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
          optionShowType="both"
          labelType="inline"
        />
      </Col>
    )
  );
};

const BenefitItemCode = ({ field, config, isShow, layout, form, editable, id, NAMESPACE }: any) => (
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

BenefitItemCode.displayName = 'BenefitItemCode';

export default BenefitItemCode;

import React, { useMemo } from 'react';
import { Col } from 'antd';
import {
  Authority,
  Visible,
  Editable,
  Required,
  FormItemSelect,
} from 'basic/components/Form';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { IsAdjustment } from 'claim/enum/IsAdjustment';
import { NAMESPACE } from 'opus/Pages/Process/Claim/ManualAssessment/activity.config';

import { localFieldConfig } from './BenefitTypeCode.config';

export { localFieldConfig };

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const listPolicy = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.listPolicy
  );

  const policyNo = form.getFieldValue('policyNo');
  const productCode = form.getFieldValue('productCode');
  const dicts = useMemo(() => {
    const policyGrouped = lodash.groupBy(listPolicy, 'policyNo');
    const filteredList = policyGrouped[policyNo];
    const productGrouped = lodash.groupBy(filteredList, 'coreProductCode');
    const productFilteredList = productGrouped[productCode];
    const benefitTypeList = lodash.uniqBy(productFilteredList, 'benefitTypeCode');

    return benefitTypeList;
  }, [listPolicy, policyNo, productCode]);

  const visibleConditions = true;
  const editableConditions = form.getFieldValue('isAdjustment') !== IsAdjustment.Yes;
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
          rules={lodash.compact(
            (config?.rules || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
          optionShowType="name"
          dictTypeCode="Dropdown_PRD_BenefitType"
        />
      </Col>
    )
  );
};

const BenefitTypeCode = ({
  field,
  config,
  isShow,
  layout,
  form,
  editable,
  incidentPayableItem,
  curIncidentPayableList,
  isDeclined,
  isNA,
}: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      incidentPayableItem={incidentPayableItem}
      curIncidentPayableList={curIncidentPayableList}
      isDeclined={isDeclined}
      isNA={isNA}
    />
  </Authority>
);

BenefitTypeCode.displayName = localFieldConfig.field;

export default BenefitTypeCode;

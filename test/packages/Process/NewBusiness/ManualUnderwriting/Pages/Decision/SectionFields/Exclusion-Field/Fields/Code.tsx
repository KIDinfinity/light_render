import React from 'react';
import { Col } from 'antd';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import {
  Authority,
  Editable,
  FormItemSelect,
  Required,
  Visible,
  RuleByForm,
  formUtils,
} from 'basic/components/Form';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import { fieldConfig } from './Code.config';

export { fieldConfig } from './Code.config';

const FormItem = ({
  isShow,
  editable,
  field,
  config,
  layout,
  form,
  labelType,
  productCode,
}: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const exclusionList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.exclusionList,
    shallowEqual
  );
  const productName = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.productSection.productName
  );
  const dicts = lodash
    .chain(exclusionList)
    .filter(
      (item) =>
        item.productCode === formUtils.queryValue(productName) ||
        item.productCode === formUtils.queryValue(productCode) ||
        lodash.isEmpty(item.productCode)
    )
    .map((item: any) => {
      return {
        dictCode: item?.localExclusionCode,
        dictName: item?.longDesc,
      };
    })
    .value();
  const visibleConditions = true;
  const editableConditions = !RuleByForm(fieldProps['editable-condition'], form);
  const requiredConditions = true;
  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={dicts}
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? editableConditions
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
          labelType={labelType}
          hiddenPrefix
          precision={0}
          optionShowType="both"
          placeholder=""
          dropdownMatchSelectWidth={true}
        />
      </Col>
    )
  );
};

const ExclusionName = ({
  field,
  config,
  form,
  editable,
  isShow,
  layout,
  labelType,
  productCode,
}: any) => {
  return (
    <Authority>
      <FormItem
        field={field}
        config={config}
        isShow={isShow}
        layout={layout}
        form={form}
        editable={editable}
        labelType={labelType}
        productCode={productCode}
      />
    </Authority>
  );
};

ExclusionName.displayName = 'code';

export default ExclusionName;

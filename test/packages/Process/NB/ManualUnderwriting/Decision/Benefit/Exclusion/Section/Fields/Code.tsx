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
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import { fieldConfig } from './Code.config';

export { fieldConfig } from './Code.config';

const FormItem = ({ isShow, editable, field, config, layout, form, productCode }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const exclusionList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.exclusionList,
    shallowEqual
  );
  const dicts = lodash
    .chain(exclusionList)
    .filter(
      (item) =>
        item.productCode === formUtils.queryValue(productCode) || lodash.isEmpty(item.productCode)
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
          isInline
          hiddenPrefix
          precision={0}
          optionShowType="both"
          placeholder=" "
        />
      </Col>
    )
  );
};

const ExclusionName = ({ field, config, form, editable, isShow, productCode }: any) => {
  const localLayout = {
    // 480px
    xs: {
      span: 6,
      offset: 0,
      pull: 0,
      order: 52,
    },
    // 576px
    sm: {
      span: 6,
      offset: 0,
      pull: 0,
      order: 52,
    },
    // 768px
    md: {
      span: 6,
      offset: 0,
      pull: 0,
      order: 52,
    },
    // 992px
    lg: {
      span: 6,
      offset: 0,
      pull: 0,
      order: 52,
    },
    // 1200px
    xl: {
      span: 6,
      offset: 0,
      pull: 0,
      order: 52,
    },
    // 1600px
    xxl: {
      span: 6,
      offset: 0,
      pull: 0,
      order: 52,
    },
  };
  return (
    <Authority>
      <FormItem
        field={field}
        config={config}
        isShow={isShow}
        layout={localLayout}
        form={form}
        editable={editable}
        productCode={productCode}
      />
    </Authority>
  );
};

ExclusionName.displayName = 'code';

export default ExclusionName;

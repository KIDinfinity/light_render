import React from 'react';
import { Col } from 'antd';
import lodash from 'lodash';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { Authority, Editable, FormItemSelect, FormItemNumber, Required, Visible } from 'basic/components/Form';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import useHaveSaMultiplierInd from 'decision/components/Benefit/Edit/_hooks/useHaveSaMultiplierInd';
import FieldType from 'enum/FieldType';
import { fieldConfig } from './SumAssuredMultiplier.config';

export { fieldConfig } from './SumAssuredMultiplier.config';

const FormItem = ({ isShow, layout, form, field, config, coreCode, fieldType }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const isDropDown = FieldType.Dropdown === fieldType;
  const dicts =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.SAMultiplierOPUSListMap?.[coreCode],
      shallowEqual
    ) || [];
  const haveSaMultiplierInd = useHaveSaMultiplierInd();
  const visibleConditions = !!haveSaMultiplierInd;
  const editableConditions = !lodash.includes(haveSaMultiplierInd, coreCode);
  const requiredConditions = lodash.includes(haveSaMultiplierInd, coreCode);

  const FormComponent = isDropDown? FormItemSelect : FormItemNumber;
  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormComponent
          dicts={isDropDown? dicts : void 0}
          disabled={
            (config?.editable || fieldProps.editable) === Editable.Conditions
              ? editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No
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
          hiddenPrefix
          precision={0}
          placeholder=" "
        />
      </Col>
    )
  );
};

const SumAssuredMultiplier = ({ field, config, form, layout, isShow, coreCode, fieldType }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config?.['field-props']}
      isShow={isShow}
      layout={layout}
      form={form}
      coreCode={coreCode}
      fieldType={fieldType}
    />
  </Authority>
);

SumAssuredMultiplier.displayName = 'sumAssuredMultiplier';

export default SumAssuredMultiplier;

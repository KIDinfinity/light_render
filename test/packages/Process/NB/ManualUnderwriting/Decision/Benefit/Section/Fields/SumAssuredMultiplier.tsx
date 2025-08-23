import React from 'react';
import { Col } from 'antd';
import lodash from 'lodash';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { Authority, Editable, FormItemSelect, Required, Visible } from 'basic/components/Form';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import useHaveSaMultiplierInd from 'process/NB/ManualUnderwriting/_hooks/useHaveSaMultiplierInd';
import { fieldConfig } from './SumAssuredMultiplier.config';

export { fieldConfig } from './SumAssuredMultiplier.config';

const FormItem = ({ isShow, layout, form, field, config, coreCode }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const dicts =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.SAMultiplierOPUSListMap?.[coreCode],
      shallowEqual
    ) || [];
  const haveSaMultiplierInd = useHaveSaMultiplierInd();
  const visibleConditions = !!haveSaMultiplierInd;
  const editableConditions = !lodash.includes(haveSaMultiplierInd, coreCode);
  const requiredConditions = lodash.includes(haveSaMultiplierInd, coreCode);

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={dicts}
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

const SumAssuredMultiplier = ({ field, config, form, layout, isShow, coreCode }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config?.['field-props']}
      isShow={isShow}
      layout={layout}
      form={form}
      coreCode={coreCode}
    />
  </Authority>
);

SumAssuredMultiplier.displayName = 'sumAssuredMultiplier';

export default SumAssuredMultiplier;

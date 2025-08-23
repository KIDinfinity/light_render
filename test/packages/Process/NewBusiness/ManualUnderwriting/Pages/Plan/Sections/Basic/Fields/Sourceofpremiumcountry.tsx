import React from 'react';
import lodash from 'lodash';

import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemSelect,
  Required,
  Visible,
  Rule,
} from 'basic/components/Form';
import { fieldConfig } from './Sourceofpremiumcountry.config';
import {
  useCalcRequireByConditions,
  useGetCountryDropdown,
} from 'process/NewBusiness/ManualUnderwriting/Pages/Plan/_hooks';
export { fieldConfig } from './Sourceofpremiumcountry.config';

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const dicts = useGetCountryDropdown();
  const visibleConditions = true;
  const editableConditions = !Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = useCalcRequireByConditions({
    conditionsConfig: lodash.get(config, 'required-condition'),
  });
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
          hiddenPrefix
          precision={0}
        />
      </Col>
    )
  );
};

const Sourceofpremiumcountry = ({ form, editable, config, field, layout, isShow }: any) => (
  <Authority>
    <FormItem
      field={fieldConfig?.field}
      isShow={isShow}
      config={config}
      layout={layout}
      form={form}
      editable={editable}
    />
  </Authority>
);

Sourceofpremiumcountry.displayName = 'sourceOfPremiumCountry';

export default Sourceofpremiumcountry;

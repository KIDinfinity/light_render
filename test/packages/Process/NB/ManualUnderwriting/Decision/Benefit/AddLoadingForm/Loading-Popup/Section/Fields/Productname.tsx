import React from 'react';
import { Col } from 'antd';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import {
  Authority,
  Editable,
  FormItemSelect,
  Required,
  Visible,
  Rule,
} from 'basic/components/Form';
import lodash from 'lodash';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import { fieldConfig } from './Productname.config';
import useGetProductDropdownListForLoading from 'process/NB/ManualUnderwriting/_hooks/useGetProductDropdownListForLoading';
import useSetProductNameOptionDisabled from 'process/NB/ManualUnderwriting/_hooks/useSetProductNameOptionDisabled';

export { fieldConfig } from './Productname.config';

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const productNameList = useGetProductDropdownListForLoading();
  const visibleConditions = true;
  const editableConditions = !Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = true;
  const existCodes = useSetProductNameOptionDisabled();
  const isSingleChoice = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.isExceptionalAddLoading,
    shallowEqual
  );
  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          mode={isSingleChoice ? 'default' : 'multiple'}
          dicts={productNameList}
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
          existCodes={existCodes}
          hiddenPrefix
          precision={0}
        />
      </Col>
    )
  );
};

const Productname = ({ form, editable, layout, isShow, config }: any) => (
  <Authority>
    <FormItem
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      config={lodash.get(config, 'field-props')}
      field={fieldConfig?.field}
    />
  </Authority>
);

Productname.displayName = 'productName';

export default Productname;

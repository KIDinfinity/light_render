import React from 'react';
import { Col } from 'antd';
import lodash from 'lodash';
import {
  Authority,
  Editable,
  FormItemSelect,
  Required,
  Visible,
} from 'basic/components/Form';
import useFilterFundCodeDicts from 'process/NB/ManualUnderwriting/_hooks/useFilterFundCodeDicts';
import useGetAutoAttachFundStatus from 'process/NB/ManualUnderwriting/_hooks/useGetAutoAttachFundStatus';
import { fieldConfig } from './Fundcode.config';
export { fieldConfig } from './Fundcode.config';

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = fieldConfig['field-props'];

  const fundCodeDicts = useFilterFundCodeDicts(form.getFieldValue('fundCode'));
  const visibleConditions = true;
  const autoAttachFundStatus = useGetAutoAttachFundStatus();
  const editableConditions = autoAttachFundStatus;
  const requiredConditions = true;

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={fundCodeDicts}
          dictCode="fundCode"
          dictName="fundName"
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
          // optionShowType="both"
          required={
            config?.required === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          hiddenPrefix
          labelType="inline"
          precision={0}
          getPopupContainer={() => document.body}
        />
      </Col>
    )
  );
};

const Fundcode = ({ field, config, form, editable, layout, isShow }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={lodash.get(config, 'field-props')}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
    />
  </Authority>
);

Fundcode.displayName = 'fundCode';

export default Fundcode;

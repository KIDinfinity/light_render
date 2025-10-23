import React from 'react';
import { Col } from 'antd';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import useGetPayType from 'process/NB/ManualUnderwriting/_hooks/useGetPayType';
import { Authority, Editable, FormItemInput, Required, Visible } from 'basic/components/Form';
import { fieldConfig } from './Factoringhouse.config';

export { fieldConfig } from './Factoringhouse.config';

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const payTypeCollection = useGetPayType();
  const renewalPayType = formUtils.queryValue(lodash.get(payTypeCollection, 'renewalPayType'));
  const fieldProps: any = fieldConfig['field-props'];
  const visibleConditions = true;
  const editableConditions = renewalPayType === 'R';
  const requiredConditions = renewalPayType === 'R';

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemInput
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

const Factoringhouse = ({ form, editable, config, layout, isShow }: any) => (
  <Authority>
    <FormItem
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      field={config?.field}
      config={lodash.get(config, 'field-props')}
    />
  </Authority>
);

Factoringhouse.displayName = 'factoringHouse';

export default Factoringhouse;

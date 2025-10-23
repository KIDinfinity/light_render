import React, { useCallback } from 'react';
import { Col } from 'antd';
import { useDispatch } from 'dva';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import {
  Authority,
  Editable,
  FormItemSelect,
  Required,
  Visible,
  Rule,
  RuleByForm,
} from 'basic/components/Form';
import { fieldConfig } from './AnnualIncomeCurrency.config';
import { getDrowDownList } from '@/utils/dictFormatMessage';

export { fieldConfig } from './AnnualIncomeCurrency.config';

const FormItem = ({ isShow, layout, form, editable, field, id, config }: any) => {
  const dispatch = useDispatch();
  const fieldProps: any = fieldConfig['field-props'];
  const dicts = getDrowDownList({ config, fieldProps });

  const visibleConditions = true;
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = RuleByForm(fieldProps['required-condition'], form);

  const onChange = useCallback(
    (value: string) => {
      dispatch({
        type: `${NAMESPACE}/saveBackgroundInfo`,
        payload: {
          annualIncomeCurrencySecondary: value,
          id,
        },
      });
    },
    [id]
  );

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          allowClear={false}
          dicts={dicts}
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
          hiddenPrefix
          precision={0}
          onChange={onChange}
          placeholder=" "
        />
      </Col>
    )
  );
};

const AnnualIncomeCurrency = ({ field, config, form, editable, layout, isShow }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
    />
  </Authority>
);

AnnualIncomeCurrency.displayName = 'annualIncomeCurrency';

export default AnnualIncomeCurrency;

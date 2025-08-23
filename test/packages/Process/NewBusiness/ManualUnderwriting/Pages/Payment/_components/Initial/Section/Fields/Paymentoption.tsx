import React, { useEffect } from 'react';
import { Col } from 'antd';
import lodash from 'lodash';
import { useDispatch } from 'dva';
import {
  Authority,
  Editable,
  FormItemSelect,
  Required,
  Visible,
  RuleByForm,
} from 'basic/components/Form';
import { fieldConfig } from './Paymentoption.config';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

import useGetPaymentOptionDicts from 'process/NewBusiness/ManualUnderwriting/Pages/Payment/_hooks/useGetPaymentOptionDicts';

export { fieldConfig } from './Paymentoption.config';

const FormItem = ({ isShow, layout, form, editable, field, config, showOnly }: any) => {
  const dispatch = useDispatch();
  const fieldProps: any = fieldConfig['field-props'];

  const { payType: parentCode, id, paymentOption } = form.getFieldsValue([
    'id',
    'payType',
    'paymentOption',
  ]);

  const dicts = useGetPaymentOptionDicts({
    config,
    fieldConfig,
    parentCode,
    parentFieldName: 'Dropdown_POL_InitialPaymentMethod',
  });

  useEffect(() => {
    // TODO:如果不在列表里，清除paymentOption数据,加这么多判断是为了防止不必要的重复渲染
    if (
      !lodash.isEmpty(dicts) &&
      !!paymentOption &&
      !showOnly &&
      !lodash.find(dicts, ({ dictCode }: any) => dictCode === paymentOption)
    ) {
      dispatch({
        type: `${NAMESPACE}/updatePaymentList`,
        payload: {
          changedFields: {
            paymentOption: '',
          },
          id,
        },
      });
    }
  }, [showOnly, paymentOption, id, dicts]);

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
          getPopupContainer={() => document.body}
          hiddenPrefix
          precision={2}
        />
      </Col>
    )
  );
};

const Paymentoption = ({ form, editable, config, layout, isShow, showOnly }: any) => (
  <Authority>
    <FormItem
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      field={fieldConfig?.field}
      config={config}
      showOnly={showOnly}
    />
  </Authority>
);

Paymentoption.displayName = 'paymentOption';

export default Paymentoption;

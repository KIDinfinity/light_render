import React from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { Col } from 'antd';
import lodash from 'lodash';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import {
  Authority,
  Editable,
  FormItemSelect,
  Required,
  Visible,
  RuleByForm,
} from 'basic/components/Form';
import useExistUsdpayoutidByCoreCode from 'process/NB/ManualUnderwriting/_hooks/useExistUsdpayoutidByCoreCode';
import { fieldConfig } from './BankCode.config';

export { fieldConfig } from './BankCode.config';

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const bankCodeList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.bankCodeList,
    shallowEqual
  );
  const visibleConditions = true;
  const editableConditions = !RuleByForm(fieldProps['editable-condition'], form);
  const requiredConditions = useExistUsdpayoutidByCoreCode();

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={bankCodeList}
          dictCode="bankCode"
          dictName="bankName"
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

const BankCode = ({ form, editable, config, layout, isShow }: any) => (
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

BankCode.displayName = 'bankCode';

export default BankCode;

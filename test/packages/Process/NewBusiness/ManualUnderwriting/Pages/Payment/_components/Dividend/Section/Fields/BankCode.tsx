import React, { useMemo } from 'react';
import { Col } from 'antd';
import lodash from 'lodash';
import { useSelector } from 'dva';
import {
  Authority,
  Editable,
  FormItemSelect,
  Required,
  Visible,
  RuleByForm,
} from 'basic/components/Form';
import { fieldConfig } from './BankCode.config';

export { fieldConfig } from './BankCode.config';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = fieldConfig['field-props'];

  const activeLanguage = useSelector(({ language }: any) => language.activeLanguage);
  const searchBankCodeList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.searchBankCodeList
  );

  const dicts = useMemo(() => {
    return lodash.filter(searchBankCodeList, (item) => item.language === activeLanguage);
  }, [activeLanguage, searchBankCodeList]);

  const visibleConditions = RuleByForm(fieldProps['visible-condition'], form);
  const editableConditions = !RuleByForm(fieldProps['editable-condition'], form);
  const requiredConditions = false;

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={dicts}
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
          getPopupContainer={() => document.body}
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
      field={fieldConfig?.field}
      config={config}
    />
  </Authority>
);

BankCode.displayName = 'bankCode';

export default BankCode;

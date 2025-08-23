import React from 'react';
import { Col } from 'antd';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import {
  Authority,
  Editable,
  FormItemSelect,
  Visible,
  RuleByForm,
  formUtils,
} from 'basic/components/Form';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

import { fieldConfig } from './CountryofTaxResidence.config';
export { fieldConfig } from './CountryofTaxResidence.config';

const FormItem = ({ isShow, layout, form, editable, field, config, id }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const dicts = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.addressDict?.country?.dict,
    shallowEqual
  );
  const usTaxFlag = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.modalData.entities?.clientMap?.[id]?.financialInfo.usTaxFlag
  );

  const visibleConditions = true;
  const editableConditions = !RuleByForm(config?.['editable-condition'], form);
  const requiredConditions = formUtils.queryValue(usTaxFlag) === 'Y';

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
          labelId={config?.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={requiredConditions}
          hiddenPrefix
          precision={0}
          placeholder=""
          dictCode="subCode"
          dictName="subName"
        />
      </Col>
    )
  );
};

const CountryofTaxResidence = ({
  form,
  editable,
  layout,
  isShow,
  config,
  id,
  crtItemId,
  readOnly,
}: any) => {
  return (
    <Authority>
      <FormItem
        field={fieldConfig?.field}
        config={config}
        isShow={isShow}
        layout={layout}
        form={form}
        editable={editable}
        id={id}
        crtItemId={crtItemId}
        readOnly={readOnly}
      />
    </Authority>
  );
};

CountryofTaxResidence.displayName = 'ctfCountryCode';

export default CountryofTaxResidence;

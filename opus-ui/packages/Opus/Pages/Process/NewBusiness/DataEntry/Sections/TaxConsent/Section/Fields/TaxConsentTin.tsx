import React from 'react';
import { Col } from 'antd';
import { useSelector } from 'dva';
import {
  Authority,
  Editable,
  FormItemInput,
  Required,
  Visible,
  formUtils,
} from 'basic/components/Form';

import { NAMESPACE } from '../../../../activity.config';

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const insuredNationality = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.processData?.insuredInfo?.nationality
  );
  const fieldProps: any = config;
  const visibleConditions =
    form.getFieldValue('taxConsentOption') === 'Yes' &&
    formUtils.queryValue(insuredNationality) !== 'TH';
  const editableConditions = true;
  const requiredConditions = true;

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
          maxLength={config?.maxLength}
        />
      </Col>
    )
  );
};
const field = 'tin';

const TaxConsentTin = ({ config, form, editable, layout, isShow }: any) => (
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

TaxConsentTin.displayName = field;

export default TaxConsentTin;

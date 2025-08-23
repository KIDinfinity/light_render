import React, { useMemo } from 'react';
import { Col } from 'antd';
import {
  Authority,
  Visible,
  Editable,
  Required,
  FormItemNumber,
} from 'basic/components/Form';
import useJugeDisplayIntialIvestment from 'decision/components/Benefit/_hooks/useJugeDisplayIntialIvestment.ts';

import { fieldConfig } from './Initialinvestmentannualpremium.config';

export { fieldConfig } from './Initialinvestmentannualpremium.config';

export const FormItem = ({ isShow, layout, form, editable, field, config, coverageItem }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const isMain = useMemo(() => {
    return coverageItem?.isMain === 'Y';
  }, [coverageItem]);
  const showInitialInvestment = useJugeDisplayIntialIvestment();
  const visibleConditions = showInitialInvestment;
  const editableConditions = !isMain;
  const requiredConditions = showInitialInvestment && isMain;
  return (
    isShow &&
    ((config?.['field-props']?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.['field-props']?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemNumber
          disabled={
            !editable ||
            !isMain ||
            ((config?.['field-props']?.editable || fieldProps.editable) === Editable.Conditions
              ? editableConditions
              : (config?.['field-props']?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config?.['field-props']?.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={
            config?.['field-props']?.label?.dictTypeCode || fieldProps.label.dictTypeCode
          }
          pattern={/^\d{0,20}(\.99|\.9[0-8]*|\.[0-8]\d*)?$/g}
          labelType="inline"
          required={
            config?.['field-props']?.required === Required.Conditions
              ? requiredConditions
              : (config?.['field-props']?.required || fieldProps.required) === Required.Yes
          }
          hiddenPrefix
          precision={2}
          placeholder=" "
        />
      </Col>
    )
  );
};

const Initialinvestmentannualpremium = ({
  field,
  isShow,
  layout,
  form,
  editable,
  config,
  coverageItem,
}: any) => (
  <Authority>
    <FormItem
      field={field}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      config={config}
      coverageItem={coverageItem}
    />
  </Authority>
);

Initialinvestmentannualpremium.displayName = 'initialInvestmentAnnualPremium';

export default Initialinvestmentannualpremium;

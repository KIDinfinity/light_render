import React from 'react';
import { Col } from 'antd';
import { Authority, Editable, FormItemNumber, Required, Visible, ZEproduct, formUtils } from 'basic/components/Form';
import { fieldConfig } from './GuaranteedMonthlyPayout.config';
import lodash from 'lodash';
import useGetCoverageDataSource from 'process/NB/ManualUnderwriting/_hooks/useGetCoverageDataSource';


export { fieldConfig } from './GuaranteedMonthlyPayout.config';

const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  id,
  disabled,
  coreCode,
}: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const productCode = form.getFieldValue('coreCode');
  const coverageDataSoure = useGetCoverageDataSource();
  const isIncludeZEtype = lodash.some(coverageDataSoure, (item) => {
    return lodash.includes([ ZEproduct.ZE01, ZEproduct.ZE02 ], formUtils.queryValue(item.coreCode));
  })
  const visibleConditions =  isIncludeZEtype;
  const editableConditions = productCode === ZEproduct.ZE01 || productCode === ZEproduct.ZE02;
  const requiredConditions = true;

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemNumber
          disabled={
            !editable ||
            disabled ||
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
          labelType="inline"
          hiddenPrefix
          pattern={/^\d{0,20}(\.99|\.9[0-8]*|\.[0-8]\d*)?$/g}
          precision={2}
          placeholder=" "
          objectName="nb.policyList.coverageList"
          objectFieldName="gmp"
        />
      </Col>
    )
  );
};

const GuaranteedMonthlyPayout = ({ field, config, form, editable, layout, isShow, id, coreCode }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config?.['field-props']}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      id={id}
      coreCode={coreCode}
    />
  </Authority>
);

GuaranteedMonthlyPayout.displayName = 'guaranteedMonthlyPayout';

export default GuaranteedMonthlyPayout;

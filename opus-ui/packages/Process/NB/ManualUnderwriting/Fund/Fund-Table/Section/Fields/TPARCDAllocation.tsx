import React, { useMemo } from 'react';
import { Col } from 'antd';
import lodash from 'lodash';
import {
  Authority,
  Visible,
  Editable,
  Required,
  FormItemNumber,
  Validator,
} from 'basic/components/Form';
import useGetAllocationVisibleByCondition from 'process/NB/ManualUnderwriting/_hooks/useGetAllocationVisibleByCondition';
import useGetFundAllocationCfg from 'process/NB/ManualUnderwriting/_hooks/useGetFundAllocationCfg';
import { fieldConfig } from './TPARCDAllocation.config';

export { fieldConfig } from './TPARCDAllocation.config';

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const allocationCfg = useGetFundAllocationCfg(field, form.getFieldValue('fundCode'));
  const Rules = {
    VLD_000850:
      allocationCfg &&
      Validator.VLD_000850(
        Number(allocationCfg.minAllocationPercentage),
        Number(allocationCfg.maxAllocationPercentage)
      ),
  };
  const allocationEditable = useMemo(
    () =>
      !allocationCfg ||
      allocationCfg.maxAllocationPercentage !== allocationCfg.minAllocationPercentage,
    [allocationCfg]
  );
  const getAllocationVisibleByCondition = useGetAllocationVisibleByCondition();
  const visibleConditions = getAllocationVisibleByCondition(field);
  const editableConditions = !allocationEditable;
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
          labelType="inline"
          hiddenPrefix
          placeholder=" "
          precision={0}
          rules={lodash.compact(
            (config?.rules || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
        />
      </Col>
    )
  );
};

const TPARCDAllocation = ({
  field,
  config,
  isShow,
  layout,
  form,
  editable,
  currentTotalFund,
}: any) => (
  <Authority>
    <FormItem
      field={field}
      config={lodash.get(config, 'field-props')}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      currentTotalFund={currentTotalFund}
    />
  </Authority>
);

TPARCDAllocation.displayName = 'tpaRcdAllocation';

export default TPARCDAllocation;

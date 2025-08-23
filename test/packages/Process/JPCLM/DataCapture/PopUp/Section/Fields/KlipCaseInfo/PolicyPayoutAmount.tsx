import React from 'react';
import { useSelector } from 'dva';
import lodash from 'lodash';
import { Col } from 'antd';
import {
  Authority,
  Visible,
  Editable,
  FormItemInput,
  Required,
  Validator,
  Rule,
} from 'basic/components/Form';
import { localFieldConfig } from './PolicyPayoutAmount.config';

export { localFieldConfig } from './PolicyPayoutAmount.config';

const FormItem = ({ isShow, layout, form, editable, field, config, incidentId }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const claimNo = useSelector(({ processTask }: any) => processTask.getTask?.businessNo);
  const klipCaseInfoList = useSelector(
    ({ JPCLMOfDataCapture }: any) =>
      JPCLMOfDataCapture?.claimEntities?.incidentListMap?.[incidentId]?.klipCaseInfoList
  );

  const isRegisterMcs = useSelector(
    ({ JPCLMOfDataCapture }: any) => JPCLMOfDataCapture.isRegisterMcs
  );

  const isEditable = Rule(fieldProps['editable-condition'], form, 'JPCLMOfDataCapture');
  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = !(isEditable || isRegisterMcs);

  const Rules = {
    validateKlipClaimNo: Validator.validateKlipClaimNo(klipCaseInfoList, claimNo),
  };

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemInput
          form={form}
          required={config?.required === Required.Yes}
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? !editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          formName={config.name || field}
          labelId={config?.label?.dictCode || fieldProps.label.dictCode}
          name={config?.name}
          labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          rules={lodash.compact(
            (config?.rules || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
        />
      </Col>
    )
  );
};

const PolicyPayoutAmount = ({ field, config, form, isShow, editable, layout, existCodes }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      layout={layout}
      isShow={isShow}
      form={form}
      editable={editable}
      existCodes={existCodes}
    />
  </Authority>
);

PolicyPayoutAmount.displayName = 'PolicyPayoutAmount';

export default PolicyPayoutAmount;

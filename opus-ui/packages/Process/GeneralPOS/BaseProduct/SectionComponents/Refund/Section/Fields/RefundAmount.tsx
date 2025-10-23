import React from 'react';
import { Col} from 'antd';
import {
  Authority,
  Editable,
  FormItemNumber,
  Required,
  Visible,
  Rule,
  Validator,
  formUtils,
} from 'basic/components/Form';
import { localFieldConfig } from './RefundAmount.config';
export { localFieldConfig } from './RefundAmount.config';
import { isDecision ,isDataCapture} from 'process/GeneralPOS/common/utils';
import { useSelector } from 'dva';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { NAMESPACE } from '../../../../activity.config';
import { MessageType } from 'claim/enum/medicalSearchMessageType';


export const FormItem = ({ isShow, layout, form, editable, field, config, transactionId }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');
  const { caseCategory, activityKey } = useSelector(({ processTask }: any) => processTask?.getTask);
  const subAcBalance = form.getFieldValue('subAcBalance');
  const refundAmount= form.getFieldValue('refundAmount');
  const decision = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.decision
  );
  const Rules = isDecision({ caseCategory, activityKey })
    ? {
        VLD_001401: Validator.VLD_001401(Number(subAcBalance), formUtils.queryValue(decision)),
      }
    : {};
  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
        <Col {...layout}>
          <FormItemNumber
            allowClear
            disabled={
              !editable ||
              ((config?.editable || fieldProps.editable) === Editable.Conditions
                ? !editableConditions
                : (config?.editable || fieldProps.editable) === Editable.No)
            }
            form={form}
            formName={config?.name || field}
            labelId={config.label?.dictCode || fieldProps.label.dictCode}
            labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
            required={
              (config.required || fieldProps.required) === Required.Conditions
                ? requiredConditions
                : (config.required || fieldProps.required) === Required.Yes
            }
            rules={lodash.compact(
              (config?.['x-rules'] || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
            )}
            labelType={config.label?.type || fieldProps.label.type}
            placeholder=""
            pattern={/.*/}
            isInline
            bordered={true}
            precision={2}
            errorTake={1}
            warningMessage={
              isDataCapture({ caseCategory, activityKey })&&Number(refundAmount)>Number(subAcBalance)
                ? [
                    {
                      message: formatMessageApi({ message: 'ERR_000293' }),
                      messageType: MessageType.Information,
                    },
                  ]
                : []
            }

        />
        </Col>
    )
  );
};

const RefundAmount = ({
  isShow,
  layout,
  form,
  editable,
  transactionId,
  config,
}: any) => (
  <Authority>
    <FormItem
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      transactionId={transactionId}
      field={localFieldConfig.field}
      config={config}
    />
  </Authority>
);

RefundAmount.displayName = localFieldConfig.field;

export default RefundAmount;

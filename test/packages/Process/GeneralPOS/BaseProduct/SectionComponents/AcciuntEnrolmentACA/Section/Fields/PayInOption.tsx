import { formatMessageApi } from '@/utils/dictFormatMessage';
import { safeParseUtil } from '@/utils/utils';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemRadioGroup,
  Required,
  Rule,
  Visible,
} from 'basic/components/Form';
import className from 'classnames';
import { useSelector } from 'dva';
import lodash from 'lodash';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import React from 'react';
import { localFieldConfig } from './PayInOption.config';

export { localFieldConfig } from './PayInOption.config';

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  isInline = true,
}: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const UIConfig = useSelector((state) => state.GeneralPOSController?.UIConfig) || [];
  const transactionTypesId = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.transactionTypes?.[0]
  );
  const transactionTypeCode = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace?.entities?.transactionTypesMap?.[transactionTypesId]?.transactionTypeCode
  );
  const remark = lodash.find(
    UIConfig,
    (item) => item?.transactionTypeCode === transactionTypeCode
  )?.remarkJson;
  const dicts = lodash.map(safeParseUtil(remark || '')[0]?.paymentMethod, (item) => {
    return {
      dictCode: item,
      dictName: formatMessageApi({
        Dropdown_POL_PaymentMethod: item,
      }),
    };
  });

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');
  const Rules = {};
  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <div className={className({})}>
        <Col {...layout}>
          <FormItemRadioGroup
            dicts={dicts}
            type="wave"
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
            isInline={isInline}
          />
        </Col>
      </div>
    )
  );
};

const PayInOption = ({ isShow, layout, form, editable, transactionId, config }: any) => (
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

PayInOption.displayName = localFieldConfig.field;

export default PayInOption;

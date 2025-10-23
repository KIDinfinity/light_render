import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemInput,
  Required,
  Visible,
  Rule,
} from 'basic/components/Form';
import { localFieldConfig } from './Total.config';

export { localFieldConfig } from './Total.config';
import styles from '../../index.less';
import { useSelector } from 'dva';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import classnames from 'classnames';

export const FormItem = ({ isShow, layout, form, editable, field, config, transactionId }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');
  const paymentStatus = useSelector(
    (state) =>
      state.GeneralPOSController?.entities?.transactionTypesMap?.[transactionId]
        ?.payInDetailList?.[0]?.paymentStatus
  );

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <div>
          <FormItemInput
            className={styles.total}
            isInline
            disabled={
              !editable ||
              ((config?.editable || fieldProps.editable) === Editable.Conditions
                ? !editableConditions
                : (config?.editable || fieldProps.editable) === Editable.No)
            }
            form={form}
            formName={config.name || field}
            labelId={config.label?.dictCode || fieldProps.label.dictCode}
            labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
            required={
              (config.required || fieldProps.required) === Required.Conditions
                ? requiredConditions
                : (config.required || fieldProps.required) === Required.Yes
            }
            bordered
          />
          {['Paid', 'Unpaid'].includes(paymentStatus) && (
            <span
              className={classnames({
                [styles.paid]: paymentStatus === 'Paid',
                [styles.Unpaid]: paymentStatus === 'Unpaid',
                [styles.absoluteSpan]: true,
              })}
            >
              {formatMessageApi({ Dropdown_POL_PayInStatus: paymentStatus })}
            </span>
          )}
        </div>
      </Col>
    )
  );
};

const Total = ({ isShow, layout, form, editable, fundSwitching, transactionId, config }: any) => (
  <Authority>
    <FormItem
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      fundSwitching={fundSwitching}
      transactionId={transactionId}
      config={config}
      field={localFieldConfig.field}
    />
  </Authority>
);

Total.displayName = localFieldConfig.field;

export default Total;

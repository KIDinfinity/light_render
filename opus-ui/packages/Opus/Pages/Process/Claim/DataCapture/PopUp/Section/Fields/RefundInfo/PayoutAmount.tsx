import React from 'react';
import lodash from 'lodash';
import { Col } from 'antd';
import { Authority, Visible, Editable, Required, FormItemNumber } from 'basic/components/Form';

import { localFieldConfig } from './PayoutAmount.config';
import styles from './index.less';

export { localFieldConfig } from './PayoutAmount.config';

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const Rules = {};

  const visibleConditions = true;
  const editableConditions = false;
  const requiredConditions = true;

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <div className={styles.payoutAmount}>
          <FormItemNumber
            form={form}
            disabled={
              !editable ||
              (config?.editable === Editable.Conditions
                ? !editableConditions
                : config?.editable === Editable.No)
            }
            required={
              config?.required === Required.Conditions
                ? requiredConditions
                : (config.required || fieldProps.required) === Required.Yes
            }
            formName={config.name || field}
            labelId={config?.label?.dictCode || fieldProps.label.dictCode}
            labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
            name={config?.name}
            rules={lodash.compact(
              (config?.rules || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
            )}
            precision={0}
            pattern={
              /^(-\d{1,9}(\.99|\.9[0-8]*|\.[0-8]\d*)?)|(\d{1,9}(\.99|\.9[0-8]*|\.[0-8]\d*)?)$/g
            }
            min={Number.MIN_SAFE_INTEGER}
          />
        </div>
      </Col>
    )
  );
};

const PayoutAmount = ({
  field,
  config,
  isShow,
  layout,
  form,
  editable,
  incidentId,
  id,
  policyId,
}: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      incidentId={incidentId}
      id={id}
      policyId={policyId}
    />
  </Authority>
);

PayoutAmount.displayName = localFieldConfig.field;

export default PayoutAmount;

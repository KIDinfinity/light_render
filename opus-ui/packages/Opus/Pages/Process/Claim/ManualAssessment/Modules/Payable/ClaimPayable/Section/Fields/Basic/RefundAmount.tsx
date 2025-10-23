import React, { useState } from 'react';
import { Col, Icon } from 'antd';
import { useDispatch } from 'dva';
import { Authority, Visible, Editable, Required, FormItemNumber } from 'basic/components/Form';
import { NAMESPACE } from 'opus/Pages/Process/Claim/ManualAssessment/activity.config';
import styles from './index.less';

import { localFieldConfig } from './RefundAmount.config';

export { localFieldConfig };

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const dispatch = useDispatch();
  const [reloading, setReloading] = useState(false);

  const visibleConditions = true;
  const editableConditions = true;
  const requiredConditions = true;
  const reloadingIcon = !!editable && (
    <div
      className={styles.icon}
      onClick={async () => {
        if (reloading) return;
        setReloading(true);
        await dispatch({
          type: `${NAMESPACE}/getRefundAmount`,
          payload: {
            policyNo: form.getFieldValue('policyNo'),
          },
        });
        setReloading(false);
      }}
    >
      <Icon type="sync" spin={reloading} />
    </div>
  );

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <div className={styles.ChangeObjectAmount1}>
          <FormItemNumber
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
              config?.required === Required.Conditions
                ? requiredConditions
                : (config.required || fieldProps.required) === Required.Yes
            }
            pattern={
              /^(-\d{1,9}(\.99|\.9[0-8]*|\.[0-8]\d*)?)|(\d{1,9}(\.99|\.9[0-8]*|\.[0-8]\d*)?)$/g
            }
            min={Number.MIN_SAFE_INTEGER}
            hiddenPrefix
            precision={0}
            suffix={reloadingIcon}
          />
        </div>
      </Col>
    )
  );
};

const RefundAmount = ({ field, config, isShow, layout, form, editable }: any) => (
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

RefundAmount.displayName = localFieldConfig.field;

export default RefundAmount;

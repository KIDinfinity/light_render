import React, { useState } from 'react';
import { useDispatch } from 'dva';
import lodash from 'lodash';
import { Col, Icon } from 'antd';
import { Authority, Visible, Editable, Required, FormItemNumber } from 'basic/components/Form';

import { NAMESPACE } from 'opus/Pages/Process/Claim/ManualAssessment/activity.config';
import { localFieldConfig } from './PayoutAmount.config';
import styles from './index.less';

export { localFieldConfig } from './PayoutAmount.config';
import { Action } from '@/components/AuditLog/Enum';
import { formatMessageApi } from '@/utils/dictFormatMessage';

const handleAuditLog = ({ config, dispatch }: any) => {
  const sectionName = formatMessageApi({
    Label_BIZ_Claim: 'venus_claim.label.incidentInformation',
  });
  const buttonName = formatMessageApi({
    Label_BIZ_Claim: 'KLIPCaseInfo',
  });
  const fieldName =
    config?.label?.dictTypeCode &&
    formatMessageApi({
      [config?.label?.dictTypeCode]: config?.label?.dictCode,
    });

  const refreshSource = `${sectionName} \\ ${buttonName} \\ ${fieldName}`;
  dispatch({
    type: 'auditLogController/logInformation',
    payload: {
      action: Action.Refresh,
      category: refreshSource || '',
    },
  });
};

const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  incidentId,
  id,
  policyId,
}: any) => {
  const dispatch = useDispatch();
  const [reloading, setReloading] = useState(false);
  const fieldProps: any = localFieldConfig['field-props'];

  const Rules = {};

  const visibleConditions = true;
  const editableConditions = false;
  const requiredConditions = true;
  const reloadingIcon = editable && (
    <div
      className={styles.icon}
      onClick={async () => {
        if (reloading) return;
        setReloading(true);

        // 更新snapshot数据
        await dispatch({
          type: `${NAMESPACE}/saveSnapshot`,
          payload: {
            isPopup: true,
          },
        });

        await dispatch({
          type: `${NAMESPACE}/getLifeJRefundInfo`,
          payload: {
            id,
            incidentId,
          },
        });

        handleAuditLog({ config, dispatch });

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
            suffix={reloadingIcon}
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

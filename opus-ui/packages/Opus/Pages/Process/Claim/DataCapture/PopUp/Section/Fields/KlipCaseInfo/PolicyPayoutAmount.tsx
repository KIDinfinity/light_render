import React, { useState } from 'react';
import { useDispatch, useSelector } from 'dva';
import { Col, Icon } from 'antd';
import {
  Authority,
  Visible,
  Editable,
  FormItemNumber,
  Required,
  Rule,
} from 'basic/components/Form';

import { NAMESPACE } from 'opus/Pages/Process/Claim/DataCapture/activity.config';
import { localFieldConfig } from './PolicyPayoutAmount.config';
import styles from './index.less';

export { localFieldConfig } from './PolicyPayoutAmount.config';
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

const FormItem = ({ isShow, layout, form, editable, field, config, incidentId }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const dispatch = useDispatch();
  const [reloading, setReloading] = useState(false);

  const isRegisterMcs = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.isRegisterMcs
  );

  const isEditable = Rule(fieldProps['editable-condition'], form, NAMESPACE);
  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = !(isEditable || isRegisterMcs);

  const showReloadIcon = true;

  const reloadIcon = showReloadIcon && (
    <div
      className={styles.icon}
      onClick={async () => {
        if (reloading) return;
        setReloading(true);

        try {
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
              incidentId,
            },
          });

          handleAuditLog({ config, dispatch });
        } finally {
          setReloading(false);
        }
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
        <div className={styles.policyPayoutAmount}>
          <FormItemNumber
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
            suffix={reloadIcon}
          />
        </div>
      </Col>
    )
  );
};

const PolicyPayoutAmount = ({
  field,
  config,
  form,
  isShow,
  editable,
  layout,
  existCodes,
  incidentId,
}: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      layout={layout}
      isShow={isShow}
      form={form}
      editable={editable}
      existCodes={existCodes}
      incidentId={incidentId}
    />
  </Authority>
);

PolicyPayoutAmount.displayName = 'PolicyPayoutAmount';

export default PolicyPayoutAmount;

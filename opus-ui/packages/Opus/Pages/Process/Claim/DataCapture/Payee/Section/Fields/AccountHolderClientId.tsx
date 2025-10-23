import React, { useState } from 'react';
import { Col, Button } from 'antd';
import { useDispatch, useSelector } from 'dva';
import { NAMESPACE } from '../../../activity.config';
import { SourceSystem } from 'process/Enum';
import { Authority, Visible, Editable, Required, FormItemInput } from 'basic/components/Form';
import styles from './AccountHolderClientId.less';

const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'payee',
  field: 'accountHolderClientId',
  'field-props': {
    editable: 'Y',
    label: {
      dictTypeCode: 'Label_CLM_Opus',
      dictCode: 'accountHolderID',
    },
    maxLength: 30,
    required: 'N',
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 19,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 19,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 19,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 19,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 19,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 19,
      },
    },
  },
};

export { localFieldConfig };

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const claimProcessData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimProcessData
  );
  const fieldProps: any = localFieldConfig['field-props'];
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const visibleConditions = true;
  const requiredConditions = false;
  const editableConditions = true;
  const disabled =
    !editable ||
    ((config?.editable || fieldProps.editable) === Editable.Conditions
      ? !editableConditions
      : (config?.editable || fieldProps.editable) === Editable.No);

  const showRefreshBtn = !disabled && claimProcessData?.insured?.policySource !== SourceSystem.Klip;

  const onRefresh = async () => {
    setLoading(true);

    await dispatch({
      type: 'opusClaimDataCapture/getAccountHolderClientId',
      payload: { dispatch },
    });

    setLoading(false);
  };

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemInput
          className={styles.accountHolderClientIdInput}
          disabled={disabled}
          form={form}
          formName={config.name || field}
          labelId={config.label?.dictCode || localFieldConfig['field-props'].label.dictCode}
          maxLength={config?.maxLength || localFieldConfig['field-props'].maxLength}
          required={
            config?.required === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
        />
        {showRefreshBtn && (
          <div className={styles.accountHolderClientIdOperation}>
            <Button type="link" icon="sync" size="small" loading={loading} onClick={onRefresh} />
          </div>
        )}
      </Col>
    )
  );
};

const AccountHolderClientId = ({ field, config, form, editable, layout, isShow }: any) => (
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

AccountHolderClientId.displayName = 'accountHolderClientId';

export default AccountHolderClientId;

import React, { useState } from 'react';
import lodash from 'lodash';
import { useDispatch, useSelector } from 'dva';
import { Button, Col } from 'antd';
import { Authority, Editable, FormItemInput, Required } from 'basic/components/Form';
import { NAMESPACE } from 'opus/Pages/Process/Claim/ManualAssessment/activity.config';
import { SourceSystem } from 'process/Enum';
import styles from './AccountHolderID.less';

export const fieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT003',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT003',
  section: 'paymentAllocation.bankAccount',
  field: 'accountHolderClientId',
  'field-props': {
    label: {
      dictTypeCode: 'Label_CLM_Opus',
      dictCode: 'accountHolderID',
    },
    editable: 'Y',
    required: 'N',
    visible: 'Y',
    'x-layout': {
      xs: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 19,
      },
    },
  },
};

const FormItem = ({ isShow, layout, form, editable, field, config, payeeId, itemId }: any) => {
  const claimProcessData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimProcessData
  );
  const fieldProps: any = fieldConfig['field-props'];
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const isEditable = false;
  const disabled =
    !editable ||
    (config?.editable === Editable.Conditions ? isEditable : config?.editable === Editable.No);

  const showRefreshBtn = !disabled && claimProcessData?.insured?.policySource !== SourceSystem.Klip;

  const Rules = {};

  const onRefresh = async () => {
    setLoading(true);

    await dispatch({
      type: 'opusClaimAssessment/getAccountHolderId',
      payload: { dispatch, payeeId, itemId },
    });

    setLoading(false);
  };

  return (
    isShow && (
      <Col {...layout}>
        <FormItemInput
          className={styles.accountHolderIdInput}
          form={form}
          required={config?.required === Required.Yes}
          disabled={disabled}
          formName={field || fieldConfig.field}
          labelId={config?.label?.dictCode || fieldProps.label.dictCode}
          name={config?.name}
          labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          rules={lodash.compact(
            (config?.rules || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
        />
        {showRefreshBtn && (
          <div className={styles.accountHolderIdOperation}>
            <Button type="link" icon="sync" size="small" loading={loading} onClick={onRefresh} />
          </div>
        )}
      </Col>
    )
  );
};

const AccountHolderID = ({
  field,
  config,
  form,
  editable,
  layout,
  isShow,
  payeeId,
  itemId,
}: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      payeeId={payeeId}
      itemId={itemId}
    />
  </Authority>
);

AccountHolderID.displayName = 'accountHolderClientId';

export default AccountHolderID;

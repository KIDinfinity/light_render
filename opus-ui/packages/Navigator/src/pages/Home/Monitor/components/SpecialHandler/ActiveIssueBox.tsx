import { Form } from 'antd';
import {
  FormItemInput,
  FormItemDatePicker,
  FormItemSelect,
  formUtils,
} from 'basic/components/Form';
import styles from './index.less';
import lodash from 'lodash';
import useGetPolicyLevelDecisionDropdown from 'process/NB/ManualUnderwriting/_hooks/useGetPolicyLevelDecisionDropdown';
import { useMemo, useEffect } from 'react';
import classNames from 'classnames';

import { getDrowDownList } from '@/utils/dictFormatMessage';
import React from 'react';

const ActiveIssueBox = ({ form, caseCategoryOptions, data, formRef, isExpand }: any) => {
  const { businessCode } = data || {};

  const {
    Dropdown_COM_YN,
    Dropdown_POS_POSDecision,
    Label_BPM_CaseCategory,
    activity,
    Dropdown_CAS_CurrentActivity,
    Dropdown_COM_BusinessRequestType,
    Dropdown_SRV_DeclineReason,
  } = getDrowDownList([
    'Dropdown_COM_YN',
    'Dropdown_POS_POSDecision',
    'Label_BPM_CaseCategory',
    'activity',
    'Dropdown_CAS_CurrentActivity',
    'Dropdown_COM_BusinessRequestType',
    'Dropdown_SRV_DeclineReason',
  ]);

  const boolOptions = [
    { dictCode: 'true', dictName: 'True' },
    { dictCode: 'false', dictName: 'False' },
  ];
  const boolOptions1 = [
    { dictCode: true, dictName: 'True' },
    { dictCode: false, dictName: 'False' },
  ];

  const decisionDropdowns = useGetPolicyLevelDecisionDropdown();

  const disabled = lodash.isEmpty(data);

  const triggerPostQCDisabled = useMemo(() => {
    if (!data) {
      return true;
    }
    return data.executeLastActivityBusiness === 'true';
  }, [data]);

  const pushNbSettlementFlowDisabled = useMemo(() => {
    if (!data) {
      return true;
    }
    return data.executeLastActivityBusiness === 'true' || data.triggerPostQC === 'true';
  }, [data]);

  const policyIssueDateRequired = useMemo(() => {
    if (!data) {
      return false;
    }
    const { isNtu, isWithDraw, policyDecision } = data;
    return isNtu === 'false' && isWithDraw === 'false' && policyDecision === 'A';
  }, [data]);

  const policyIssueDateDisabled = useMemo(() => {
    if (!data) {
      return true;
    }
    const { isNtu, isWithDraw, policyDecision } = data;
    return isNtu === 'true' || isWithDraw === 'true' || policyDecision !== 'A';
  }, [data]);

  const policyDecisionRequired = useMemo(() => {
    if (!data) {
      return false;
    }
    const { isNtu, isWithDraw } = data;
    return isNtu === 'false' && isWithDraw === 'false';
  }, [data]);

  const declineReasonRequired =
    data?.currentActivityKey === 'BP_POS_ACT002' && data?.decision === 'D';

  const declineReasonDisabled = data?.currentActivityKey !== 'BP_POS_ACT002';

  const triggerPostQCOptions = useMemo(() => {
    return policyIssueDateRequired && data?.canTriggerPostQC
      ? [
          { dictCode: 'true', dictName: 'True' },
          { dictCode: 'false', dictName: 'False' },
        ]
      : [{ dictCode: 'false', dictName: 'False' }];
  }, [data?.canTriggerPostQC, policyIssueDateRequired]);

  const configs: any = {
    BIZ001: () => {
      return (
        <>
          <div>
            <FormItemSelect
              className={styles.borderLess}
              form={form}
              formName="businessCode"
              labelId="BusinessType"
              dicts={Dropdown_COM_BusinessRequestType}
              disabled
            />
          </div>
          <div>
            <FormItemSelect
              className={styles.borderLess}
              form={form}
              formName="caseCategory"
              labelId="CaseCategory"
              labelTypeCode="Label_COM_MonitorCenter"
              dicts={Label_BPM_CaseCategory}
              disabled
            />
          </div>

          <div>
            <FormItemSelect
              form={form}
              formName="currentActivityKey"
              labelId="CurrentActivity"
              labelTypeCode="Label_COM_MonitorCenter"
              dicts={activity}
              disabled
            />
          </div>
          <div>
            <FormItemSelect
              form={form}
              formName="status"
              labelId="app.usermanagement.basicInfo.avatar.status"
              labelTypeCode="Label_COM_MonitorCenter"
              dicts={Dropdown_CAS_CurrentActivity}
              disabled
            />
          </div>
        </>
      );
    },
    BIZ002: () => {
      return (
        <>
          <div>
            <FormItemSelect
              className={styles.borderLess}
              form={form}
              formName="businessCode"
              labelId="BusinessType"
              dicts={Dropdown_COM_BusinessRequestType}
              disabled
            />
          </div>
          <div>
            <FormItemSelect
              className={styles.borderLess}
              form={form}
              formName="caseCategory"
              labelId="CaseCategory"
              labelTypeCode="Label_COM_MonitorCenter"
              dicts={Label_BPM_CaseCategory}
              disabled
            />
          </div>
          <div>
            <FormItemSelect
              form={form}
              formName="currentActivityKey"
              labelId="CurrentActivity"
              labelTypeCode="Label_COM_MonitorCenter"
              dicts={activity}
              disabled
            />
          </div>
          <div>
            <FormItemSelect
              form={form}
              formName="status"
              labelId="app.usermanagement.basicInfo.avatar.status"
              labelTypeCode="Label_COM_MonitorCenter"
              dicts={Dropdown_CAS_CurrentActivity}
              disabled
            />
          </div>
          <div>
            <FormItemSelect
              form={form}
              formName="decision"
              labelId="POSDecision"
              labelTypeCode="Label_BIZ_POS"
              dicts={Dropdown_POS_POSDecision}
            />
          </div>
          {data?.decision === 'D' && (
            <div>
              <FormItemSelect
                form={form}
                formName="declineReason"
                labelId="DeclineReason"
                labelTypeCode="Label_BIZ_POS"
                optionShowType="both"
                dicts={Dropdown_SRV_DeclineReason}
                disabled={declineReasonDisabled}
                required={declineReasonRequired}
                getPopupContainer={() => document.querySelector('.monitorBox') || document?.body}
              />
            </div>
          )}
          {data?.declineReason === '999' && (
            <div>
              <FormItemInput
                form={form}
                formName="editDeclineReason"
                labelId="EditDeclineReason"
                labelTypeCode="Label_BIZ_SRV"
                disabled={declineReasonDisabled}
                required={declineReasonRequired}
              />
            </div>
          )}
        </>
      );
    },
    BIZ003: () => {
      return (
        <>
          <div>
            <FormItemSelect
              className={styles.borderLess}
              form={form}
              formName="businessCode"
              labelId="BusinessType"
              dicts={Dropdown_COM_BusinessRequestType}
              disabled
            />
          </div>
          <div>
            <FormItemSelect
              form={form}
              formName="caseCategory"
              labelId="CaseCategory"
              labelTypeCode="Label_COM_MonitorCenter"
              dicts={caseCategoryOptions}
            />
          </div>
          <div>
            <FormItemSelect
              form={form}
              formName="policyDecision"
              labelId="PolicyDecision"
              labelTypeCode="Label_COM_MonitorCenter"
              dicts={decisionDropdowns}
              disabled={disabled}
              required={policyDecisionRequired}
            />
          </div>
          <div>
            <FormItemInput
              className={styles.borderLess}
              form={form}
              formName="inquiryBusinessNo"
              labelId="ApplicationNo"
              labelTypeCode="Label_COM_MonitorCenter"
              editable={false}
              disabled={true}
            />
          </div>
          <div>
            <FormItemDatePicker
              form={form}
              labelId="PolicyIssueDate"
              labelTypeCode="Label_COM_MonitorCenter"
              formName="policyIssueDate"
              disabled={policyIssueDateDisabled}
              required={policyIssueDateRequired}
            />
          </div>
          <div>
            <FormItemSelect
              form={form}
              formName="isNtu"
              labelId="NTUFlag"
              labelTypeCode="Label_COM_MonitorCenter"
              dicts={boolOptions}
              disabled={disabled}
              required
            />
          </div>
          <div>
            <FormItemInput
              form={form}
              formName="policyPremium"
              labelId="PolicyPremium"
              labelTypeCode="Label_COM_MonitorCenter"
              disabled={disabled}
            />
          </div>
          <div>
            <FormItemSelect
              form={form}
              formName="isWithDraw"
              labelId="WithdrawFlag"
              labelTypeCode="Label_COM_MonitorCenter"
              dicts={boolOptions}
              disabled={disabled}
              required
            />
          </div>
          <div>
            <FormItemSelect
              form={form}
              formName="triggerPostQC"
              labelId="TriggerPostQC"
              labelTypeCode="Label_COM_MonitorCenter"
              dicts={triggerPostQCOptions}
              disabled={triggerPostQCDisabled}
              required
            />
          </div>
          <div>
            <FormItemSelect
              form={form}
              formName="executeLastActivityBusiness"
              labelId="executeLastActivityBusiness"
              labelTypeCode="Label_COM_MonitorCenter"
              dicts={boolOptions}
              disabled={disabled}
              required
            />
          </div>
          <div>
            <FormItemSelect
              form={form}
              formName="sendSms"
              labelId="sendSms"
              labelTypeCode="Label_COM_MonitorCenter"
              dicts={Dropdown_COM_YN}
              disabled={pushNbSettlementFlowDisabled}
              required
            />
          </div>
          <div>
            <FormItemSelect
              form={form}
              formName="sendLetter"
              labelId="sendLetter"
              labelTypeCode="Label_COM_MonitorCenter"
              dicts={Dropdown_COM_YN}
              disabled //set to disabled 1st until new CR
              required
            />
          </div>
          <div>
            <FormItemSelect
              form={form}
              formName="releasePolicyPack"
              labelId="releasePolicyPack"
              labelTypeCode="Label_COM_MonitorCenter"
              dicts={Dropdown_COM_YN}
              disabled={pushNbSettlementFlowDisabled}
              required
            />
          </div>
        </>
      );
    },
  };

  useEffect(() => {
    formRef.current = form;
  }, [form, formRef]);

  return (
    <div
      className={classNames({
        [styles.activeIssuseBox]: true,
        [styles.activeIssuseBoxList]: isExpand,
      })}
    >
      {!!businessCode && configs?.[businessCode]()}
    </div>
  );
};

export default Form.create({
  onFieldsChange(props, changedFields) {
    const { setFieldData } = props;
    lodash
      .chain(changedFields)
      .values()
      .forEach((field) => {
        setFieldData(field.name, formUtils.queryValue(field));
      })
      .value();
  },
  mapPropsToFields(props) {
    const { data } = props;
    return formUtils.mapObjectToFields({
      ...data,
      inquiryBusinessNo: data?.inquiryBusinessNo || '-',
    });
  },
})(ActiveIssueBox);

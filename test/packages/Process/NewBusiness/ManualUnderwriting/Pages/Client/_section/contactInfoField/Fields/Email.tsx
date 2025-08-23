import React, { useMemo } from 'react';
import { Col } from 'antd';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';

import {
  Authority,
  Editable,
  FormItemInput,
  Visible,
  RuleByForm,
  formUtils,
} from 'basic/components/Form';
import { RuleByData } from 'packages/Basic/src/components/Form/Rule/index';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import { tenant, Region } from '@/components/Tenant';
import CustomerRole from 'process/NewBusiness/Enum/CustomerRole';
import useJudgeIsGBSN from 'basic/components/CaseContainer/hooks/useJudgeIsGBSN';

import useGetRequiredByRole from '../../../_hooks/useGetRequiredByRole';
import { fieldConfig } from './Email.config';
export { fieldConfig } from './Email.config';

const FormItem = ({ isShow, layout, form, editable, field, config, id, readOnly }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const customerRole = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      lodash.get(
        modelnamepsace,
        readOnly
          ? `entities.clientMap.${id}.personalInfo.customerRole`
          : `modalData.entities.clientMap.${id}.personalInfo.customerRole`
      ),
    shallowEqual
  );
  const relationOfProposer = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      lodash.get(
        modelnamepsace,
        readOnly
          ? `entities.clientMap.${id}.personalInfo.relationOfProposer`
          : `modalData.entities.clientMap.${id}.personalInfo.relationOfProposer`
      ),
    shallowEqual
  );
  const regionCode = tenant.region();
  const isGBSN = useJudgeIsGBSN();
  const hasRoleBesidesBeneficiary = lodash.some(
    formUtils.queryValue(customerRole),
    (role: any) => role !== CustomerRole.Beneficiary
  );

  const visibleConditions = true;
  const editableConditions = !RuleByForm(config?.['editable-condition'], form);
  const requiredConditions = useMemo(() => {
    return regionCode === Region.MY && !isGBSN
      ? hasRoleBesidesBeneficiary
        ? RuleByData(config?.['required-condition'], {
            relationOfProposer: formUtils.queryValue(relationOfProposer),
          })
        : false
      : hasRoleBesidesBeneficiary;
  }, [relationOfProposer, regionCode, isGBSN, hasRoleBesidesBeneficiary]);
  const requiredByRole = useGetRequiredByRole({
    requiredConditions,
    config,
    localConfig: fieldConfig,
    clientId: id,
  });
  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemInput
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config?.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={requiredByRole}
          hiddenPrefix
          precision={0}
          rules={[
            {
              type: 'email',
              message: 'The email address you supplied is invalid.',
            },
          ]}
        />
      </Col>
    )
  );
};

const Email = ({ form, editable, layout, isShow, id, config }: any) => {
  return (
    <Authority>
      <FormItem
        field={fieldConfig?.field}
        config={config}
        isShow={isShow}
        layout={layout}
        form={form}
        editable={editable}
        id={id}
      />
    </Authority>
  );
};

Email.displayName = 'email';

export default Email;

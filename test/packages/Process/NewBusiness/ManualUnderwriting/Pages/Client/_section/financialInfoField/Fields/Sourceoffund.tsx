import React from 'react';
import useGetRequiredByRole from '../../../_hooks/useGetRequiredByRole';
import { Col } from 'antd';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';

import { tenant, Region } from '@/components/Tenant';
import {
  Authority,
  Editable,
  FormItemSelect,
  Visible,
  RuleByForm,
  formUtils,
} from 'basic/components/Form';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import CustomerRole from 'process/NewBusiness/Enum/CustomerRole';
import CustomerTypeEnum from 'process/NewBusiness/ManualUnderwriting/_enum/CustomerTypeEnum';

import { fieldConfig } from './Sourceoffund.config';

export { fieldConfig } from './Sourceoffund.config';
import { getDrowDownList } from '@/utils/dictFormatMessage';

const useJudgeIsEntityPolicyOwner = ({ id, readOnly }: any) => {
  const roleList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      lodash.get(
        modelnamepsace,
        readOnly
          ? `entities.clientMap.${id}.personalInfo?.customerRole`
          : `modalData.entities.clientMap.${id}.personalInfo?.customerRole`
      ),
    shallowEqual
  );
  const customerType = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      lodash.get(
        modelnamepsace,
        readOnly
          ? `entities.clientMap.${id}.personalInfo.customerType`
          : `modalData.entities.clientMap.${id}.personalInfo.customerType`
      ),
    shallowEqual
  );

  const includesPolicyOwner = lodash.includes(
    formUtils.queryValue(roleList),
    CustomerRole.PolicyOwner
  );
  const existEntityPolicyOwner = tenant.region({
    [Region.PH]: () => {
      return customerType === CustomerTypeEnum?.Company && includesPolicyOwner;
    },
    notMatch: false,
  });
  return existEntityPolicyOwner;
};

const FormItem = ({ isShow, layout, form, editable, field, config, id, readOnly }: any) => {
  const fieldProps: any = fieldConfig['field-props'];

  const dicts: any = getDrowDownList({ config, fieldProps });

  const entityPolicyOwnerDicts = getDrowDownList('Dropdown_IND_SourceofWealth_Entity');

  const isEntityPolicyOwner = useJudgeIsEntityPolicyOwner({ id, readOnly });
  const visibleConditions = true;
  const editableConditions = !RuleByForm(config?.['editable-condition'], form);
  const requiredConditions = false;
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
        <FormItemSelect
          dicts={isEntityPolicyOwner ? entityPolicyOwnerDicts : dicts}
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
        />
      </Col>
    )
  );
};

const Sourceoffund = ({ form, editable, layout, isShow, id, config, readOnly }: any) => {
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
        readOnly={readOnly}
      />
    </Authority>
  );
};

Sourceoffund.displayName = 'sourceOfFund';

export default Sourceoffund;
